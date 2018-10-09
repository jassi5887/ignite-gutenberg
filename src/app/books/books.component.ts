import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../services/books.service';
import { Subject } from "rxjs/Subject";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
  host: {'class': 'books'}
})
export class BooksComponent implements OnInit {

  showLoader = false;
  loaderMessage = "loading...";
  nextUrl = '';
  scrollToTop = false;

  private allParams = '';
  currentCategory = '';
  searchText = '';
  booksList: {image: string, title: string, author: string}[] = [];
  searchTextChanged = new Subject<string>();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private booksService: BooksService,
              private loaderService: LoaderService) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.currentCategory = params['topic'];
      if(params['search']) this.searchText = params['search'];

      console.log("topic", params);

      if (Object.keys(params).length > 1 ) {
        Object.keys(params).forEach((param) => {
          if(params[param]) this.allParams = this.allParams + param + '=' + params[param] + '&';
        });
      } else {

        console.log("only category");
        
        this.allParams = 'topic=' + this.currentCategory;
      }
      console.log("all params", this.allParams);

      //this.loaderMessage = "loading books...";
      this.loaderService.setLoadingMessage("loading books...");
      this.booksService.searchBooks(this.allParams).subscribe((response:any) => {
        console.log("RESP", response);
        this.booksList = response.results;
        if (response.next) { 
          this.nextUrl = response.next;
        } else {
          this.nextUrl = '';
        }
        console.log("Books list", this.booksList);
      });

      this.allParams = '';
    });

    this.searchTextChanged
        .debounceTime(500)
        .distinctUntilChanged()
        .subscribe((searched: string) => {

      this.router.navigate([], {relativeTo: this.route, queryParams: {...this.route.snapshot.queryParams, search: searched}});
    });

    this.showLoader = this.loaderService.getFlightStatus();
    this.loaderService.inFlight.subscribe((response: {status, message}) => {
      console.log("RESP", response);
      this.showLoader = response.status;
      this.loaderMessage = response.message;
    });
  }


  onSearchTextChange(text: string) {
    this.scrollToTop = true;
    this.searchTextChanged.next(text);
  }

  onBottomReached() {
    console.log("Bottom reached");
    if(this.nextUrl) {
      this.booksService.loadMoreBooks(this.nextUrl).subscribe((response:any) => {
        this.booksList.push(...response.results);
        this.scrollToTop = false;
      });
    }
  }

}

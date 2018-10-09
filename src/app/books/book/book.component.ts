import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  host: {'class': 'book'}
})
export class BookComponent implements OnInit {

  @Input() book;
  bookLink: string;

  constructor() { 
  }

  ngOnInit() {
    console.log("books", this.book);
    if (this.book.formats['text/html; charset=utf-8'] && !String(this.book.formats['text/html; charset=utf-8']).includes('zip')) {
      this.bookLink = this.book.formats['text/html; charset=utf-8']
    } else if (this.book.formats['text/plain; charset=utf-8'] && !String(this.book.formats['text/html; charset=utf-8']).includes('zip')) {
      this.bookLink  = this.book.formats['text/plain; charset=utf-8'];
    }
    console.log("link", this.bookLink);
  }

  openFile() {
    if (this.bookLink) {
      window.location.href = this.bookLink;
    } else {
      alert("not viewable");
    }
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class BooksService {
  private apiDomain = 'http://skunkworks.ignitesol.com:8000/books/';

  private httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

  constructor(private http: HttpClient) {}

  searchBooks(params) {
    const url = `${this.apiDomain}?${params}`;
    
    return this.http.get(url, this.httpOptions);
  }

  loadMoreBooks(nextUrl: string) {
    return this.http.get(nextUrl, this.httpOptions);
  }
}
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { BooksService } from './services/books.service';
import { AppRoutingModule } from './app-routing.module';
import { CategoriesComponent } from './categories/categories.component';
import { BookComponent } from './books/book/book.component';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './services/loader.service';
import { LoaderInterceptor } from './services/loader.interceptor';
import { ScrollBottomDetectDirective } from './scroll-bottom-detect.directive';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    CategoriesComponent,
    BookComponent,
    LoaderComponent,
    ScrollBottomDetectDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    BooksService, 
    LoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

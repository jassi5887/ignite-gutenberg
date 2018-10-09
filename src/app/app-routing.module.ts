import { Routes } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';

const appRoutes: Routes = [
   { path: '', redirectTo: 'categories', pathMatch: 'full'},
   { path: 'categories',  component: CategoriesComponent},
   { path: 'books', component: BooksComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {};
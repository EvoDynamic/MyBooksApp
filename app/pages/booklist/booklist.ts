import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {BookDetailPage} from '../bookdetail/bookdetail'

import {BookService, Book} from '../../services/bookservice';

@Component({
  templateUrl: 'build/pages/booklist/booklist.html',
  providers: [BookService]
})
export class BookListPage {
  books: Book[];
  message: string;

  constructor(private navController: NavController, public bookService: BookService) { }

  private loadBooks(){
      this.books = [];
      this.bookService.getBooks().then(
          data => {
              this.books = [];
              if(data.res.rows.length>0){
                  for(var ii=0; ii<data.res.rows.length; ii++){
                      let item = data.res.rows.item(ii);
                      this.books.push(new Book(item.id
                            , item.title
                            , item.author
                            , item.fiction
                            , item.read
                            , item.notes));
                  }
                  this.message = '';
              } else {
                  this.message = "Sorry you have no books yet. Click the '+' above to begin adding books.";
              }
          }
      );
  }

  public addBook(){
      this.navController.push(BookDetailPage);
  }

    public bookSelected(book: Book){
        this.navController.push(BookDetailPage, {'book': book})
    }

    public deleteBook(book: Book){
        this.bookService.deleteBook(book);
        let index = this.books.indexOf(book);

        if(index>-1){
            this.books.splice(index,1);
        }
    }

  private onPageDidEnter(){
      this.loadBooks();
  }

}
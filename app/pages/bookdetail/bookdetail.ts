import {Page, NavController, NavParams, Toast} from 'ionic-angular';
import {BookService, Book} from '../../services/bookservice';
 
@Page({
  templateUrl: 'build/pages/bookdetail/bookdetail.html',
  providers: [BookService]
})
 
export class BookDetailPage {
  book: Book = null;
 
  constructor(public nav: NavController, navParams: NavParams, public bookService: BookService) {
    let passedBook = navParams.get('book');
    // Try to initialise our note for the page
    if (passedBook !== undefined) {
      this.book = passedBook;
    } else {
      this.book = new Book(null, '', '', false, false, '');
      this.saveBook();
    }
  }
 
  // Save our note to the DB and show a message (optional)
  public saveBook(showBadge: boolean = false, navigate: boolean = false) {
    if (this.book.id === null) {
      this.bookService.addBook(this.book).then((data) => {
        // Set the automatic created id to our note
        this.book.id = data.res["insertId"];
      });
    } else {
      this.bookService.updateBook(this.book);
    }
    if (showBadge) {
      let toast = Toast.create({
        message: 'Book saved',
        duration: 3000
      });
      this.nav.present(toast);
    }
    if(navigate) this.nav.pop();
  }
 
  // Called when this page is popped from the nav stack
  //private onPageWillUnload() {
  //  this.saveBook(true);
  //}
}
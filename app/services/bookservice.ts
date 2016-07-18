import {Storage, SqlStorage} from 'ionic-angular';
import {Injectable} from '@angular/core';

// https://devdactic.com/ionic-2-sqlstorage/

export class Book {
    id: number;
    title: string;
    author: string;
    fiction: boolean;
    read: boolean;
    notes: string;
    //entrydate: Date;

    constructor(id: number, title:string, author: string, fiction: boolean, read: boolean, notes: string){
        this.id = id;
        this.title = title;
        this.author = author;
        this.fiction = fiction; 
        this.read = read;
        this.notes = notes;
    }
}

@Injectable()
export class BookService {
    storage: Storage = null;

    constructor(){
        //var storageOptions = {name: 'booklist'
        //    , backupFlag: BACKUP_DOCUMENTS };
        this.storage = new Storage(SqlStorage);
        this.storage.query('CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, author TEXT, fiction boolean, read boolean, notes TEXT)');
    }

    public getBooks(){
        return this.storage.query('SELECT * FROM books');
    }

    public getBook(id: number){
        let sql = 'SELECT * FROM books WHERE id=?';
        return this.storage.query(sql, [id]);
    }

    public addBook(book: Book){
        let sql = 'INSERT INTO books (title, author, fiction, read, notes) VALUES (?, ?, ?, ?, ?)';
        return this.storage.query(sql, [book.title, book.author, book.fiction, book.read, book.notes]);
    }

    public updateBook(book: Book){
        let sql = 'UPDATE books SET title=?, author=?, fiction=?, read=?, notes=? WHERE id=?';
        this.storage.query(sql, [book.title, book.author, book.fiction, book.read, book.notes, book.id])
    }

    public deleteBook(book: Book){
        let sql = 'DELETE FROM books WHERE id=?';
        this.storage.query(sql, [book.id]);
    }
}


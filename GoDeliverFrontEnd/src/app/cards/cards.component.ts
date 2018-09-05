import { Component, OnInit, Input } from "@angular/core";
import { BookService } from "../book.service";
import { FirebaseService, Wishlist } from '../firebase.service';
import { Cart } from "../firebase.service";
@Component({
  selector: "app-cards",
  templateUrl: "./cards.component.html",
  styleUrls: ["./cards.component.css"]
})
export class CardsComponent implements OnInit {
  // To take input data from other pages
  @Input("book")
  book;
  item: Cart = {
    bookISBN_10: '',
    title: '',
    cost:1,
    poster: '',
    genre: '',
    quantity:1,
  }


  wish: Wishlist = {
    bookISBN_10: '',
    title: '',
    cost:1,
    poster: '',
    genre: '',
    quantity:1,
    author:'',
    publisher:'',
    emailID:''
  }

    //To store current user email for wishlist
  email: any;

  constructor(private bookService: BookService, private firebase: FirebaseService) { }

  ngOnInit() {
    if (localStorage.getItem("currentUserEmail") != null) {
      this.email = JSON.parse(localStorage.getItem("currentUserEmail"));
    }


  }

  addToCart(book) {
    this.item.title = book.title;
    this.item.poster = book.poster;
    this.item.bookISBN_10 = book.bookISBN_10;
    this.item.cost = parseInt(book.cost);
    this.item.genre = book.genre;
    this.item.quantity=1;
    this.item.totalPrice=parseInt(book.cost);
    this.firebase.addItem(this.item);
  }

  addToWishlist(book) {
    this.wish.title = book.title;
    this.wish.poster = book.poster;
    this.wish.bookISBN_10 = book.bookISBN_10;
    this.wish.cost = book.cost;
    this.wish.genre = book.genre;
    this.wish.quantity=1;
    this.wish.author=book.author;
    this.wish.publisher=book.publisher;
    this.wish.emailID="rajawat@gmail.com";
    this.firebase.addItemToWishlist(this.wish);
    this.bookService.itemToWishlistRecommendation(this.wish).subscribe(
      data => { console.log('done')});
    }
}

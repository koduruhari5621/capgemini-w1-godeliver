import { Component, OnInit } from "@angular/core";
import { FirebaseService, Cart } from "./../firebase.service";
import { Http, Headers } from "@angular/http";
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.css"]
})
export class PaymentComponent implements OnInit {
  title = "payment-example";
  msg: string = null;
  msg1: string = null;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;
  totalamountpayable: any;
  totalLength: any;
  carts: Cart[];
  constructor(private http: Http, private firebase: FirebaseService,private spinner :NgxSpinnerService) {}
  chargeCard(token: string) {
    const headers = new Headers({ token: token, amount: this.getSum() });
    this.http
      .post("http://localhost:9088/payment/charge", {}, { headers: headers })
      .subscribe(resp => {
        console.log(resp);
      });
  }

  refundCard() {
    this.http
      .post("http://localhost:9088/payment/refund", {})
      .subscribe(res => {
        console.log(res);
      });
  }
  totalQuant() {
    let totalQuantity = 0;

    for (let i = 0; i < this.totalLength; i++) {
      totalQuantity += this.carts[i].quantity;
    }
    return totalQuantity;
  }

  getSum() {
    let sum = 0;

    for (let i = 0; i < this.totalLength; i++) {
      sum += this.carts[i].totalPrice;
    }
    return sum;
  }

  chargeCreditCard() {
    (<any>window).Stripe.card.createToken(
      {
        number: this.cardNumber,
        exp_month: this.expiryMonth,
        exp_year: this.expiryYear,
        cvc: this.cvc
      },
      (status: number, response: any) => {
        if (status === 200) {
          const token = response.id;
          if (token != null) {
            this.chargeCard(token);
            console.log(token);
            localStorage.setItem("currentUserPayment", JSON.stringify(token));

            setTimeout(() => {
              this.deleteCart();
            }, 6000);
            this.msg = "Your Transaction is success";
          }

          if (token == null) {
            this.msg = "Payment failure! Plase Check Your Internet Connection";
          }
        } else {
          console.log(response.error.message);
          this.msg1= "Payment Failure! Please Enter valid Credentials ";
        }
      }
    );
  }

  refundCreditCard() {
    this.refundCard();
  }
  deleteCart() {
    if (localStorage.getItem("currentUserPayment")) {
      if (localStorage.getItem("uid") != null) {
        localStorage.removeItem("uid");
        localStorage.removeItem("currentUserPayment");
      } else {
        localStorage.removeItem("currentUserPayment");
      }
      this.firebase.deleteCart();
    }
  }
  openSpinner(){
    this.spinner.show();
 
    setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
    }, 5000);
  }
  

  ngOnInit() {
    this.firebase.getCart().subscribe(carts => {
      this.carts = carts;
      this.totalLength = carts.length;
    });
  }
}
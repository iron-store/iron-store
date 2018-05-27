import { Component, OnInit, AfterViewChecked } from '@angular/core';

declare let paypal: any;

@Component({
  selector: 'app-paypall-buttons',
  templateUrl: './paypall-buttons.component.html',
  styleUrls: ['./paypall-buttons.component.css']
})
export class PaypallButtonsComponent implements OnInit, AfterViewChecked {

  addScript: boolean = false;
  paypalLoad: boolean = true;

  finalAmount: number = 1;

  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'AZqtyASGkRBmVIXi83Fgp2j-4eZQUBLTFp5AQsuWV_LwwVg7vTvHiX0x2fQcvfDdGjnquFWLmdRRKWRt',
      // production: 'AZqtyASGkRBmVIXi83Fgp2j-4eZQUBLTFp5AQsuWV_LwwVg7vTvHiX0x2fQcvfDdGjnquFWLmdRRKWRt'
    },
    payment: (data, actions) => {
      return actions.payment.create({
        transactions: [
          {
            amount: {
                total: this.finalAmount,
                currency: 'USD'
            }
          }
        ]
      });
    },
    commit: true,
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        // do something when payment is succesful
      });
    },
    onCancel: function(data) {
      console.log('The payment was cancelled!');
    }
  };



  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
        this.paypalLoad = false;
      });
    }
  }

  addPaypalScript() {
    this.addScript =  true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    });
  }

  constructor () {}

  ngOnInit() {
  }

}

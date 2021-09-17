import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Payment } from '../interface/payment';
import { PaymentsService } from './payments.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
  providers: [PaymentsService]
})
export class PaymentsComponent implements OnInit {

  @ViewChild('readOnlyTemplate', { static: false }) readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate', { static: false }) editTemplate: TemplateRef<any>;
  
  payments: Array<Payment>;
  edited: Payment;
  isNew: boolean;

  constructor(
    private serv: PaymentsService,
    private router: Router
  ) { 
    this.payments = new Array<Payment>();
    this.edited = null;
    this.isNew = false;
  }

  ngOnInit(): void {
    this.loadPayments();
  }

  loadTemplate(it: Payment) {
    if (this.edited && this.edited.id == it.id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }

  add() {
    if (!this.isNew) {
      this.edited = new Payment(null, null, '', null, new Date);
      this.payments.push(this.edited);
      this.isNew = true;
    }
  }

  cancel() {
    if (this.isNew) {
      this.payments.pop();
      this.isNew = false
    }
    this.edited = null;
    this.loadPayments();
  }

  save() {
    if (!this.edited.coupon) {
      this.cancel();
      return;
    }
    this.serv.savePayment(this.edited).subscribe(
      (data: Payment) => {
        this.isNew = false
        this.edited = null;
        this.loadPayments();
      },
      (error: any) => {
        let status = error.status;
        if ([401, 403].includes(status)) {
          this.router.navigate(['']);
        } else if (status == 404) {
          alert("Coupon " + this.edited.coupon + " not found.");
          this.cancel();
        } else {
          alert("Error: " + status);
        }
      }
    );
  }

  private loadPayments() {
    this.serv.getPayments().subscribe(
      (data: Payment[]) => {
        this.payments = data;
      },
      (error: any) => {
        let status = error.status;
        if ([401, 403].includes(status)) {
          this.router.navigate(['']);
        } else {
          alert("Error: " + status);
        }
      }
    );
  }
}

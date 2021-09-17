import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentsComponent } from './payments.component';
import { PaymentsService } from './payments.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PaymentsComponent],
  providers: [PaymentsService],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class PaymentsModule { }

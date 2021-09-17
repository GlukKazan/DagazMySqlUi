import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournComponent } from './tourn.component';
import { TournService } from './tourn.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TournComponent],
  providers: [TournService],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class TournModule { }

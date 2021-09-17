import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersComponent } from './members.component';
import { MembersService } from './members.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MembersComponent],
  providers: [MembersService],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class MembersModule { }

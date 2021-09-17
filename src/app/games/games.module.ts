import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesComponent } from './games.component';
import { GamesService } from './games.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [GamesComponent],
  providers: [GamesService],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class GamesModule { }

import { Component, OnInit } from '@angular/core';
import { BonusService } from './bonus.service';

@Component({
  selector: 'app-bonus',
  templateUrl: './bonus.component.html',
  styleUrls: ['./bonus.component.css'],
  providers: [BonusService]
})
export class BonusComponent implements OnInit {

  id: number;
  bonus: string;
  phone: string;
  email: string;
  info: string;
  done: boolean;
  success: boolean;
  activated: Date;
  once: boolean;

  constructor(
    private serv: BonusService
  ) { }

  ngOnInit(): void {
    this.id = null;
    this.bonus = '';
    this.info = '';
    this.phone = '';
    this.email = '';
    this.done = false;
    this.success = false;
    this.activated = null;
    this.once = false;
  }

  find(): void {
    this.done = false;
    this.once = false;
    this.activated = null;
    this.serv.getBonus(this.bonus).subscribe(
      (data: any) => {        
        console.log(data);
        this.success = true;
        this.done = true;
        this.id = data.id;
        this.activated = data.activated;
        this.email = data.email;
        this.phone = data.phone;
        this.info = data.info;
      },
      (error: any) => {
        let status = error.status;
        if (status == 404) {
            this.success = false;
            this.done = true;
            this.id = null;
            this.activated = null;
            this.email = '';
            this.phone = '';
            this.info = '';
        } else {
            alert("Error: " + status);
        }
      });
  }

  activate(): void {
    this.done = false;
    this.once = false;
    this.serv.activateBonus(this.bonus, this.info).subscribe(
      (data: any) => {        
        console.log(data);
        this.success = true;
        this.done = true;
        this.activated = data.activated;
        this.once = true;
      },
      (error: any) => {
        let status = error.status;
        if (status == 404) {
            this.success = false;
            this.done = true;
            this.id = null;
            this.activated = null;
            this.email = '';
            this.phone = '';
            this.info = '';
        } else {
            alert("Error: " + status);
        }
      }
    );
  }
}

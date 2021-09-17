import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from '../interface/member';
import { Tourn } from '../interface/tourn';
import { MembersService } from './members.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  providers: [MembersService]
})
export class MembersComponent implements OnInit {

  tourn: Tourn;
  members: Array<Member>;

  id: number;

  constructor(
    private serv: MembersService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) { 
    this.tourn = null;
    this.members = new Array<Member>();
    this.id = activateRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.loadTourn();
  }

  public games(it: Member) {
    this.router.navigate(['games/' + this.tourn.id + '/' + it.user_id]);
  }

  public back() {
    let url: string = 'tournament';
    if (this.tourn) {
      url = url + '/' + this.tourn.game_id;
      if (this.tourn.variant_id) {
        url = url + '/' + this.tourn.variant_id;
      } else {
        url = url + '/0';
      }
    }
    this.router.navigate([url]);
  }

  join() {
    if (!confirm("Join to Tournament?")) {
      this.loadMembers();
      return;
    }
    this.serv.joinToTourn(this.tourn.id).subscribe(
      (data: Tourn) => {
        this.loadMembers();
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

  loadTourn() {
    this.serv.getTourn(this.id).subscribe(
      (data: Tourn) => {
        this.tourn = data;
        if (!this.tourn.closed && !this.tourn.is_joined) {
          this.join();
        } else {
          this.loadMembers();
        }
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

  loadMembers() {
    this.serv.getMembers(this.id).subscribe(
      (data: Member[]) => {
        this.members = data;
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

  public delete(it: Member) {
    if (!confirm("Delete Member?")) return;
    console.log(it);
    this.serv.delMember(it.id).subscribe(
      (data: Member) => {
        this.loadMembers();
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

  public itsOwner() {
    if (!this.tourn) return false;
    const id = localStorage.getItem('myId');
    return +id == this.tourn.user_id;
  }

  public itsMe(it:Member) {
    const id = localStorage.getItem('myId');
    return +id == it.user_id;
  }

  public isRoot() {
    const role = localStorage.getItem('myRole');
    return role == '1';
  }
}

import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Info } from '../interface/info';
import { TimeControl } from '../interface/timecontrol';
import { Tourn } from '../interface/tourn';
import { TournService } from './tourn.service';

@Component({
  selector: 'app-tourn',
  templateUrl: './tourn.component.html',
  styleUrls: ['./tourn.component.css'],
  providers: [TournService]
})
export class TournComponent implements OnInit {

  @ViewChild('readOnlyTemplate', { static: false }) readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate', { static: false }) editTemplate: TemplateRef<any>;

  info: Array<Info>;
  timecontrol: Array<TimeControl>;
  tourns: Array<Tourn>;
  scope: number;
  edited: Tourn;
  isNew: boolean;

  start_game: number;
  start_var: number;

  constructor(
    private serv: TournService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) { 
    this.scope = 1;
    this.info = new Array<Info>();
    this.timecontrol = new Array<TimeControl>();
    this.tourns = new Array<Tourn>();
    this.start_game = activateRoute.snapshot.params['g'];
    this.start_var = activateRoute.snapshot.params['v'];
    this.edited = null;
    this.isNew = false;
  }

  ngOnInit(): void {
    this.loadTime();
  }

  loadTemplate(it: Tourn) {
    if (this.edited && this.edited.id == it.id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }

  add() {
    this.edited = new Tourn(null, '', false, false, null, null, null, '', null, null, false, new Date(), null, null, '', 0, 0, null, null, '');
    this.tourns.push(this.edited);
    this.isNew = true;
  }

  edit(it: Tourn) {
    this.edited = it;
  }

  cancel() {
    if (this.isNew) {
      this.tourns.pop();
      this.isNew = false
    }
    this.edited = null;
    this.loadTurns();
  }

  save() {
    if (!this.edited.title || !this.edited.setting_id) {
      this.cancel();
      return;
    }
    this.serv.saveTourn(this.edited).subscribe(
      (data: Tourn) => {
        if (this.isNew) {
          this.scope = 1;
        }
        this.isNew = false
        this.edited = null;
        this.loadTurns();
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

  public changeFilter() {
    this.loadTurns();
  }

  public isStarted(it: Tourn) {
    return it.all > 0;
  }

  public isJoined(it: Tourn) {
    return it.is_joined;
  }

  public isOwner(it: Tourn) {
    return it.is_owner;
  }

  public members(it: Tourn) {
    this.router.navigate(['members/' + it.id]);
  }

  public games(it: Tourn) {
    this.router.navigate(['games/' + it.id]);
  }

  public join(it: Tourn) {
    if (!confirm("Join to Tournament?")) return;
    this.serv.joinToTourn(it.id).subscribe(
      (data: Tourn) => {
        this.loadTurns();
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

  public delete(it: Tourn) {
    if (!confirm("Delete Tournament?")) return;
    this.serv.delTourn(it.id).subscribe(
      (data: Tourn) => {
        this.loadTurns();
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

  public close(it: Tourn) {
    if (!confirm("Close Tournament?")) return;
    this.serv.closeTourn(it.id).subscribe(
      (data: Tourn) => {
        this.loadTurns();
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

  private loadTime() {
    this.serv.getTime().subscribe(
      (data: TimeControl[]) => {
        this.timecontrol = data;
        this.loadInfo();
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

  private loadInfo() {
    this.serv.getInfo().subscribe(
      (data: Info[]) => {
        this.info = data;
        this.loadTurns();
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

  private loadTurns() {
    let url: string = this.scope == 1 ? 'active' : 'closed';
    if (this.start_game) {
      url = 'game/' + this.start_game;
      if (this.start_var) {
        url = url + '/' + this.start_var;
      } else {
        url = url + '/0';
      }
    }
    this.serv.getTourns(url).subscribe(
      (data: Tourn[]) => {
        this.tourns = data;
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

  public isRoot() {
    const role = localStorage.getItem('myRole');
    return role == '1';
  }
}

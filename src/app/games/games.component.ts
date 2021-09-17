import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Session } from '../interface/session';
import { Style } from '../interface/style';
import { Tourn } from '../interface/tourn';
import { GamesService } from './games.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css'],
  providers: [GamesService]
})
export class GamesComponent implements OnInit {

  tourn: Tourn;
  sessions: Array<Session>;
  styles: Array<Style>;

  id: number;
  user: number;
  
  constructor(
    private serv: GamesService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) { 
    this.tourn = null;
    this.sessions = new Array<Session>();
    this.styles = new Array<Style>();
    this.id = activateRoute.snapshot.params['id'];
    this.user = activateRoute.snapshot.params['us'];
  }

  ngOnInit(): void {
    this.loadTourn();
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

  loadTourn() {
    this.serv.getTourn(this.id).subscribe(
      (data: Tourn) => {
        this.tourn = data;
        this.loadStyles();
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

  private loadStyles() {
    this.serv.getStyles().subscribe(
      (data: Style[]) => {
        this.styles = data;
        this.loadSessions();
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

  public getStyles(game: number) {
    return this.styles.filter((it: Style) => { return it.game_id == game; });
  }

  public isStyled(game: number) {
    const s = this.getStyles(game);
    return s.length > 0;
  }

  public changeFilter() {
    this.loadSessions();
  }

  public changeStyle(session) {
    const s = this.styles.filter((it: Style) => { return it.id == session.style; });
    if (s.length > 0) {
      localStorage.setItem('myCurrStyle', s[0].suffix);
    }
  }

  private initStyle(session) {
    const styles = this.getStyles(session.game_id);
    const suffix = localStorage.getItem('myCurrStyle');
    if (suffix) {
      const s = styles.filter((it: Style) => { return it.suffix == suffix; });
      if (s.length > 0) {
        session.style = s[0].id;
        return;
      }
    }
    if (styles.length > 0) {
      session.style = styles[0].id;
    }
  }

  public loadSessions() {
    let url: string = '' + this.tourn.id;
    if (this.user) {
      url = url + '/' + this.user;
    }
    this.serv.getSessions(url).subscribe((data: Session[]) => {
      data.forEach((it: Session) => {
        this.initStyle(it);
      });
      this.sessions = data;
    },
    (error: any) => {
      let status = error.status;
      if ([401, 403].includes(status)) {
        this.router.navigate(['']);
      } else {
        alert("Error: " + status);
      }
    });
  }

  public join(it: Session) {
    this.launch(it, it.filename);
  }

  private launch(it: Session, filename: string) {
    let url = '/dagaz/' + filename;
    const s = this.styles.filter((x: Style) => { return it.style == x.id; });
    if (s.length) {
      url = url + s[0].suffix;
    }
    if (it.ai) {
      url = url + '-ai';
    }
    url = url + '.html?sid=' + it.id;
    if (it.selector_value > 0) {
      url = url + '&selector=' + it.selector_value;
    }
    if (url) {
      window.location.href = url;
    }
  }
    
  public delete(it: Session) {
    if (!confirm("Delele Session?")) return;
    const s = this.serv.delSessions(it.id).subscribe((data: Session) => {
      this.loadSessions();
    },
    (error: any) => {
      let status = error.status;
      if ([401, 403].includes(status)) {
        this.router.navigate(['']);
      } else {
        alert("Error: " + status);
      }
    });
  }
    
  public isRoot() {
    const role = localStorage.getItem('myRole');
    return role == '1';
  }
}

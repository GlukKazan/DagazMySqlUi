import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class LaunchService {

  private game = '/api/game';
  private sess = '/api/session';
  private tourn = '/api/tournament';

  constructor(private http: HttpClient) { }

  getTime(): Observable<Object> {
    return this.http.get(this.tourn + '/time');
  } 
  
  getGames(): Observable<Object> {
    return this.http.get(this.game);
  } 

  getVariants(game: number): Observable<Object> {
    return this.http.get(this.game + '/' + game + '/variants');
  } 

  getSetups(game: number, variant): Observable<Object> {
    if (variant) {
      return this.http.get(this.game + '/setups/' + game + '/' + variant);
    } else {
      return this.http.get(this.game + '/setups/' + game);
    }
  } 

  getStyles(game: number): Observable<Object> {
    return this.http.get(this.game + '/' + game + '/styles');
  } 

  getPreview(filename: string, selector_value: number, style: number): Observable<Object> {
    return this.http.post(this.game + '/preview', {"filename": filename, "selector_value": selector_value, "style": style});
  }

  createSession(game_id: number, filename: string, selector_value: number, player_num: number, variant: number, ai: boolean, time: number): Observable<Object> {
    if (ai || !time) {
      return this.http.post(this.sess, {"game_id": game_id, "filename": filename, "selector_value": selector_value, "player_num": player_num, "variant_id": variant, "with_ai": ai});
    } else{
      return this.http.post(this.sess, {"game_id": game_id, "filename": filename, "selector_value": selector_value, "player_num": player_num, "variant_id": variant, "with_ai": ai, "timecontrol_id": time});
    }
  }
}

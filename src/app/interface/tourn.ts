export class Tourn {
    constructor(
      public id: number, 
      public title: string,
      public is_owner: boolean,
      public is_joined: boolean,
      public game_id: number,
      public variant_id: number,
      public selector_value: number,
      public game: string,
      public main_time: number,
      public additional_time: number,
      public is_hidden: boolean,
      public created: Date,
      public closed: Date,
      public user_id: number,
      public creator: string,
      public all: number,
      public completed: number,
      public setting_id: number,
      public timecontrol_id: number,
      public timecontrol: string
    ) {}
  }
  
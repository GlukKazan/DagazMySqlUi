export class Member {
    constructor(
        public id: number, 
        public user_id: number, 
        public user: string, 
        public score: number, 
        public berger: number, 
        public rating: number, 
        public all: number, 
        public win: number, 
        public lose: number,
        public is_inc: boolean
      ) {}
    }
    
export class Payment {
    constructor(
      public id: number, 
      public account_id: number,
      public coupon: string, 
      public amount: number,
      public created: Date
    ) {}
  }
  
export interface IOrder {
  receipt: number;
  user: string;
  items: number[];
  total: number;
  timestamp: string;
}

export class Order implements IOrder {
  public receipt: number;
  public user: string;
  public items: number[];
  public total: number;
  public timestamp: string;

  constructor(input: any) {
    this.receipt = input.receipt;
    this.user = input.user;
    this.items = input.items;
    this.total = input.total;
    this.timestamp = input.timestamp;
  }
}

export default Order;

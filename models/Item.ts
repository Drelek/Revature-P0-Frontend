export interface IItem {
  id?: number;
  name: string;
  description: string;
  price: number;
  tags: string[];
}

export class Item implements IItem {
  public id?: number;
  public name: string;
  public description: string;
  public price: number;
  public tags: string[];

  constructor(input: any) {
    this.name = input.name;
    this.description = input.description;
    this.price = input.price;
    this.tags = input.tags;
    if (input.id) this.id = input.id;
  }
}

export default Item;

export interface IContact {
  id: number;
  type: string;
  text?: string;
  elements?: IElement[];
}

export interface IElement {
  id: number;
  text: string;
}

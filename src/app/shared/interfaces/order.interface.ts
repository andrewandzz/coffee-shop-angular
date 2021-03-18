export interface Order {
  id: number;
  customerGuid: string;
  customerName: string;
  totalPrice: number;
  creationDate: Date;
  checkedOut: boolean;
}

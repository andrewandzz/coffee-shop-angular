export interface CreateOrderItem {
  orderId?: number; // or customerGuid
  customerGuid?: string; // or orderId
  coffeeId: number;
  sugar: number;
  cupCap: boolean;
}

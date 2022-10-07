declare module "Orders" {
  export interface IOrders {
    id: number;
    sellerId: number;
    buyerId: number;
    items?: number[];
    total: float;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    zip: number;
    ccNumber: number;
    expMonth: number;
    expYear: number;
    cvv: number;
  }
}

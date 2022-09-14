declare module "Cart" {
  export interface ICartReturn {
    product: {
      id: number;
      name: string;
    };
    quantity: number;
  }
}

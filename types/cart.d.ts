declare module "Cart" {
  export interface ICartReturn {
    product: {
      id: number;
      name: string;
      body?: string;
      description?: string;
      price: number;
      images: IImage[];
    };
    quantity: number;
  }
  export interface ICartLine {
    id: number;
    product: number;
    userId: number;
  }
}

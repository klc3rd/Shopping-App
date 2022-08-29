declare module "Product" {
  interface IProduct {
    id?: number;
    name: string;
    description: string;
    body: string;
    price: number;
    sellerId: number;
    quantity: number;
  }

  interface IImage {
    id?: number;
    filename: string;
    folder: string;
    productID?: number;
  }
}

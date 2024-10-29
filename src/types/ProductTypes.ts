export interface Product {
  productVariant: string;
  productColour: string;
  productPrice: number;
  inStock: boolean;
  imageUrl: string;
}

export interface ProductList {
  [key: string]: Product;
}

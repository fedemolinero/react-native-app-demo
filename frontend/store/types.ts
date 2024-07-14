export interface Product {
  id: number;
  skus: Sku[];
  image: string;
  brand: string;
  style: string;
  substyle: string;
  abv: string;
  origin: string;
  information: string;
  price: number;
  stock: string;
}

export interface Sku {
  code: number;
  name: string;
}

export interface ProductDetails {
  image: string,
  brand: string,
  price: number;
  origin: string;
  stock: number;
  information: string,
  size: string[]
}

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
  price: string;
  stock: string;
}

export interface Sku {
  code: number;
  name: string;
}

export interface ProductDetails {
  // productId: number;
  brand: string,
  image: string,
  information: string,
  productName: string;
  stock: number;
  variantCode: string;
  variantName: string;
  price: number;
}

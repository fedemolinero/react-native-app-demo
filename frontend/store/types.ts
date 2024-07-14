export interface Product {
  price: string;
  id: number;
  image: string;
  brand: string;
  style: string;
  substyle: string;
  abv: string;
  origin: string;
  information: string;
  skus: Sku[];
}

export interface Sku {
  code: number;
  name: string;
}

export interface ProductDetails {
  productId: number;
  productName: string;
  stock: number;
  variantCode: string;
  variantName: string;
  price: number;
}

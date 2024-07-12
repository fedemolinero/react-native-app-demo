import express from 'express';
import products from '../data/products.js';
import stockPrice from '../data/stock-price.js';

const router = express.Router();

// Route to get all products
router.get('/products', (req, res) => {
  res.json(products);
});

// Route to get all details on stock and price for SKU
router.get('/stock-price/:sku', (req, res) => {
  const { sku } = req.params;

  // Find details of stock and price by sku
  if (stockPrice[sku]) {

    // Find the product corresponding to SKU
    const product = products.find((p) => p.skus.some((s) => s.code === sku));

    if (product) {
      const variant = product.skus.find((s) => s.code === sku);
      const { stock, price } = stockPrice[sku];

      // response object
      const response = {
        productId: product.id,
        productName: product.brand,
        variantCode: variant.code,
        variantName: variant.name,
        stock,
        price,
      };

      res.json(response);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } else {
    res.status(404).json({ message: 'Product variant not found' });
  }
});

// Exporting router with routes configured
export { router };

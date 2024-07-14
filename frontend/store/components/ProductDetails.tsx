// ProductDetailsScreen.tsx

import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails } from '../redux/reducers/productsReducer'; // Importa la acción
import { RootState } from '../redux/store'; // Importa RootState para typing

const ProductDetailsScreen = ({ route }: any) => {
  const { product } = route.params;
  const dispatch = useDispatch();
  const productDetails = useSelector((state: RootState) => state.products.productDetails);
  const status = useSelector((state: RootState) => state.products.status);
  const error = useSelector((state: RootState) => state.products.error);

  useEffect(() => {
    if (product && product.skus && product.skus.length > 0) {
      dispatch<any>(fetchProductDetails(product.skus[0].code));
    }
  }, [dispatch, product]);

  return (
    <View style={styles.container}>
      {status === 'loading' && <Text>Loading...</Text>}
      {status === 'failed' && <Text>Error: {error}</Text>}
      {status === 'succeeded' && productDetails && (
        <View style={styles.details}>
          <Text>Name: {productDetails.productName}</Text>
          <Text>Price: ${productDetails.price / 100}</Text>
          <Text>Stock: {productDetails.stock}</Text>
          <Text>Variant Code: {productDetails.variantCode}</Text>
          <Text>Variant Name: {productDetails.variantName}</Text>
          {/* <Image style={styles.image} source={{ uri: productDetails.image }} /> */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  details: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default ProductDetailsScreen;

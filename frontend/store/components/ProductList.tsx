// ProductListingScreen.tsx

import React, { useEffect } from 'react';
import { FlatList, TouchableOpacity, Alert, StyleSheet, Image, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/reducers/productsReducer'; // Importa la acción
import { RootState } from '../redux/store'; // Importa RootState para typing

const ProductListingScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);
  const status = useSelector((state: RootState) => state.products.status);
  const error = useSelector((state: RootState) => state.products.error);

  useEffect(() => {
    dispatch<any>(fetchProducts());
  }, [dispatch]);

  const navigateToProductDetails = (product: any) => {
    navigation.navigate('ProductDetails', { product });
  };

  const renderProductItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.productItem} onPress={() => navigateToProductDetails(item)}>
      <Image style={styles.image} source={{ uri: item.image }} />
      <Text>{item.brand}</Text>
      <Text>Price: ${item.price}</Text>
    </TouchableOpacity>
  );

  if (status === 'loading') {
    return <Text>Loading...</Text>;
  }

  if (status === 'failed') {
    return <Text>Error: {error}</Text>;
  }

  return (
    <FlatList
      data={products}
      renderItem={renderProductItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      contentContainerStyle={styles.flatlistContent}
    />
  );
};

const styles = StyleSheet.create({
  productItem: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    width: '50%',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  flatlistContent: {
    alignItems: 'center',
  },
});

export default ProductListingScreen;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Text, StyleSheet, Alert } from 'react-native';
import { ProductDetails } from '@/types';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { Image } from 'react-native';
import MenuIcon from '@/components/MenuIcon';
import DotsIcon from '@/components/dotsIcon';

const ProductDetailsScreen = ({ route, navigation }: any,) => {
  const { product } = route.params;
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(null); // Initialize with null or initial state

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <DotsIcon />,
      headerTitleAlign: 'center',
      title: 'Detail',
    });
    fetchProductDetails(product.sku[0].code);
  }, [navigation]);


  const fetchProductDetails = async (sku: string) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/stock-price/${sku}`);
      setProductDetails(response.data); // Assuming response.data matches ProductDetails interface
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch product details');
    }
  };

  return (
    <ThemedView style={styles.container}>
      {productDetails ? (
        <ThemedView style={styles.details}>
          <Image
            style={styles.image}
            source={{ uri: `./assets${productDetails.image}` }}
          />
          <ThemedText type="title">{productDetails.brand}</ThemedText>
          <ThemedText type="subtitle"> ${productDetails.price / 100}</ThemedText>
          <ThemedText>Origin: {productDetails.origin}</ThemedText>
          <ThemedText>Stock: {productDetails.stock}</ThemedText>
          <ThemedText>Description: </ThemedText>
          <ThemedText type='default'> {productDetails.information}</ThemedText>
        </ThemedView>
      ) : (
        <Text>Loading...</Text>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    color: '#1D3D47',
    backgroundColor: '#ffffff',
  },
  details: {
    flex: 1,
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
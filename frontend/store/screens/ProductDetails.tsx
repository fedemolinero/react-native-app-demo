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
          <ThemedText style={styles.customColor} type="title">{productDetails.brand}</ThemedText>
          <ThemedText style={styles.colored} type="title"> ${productDetails.price / 100}</ThemedText>
          <ThemedText type='toptitle'>Origin: {productDetails.origin}</ThemedText>
          <ThemedText type='toptitle'>Stock: {productDetails.stock}</ThemedText>
          <ThemedText type='titleAlt'>Description: </ThemedText>
          <ThemedText type='toptitle'> {productDetails.information}</ThemedText>
          <ThemedText type='titleAlt'>Size: </ThemedText>
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
  colored: {
    color: '#FF9F24'
  },
  customColor: {
    color: '#0F0D23',
  }


});

export default ProductDetailsScreen;
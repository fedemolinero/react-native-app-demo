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

        <ThemedView style={styles.detailsContainer}>

          <Image
            style={styles.image}
            source={{ uri: `./assets${productDetails.image}` }}
          />

          <ThemedView style={styles.productDetailsTitle}>
            <ThemedText style={styles.customColor} type="title">{productDetails.brand}</ThemedText>
            <ThemedText style={styles.colored} type="title"> ${productDetails.price / 100}</ThemedText>
          </ThemedView>

          <ThemedView style={styles.productDetailsStock}>
            <ThemedText type='toptitle'>Origin: {productDetails.origin} | </ThemedText>
            <ThemedText type='toptitle'>Stock: {productDetails.stock}</ThemedText>
          </ThemedView>


          <ThemedText style={styles.productDetailsDescription} type='titleAlt'>Description: </ThemedText>
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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
  },
  detailsContainer: {
    flex: 1,
    paddingTop: 10,
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',

  },
  productDetailsTitle: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 30,
    backgroundColor: '#ffffff',
  },

  productDetailsStock: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    paddingTop: 5,
    paddingBottom: 20
  },
  productDetailsDescription: {
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: '#ffffff',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  colored: {
    color: '#FF9F24',
    paddingLeft: 20,
  },
  customColor: {
    color: '#0F0D23',
    paddingRight: 20,
  }


});

export default ProductDetailsScreen;
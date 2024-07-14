import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Text, StyleSheet, Alert, ScrollView, View } from 'react-native';
import { ProductDetails } from '@/types';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { Image } from 'react-native';
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
    <ScrollView>
      <ThemedView style={styles.container}>
        {productDetails ? (
          <View>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{ uri: `./assets${productDetails.image}` }}
              />
            </View>
            <View style={styles.productDetailsTitle}>
              <ThemedText style={styles.customColor} type="title">{productDetails.brand}</ThemedText>
              <ThemedText style={styles.colored} type="title"> ${productDetails.price / 100}</ThemedText>
            </View>
            <View style={styles.productDetailsStock}>
              <ThemedText type='toptitle'>Origin: {productDetails.origin}</ThemedText>
              <ThemedText type='toptitle'> | Stock: {productDetails.stock}</ThemedText>
            </View>

            <ThemedText style={styles.productDetailsDescription} type='titleAlt'>Description </ThemedText>
            <ThemedText style={styles.productDetailsDescriptionText} type='toptitle'> {productDetails.information}</ThemedText>

            <ThemedText style={styles.size} type='titleAlt'>Size </ThemedText>

          </View>
        ) : (
          <Text>Loading...</Text>
        )}
      </ThemedView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  productDetailsTitle: {
    justifyContent: 'space-between',
    flex: 1,
    flexDirection: 'row',
    paddingTop: 30,
    backgroundColor: '#ffffff',
  },
  detailsContainer: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#ffffff',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  productDetailsContainer: {
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  customColor: {
    color: '#0F0D23',
    paddingRight: 20,
  },
  colored: {
    color: '#FF9F24',
    paddingLeft: 20,
  },
  productDetailsStock: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingTop: 5,
    paddingBottom: 20
  },
  productDetailsDescription: {
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: '#ffffff',
  },
  productDetailsDescriptionText: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  size: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  }

});

export default ProductDetailsScreen;
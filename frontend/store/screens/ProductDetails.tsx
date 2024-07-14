import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, Alert, ScrollView, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { ProductDetails } from '@/types';
import { ThemedText } from '../components/ThemedText';
import { Image } from 'react-native';
import DotsIcon from '@/components/dotsIcon';
import ToCartIcon from '@/components/toCartIcon';

const ProductDetailsScreen = ({ route, navigation }: any) => {
  const { product } = route.params;
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true); // Initial loading state
  const [error, setError] = useState(false); // Initial error state

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <DotsIcon />,
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: '#fafafa',
        borderBottomWidth: 0,
      },
      headerTitleStyle: {
        fontFamily: 'DMSans-Regular',
        fontSize: 18,
        fontWeight: '700', 
      },
      title: 'Detail',
    });

    // Fetch initial product details
    fetchProductDetails(product.sku[0].code);

    // Setup interval to fetch product details every 5 seconds
    const interval = setInterval(() => {
      fetchProductDetails(product.sku[0].code);
    }, 5000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, [navigation, product]);

  const fetchProductDetails = async (sku: string) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/stock-price/${sku}`);
      setProductDetails(response.data); // Assuming response.data matches ProductDetails interface
      setLoading(false); // Set loading state to false on successful fetch
    } catch (error) {
      setLoading(false); // Set loading state to false on error
      setError(true); // Set error state to true
      console.error('Error fetching product details:', error);
    }
  };

  const addToCart = () => {
    console.log('Add to Cart pressed');
  };

  // Render loading indicator while fetching data
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF9F24" />
      </View>
    );
  }

  // Render error message if there was an error fetching data
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error: Failed to fetch product details.</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => fetchProductDetails(product.sku[0].code)}>
          <Text>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Render product details once data is loaded
  return (
    <View style={styles.container}>
      <ScrollView>
        {productDetails ? (
          <View>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{ uri: `./assets${productDetails.image}` }}
              />
            </View>

            <View style={styles.productsDetailContainer}>
              <View style={styles.productDetailsTitle}>
                <ThemedText style={styles.customColor} type="title">{productDetails.brand}</ThemedText>
                <ThemedText style={styles.colored} type="title"> ${productDetails.price / 100}</ThemedText>
              </View>

              <View style={styles.productDetailsStock}>
                <ThemedText type='toptitle'>Origin: {productDetails.origin}</ThemedText>
                <ThemedText type='toptitle'> | Stock: {productDetails.stock}</ThemedText>
              </View>

              <ThemedText style={styles.productDetailsDescription} type='titleAlt'>Description</ThemedText>
              <ThemedText style={styles.productDetailsDescriptionText} type='toptitle'>{productDetails.information}</ThemedText>

              <ThemedText style={styles.size} type='titleAlt'>Size</ThemedText>

              <View style={styles.containerButton}>
                <TouchableOpacity style={styles.buttonRounded}>
                  <ThemedText type='toptitle'>12-24oz</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonRounded}>
                  <ThemedText type='toptitle'>18-12oz</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonRounded}>
                  <ThemedText type='toptitle'>Half Barrel</ThemedText>
                </TouchableOpacity>
              </View>

            </View>

          </View>
        ) : (
          <Text>No product details available.</Text>
        )}
      </ScrollView>

      {/* Bottom fixed bar with two buttons */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.button}>
          {/* Replace with your cart icon */}
          <ToCartIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonLarge} onPress={addToCart}>
          <ThemedText type="btn">Add to Cart</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    paddingBottom: 60, // Ensure space for bottom bar
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  retryButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FF9F24',
    borderRadius: 5,
  },
  imageContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  buttonRounded: {
    backgroundColor: 'transparent',
    borderRadius: 20,
    margin: 5,
    borderWidth: 1,
    borderColor: '#646464',
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  productsDetailContainer: {
    margin: 10,
    padding: 10,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  productDetailsTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 30,
  },
  productDetailsStock: {
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 20,
  },
  productDetailsDescription: {
    paddingBottom: 10,
    paddingTop: 10,
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
  },
  colored: {
    color: '#FF9F24',
  },
  customColor: {
    color: '#0F0D23',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fafafa',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingHorizontal: 20,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    alignItems: 'flex-start',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonLarge: {
    backgroundColor: '#FF9F24',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 15,
    flex: 1,
    alignItems: 'center',
    marginRight: 20,
  },
});

export default ProductDetailsScreen;

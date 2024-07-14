import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Text, StyleSheet, Alert, ScrollView, View, TouchableOpacity } from 'react-native';
import { ProductDetails } from '@/types';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { Image } from 'react-native';
import DotsIcon from '@/components/dotsIcon';
import ToCartIcon from '@/components/toCartIcon';

const ProductDetailsScreen = ({ route, navigation }: any) => {
  const { product } = route.params;
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(null);

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

  const addToCart = () => {
    // Implement your addToCart logic here
    console.log('Add to Cart pressed');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {productDetails ? (
          <ThemedView>
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
          </ThemedView>
        ) : (
          <Text>Loading...</Text>
        )}
      </ScrollView>

      {/* Bottom fixed bar with two buttons */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={[styles.button, { flex: 0.3 }]}>
          <ToCartIcon />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#FF9F24', flex: 0.7 }]} onPress={addToCart}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    paddingBottom: 60, // Ensure space for bottom bar
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
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
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    paddingVertical: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default ProductDetailsScreen;

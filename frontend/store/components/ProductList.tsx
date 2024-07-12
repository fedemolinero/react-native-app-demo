
import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, Alert, StyleSheet, Button } from 'react-native';
import { Product } from '@/types';
import axios from 'axios';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import ParallaxScrollView from './ParallaxScrollView';
import LogoTitle from './LogoTitle';
import MenuIcon from './MenuIcon';

const ProductListingScreen = ({ navigation }: any) => {

  // Initialize as empty array of Product type
  const [count, setCount] = React.useState(0);
  const [products, setProducts] = useState<Product[]>([]);

  React.useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      title: 'Wellcome',
      // headerLeft: () => (),
      headerTitle: () => <MenuIcon />,
      headerRight: () => <LogoTitle />
    });
    fetchProducts();
  }, [navigation, setCount]);


  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch products');
    }
  };

  const navigateToProductDetails = (product: Product) => {
    navigation.navigate('ProductDetails', { product });
  };

  const renderProductItem = ({ item }: { item: Product }) => (
    <TouchableOpacity style={styles.productItem} onPress={() => navigateToProductDetails(item)}>
      <ThemedText>{item.brand}</ThemedText>
      <ThemedText>{item.information}</ThemedText>
    </TouchableOpacity>
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
    >
      <ThemedView>
        <ThemedText type="title">Welcome back !</ThemedText>
        <FlatList
          data={products}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </ThemedView>
    </ParallaxScrollView>


  );
};

const styles = StyleSheet.create({
  productItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default ProductListingScreen;

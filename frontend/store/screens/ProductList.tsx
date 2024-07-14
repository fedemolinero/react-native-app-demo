
import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import { Product } from '@/types';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import LogoTitle from '@/components/LogoTitle';
import MenuIcon from '@/components/MenuIcon';


const ProductListingScreen = ({ navigation }: any) => {

  // Initialize as empty array of Product type
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
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
      <ThemedText style={styles.container}>{item.brand}</ThemedText>
      <Image
        style={styles.image}
        source={{ uri: `./assets${item.image}` }}
      />
      <ThemedText>{item.abv}</ThemedText>
    </TouchableOpacity >
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
    >
      <ThemedView style={styles.container}>
        <ThemedText type="subtitle">Hi Mr. Michael,</ThemedText>
        <ThemedText type="title">Welcome back !</ThemedText>
        <ThemedText type="default">Our Products</ThemedText>

        <FlatList
          data={products}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.flatlistContent}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    color: '#1D3D47',
    backgroundColor: '#ffffff',
  },
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
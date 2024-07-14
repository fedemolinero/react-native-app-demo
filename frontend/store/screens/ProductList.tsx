import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, Alert, StyleSheet, Image, View, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { Product } from '@/types';
import { ThemedText } from '@/components/ThemedText';
import LogoTitle from '@/components/LogoTitle';
import MenuIcon from '@/components/MenuIcon';
import AddToCartIcon from '@/components/addToCartIcon';

const ProductListingScreen = ({ navigation }: any) => {

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true); // Initial loading state
  const [error, setError] = useState(false); // Initial error state

  useEffect(() => {
    navigation.setOptions({
      title: 'Welcome',
      headerStyle: {
        backgroundColor: '#fafafa',
        borderBottomWidth: 0
      },
      headerTitle: () => <MenuIcon />,
      headerRight: () => <LogoTitle />
    });
    fetchProducts();
  }, [navigation]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
      setLoading(false); // Set loading state to false on successful fetch
    } catch (error) {
      setLoading(false); // Set loading state to false on error
      setError(true); // Set error state to true
      console.error('Error fetching products:', error);
    }
  };

  const navigateToProductDetails = (product: Product) => {
    navigation.navigate('ProductDetails', { product });
  };

  const renderProductItem = ({ item }: { item: Product }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => navigateToProductDetails(item)}>

      <View style={styles.itemTitle}>
        <ThemedText style={styles.titlePaddedcontent} type='itemTitle'>{item.brand}</ThemedText>
        <Image
          style={styles.image}
          source={{ uri: `./assets${item.image}` }}
        />
      </View>

      <View style={styles.productItem}>
        <ThemedText style={styles.paddedcontent} type="itemTitle">${item.price / 100}</ThemedText>
        <AddToCartIcon />
      </View>
    </TouchableOpacity >
  );

  // Render loading indicator while fetching data
  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#FF9F24" />
      </View>
    );
  }

  // Render error message and retry button on fetch error
  if (error) {
    return (
      <View style={[styles.container, styles.errorContainer]}>
        <ThemedText type="title">Failed to load products.</ThemedText>
        <TouchableOpacity style={styles.retryButton} onPress={fetchProducts}>
          <ThemedText type="btn">Retry</ThemedText>
        </TouchableOpacity>
      </View>
    );
  }

  // Render product list once data is loaded
  return (
    <View style={styles.container}>
      <ThemedText type="toptitle">Hi Mr. Michael,</ThemedText>
      <ThemedText type="title">Welcome back!</ThemedText>
      <ThemedText type="default">Our Products</ThemedText>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.flatlistContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
    paddingLeft: 20,
    paddingTop: 20,
    flex: 1,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
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
  itemContainer: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 32,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    margin: 10,
    padding: 10,
    width: '45%', // Adjust width for two-column layout
  },
  itemTitle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
  },
  titlePaddedcontent: {
    textAlign: 'center',
  },
  paddedcontent: {
    paddingLeft: 10,
    textAlign: 'center',
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  flatlistContent: {
    alignItems: 'center',
    paddingBottom: 20,
  },
});

export default ProductListingScreen;

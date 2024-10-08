import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, Alert, StyleSheet, Image, View } from 'react-native';
import axios from 'axios';
import { Product } from '@/types';
import { ThemedText } from '@/components/ThemedText';
import LogoTitle from '@/components/LogoTitle';
import AddToCartIcon from '@/components/icons/addToCartIcon';
import MenuIcon from '@/components/icons/MenuIcon';

const ProductListingScreen = ({ navigation }: any) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    navigation.setOptions({
      title: 'Wellcome',
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
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch products');
    }
  };

  const navigateToProductDetails = (product: Product) => {
    navigation.navigate('ProductDetails', { product });
  };

  const handleAddToCart = (product: Product) => {
    Alert.alert('Add to Cart', `Added ${product.brand} to cart`);
    // Implement actual add to cart logic here when available
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
        <TouchableOpacity onPress={() => handleAddToCart(item)}>
          <AddToCartIcon />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

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
    paddingTop: 20
  },
  itemContainer: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 32,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    margin: 10
  },
  itemTitle: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 22,
    paddingTop: 10
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10
  },
  titlePaddedcontent: {
    paddingBottom: 10,
    textAlign: 'center'
  },
  paddedcontent: {
    paddingLeft: 10,
    textAlign: 'center'
  },
  image: {
    width: 122,
    height: 122,
    resizeMode: 'contain',
  },
  flatlistContent: {
    alignItems: 'center',
    flexDirection: 'column'
  },
});

export default ProductListingScreen;

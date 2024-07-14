
import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, Alert, StyleSheet, Image, View } from 'react-native';
import axios from 'axios';
import { Product } from '@/types';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import LogoTitle from '@/components/LogoTitle';
import MenuIcon from '@/components/MenuIcon';
import AddToCartIcon from '@/components/addToCartIcon';


const ProductListingScreen = ({ navigation }: any) => {

  // Initialize as empty array of Product type
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    navigation.setOptions({
      title: 'Wellcome',
      // headerLeft: () => (),
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

  const renderProductItem = ({ item }: { item: Product }) => (
    <TouchableOpacity style={styles.containerItem} onPress={() => navigateToProductDetails(item)}>
      <ThemedText type='itemTitle'>{item.brand}</ThemedText>
      <Image
        style={styles.image}
        source={{ uri: `./assets${item.image}` }}
      />
      <View style={styles.productItem}>
        <ThemedText type="itemTitle">${item.price / 100}</ThemedText>
        <AddToCartIcon />
      </View>
    </TouchableOpacity >
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#fafafa', dark: '#1D3D47' }}
    >
      <ThemedView style={styles.container}>
        <ThemedText type="toptitle">Hi Mr. Michael,</ThemedText>
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
    backgroundColor: '#fafafa',
  },
  containerItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 32,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    padding: 20,
    margin: 10
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Esto alinea los elementos uno a la izquierda y otro a la derecha
    alignItems: 'center', // Esto centra verticalmente los elementos
  },
  image: {
    flex: 1,
    width: 122,
    height: 122,
    resizeMode: 'contain',
  },
  flatlistContent: {
    alignItems: 'center',
  },
});

export default ProductListingScreen;
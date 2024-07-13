import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductDetailsScreen from '@/components/ProductDetails';
import ProductListingScreen from '@/components/ProductList';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">

        <Stack.Screen
          name="Home"
          component={ProductListingScreen}
        />

        <Stack.Screen
          name="ProductDetails"
          component={ProductDetailsScreen}
          options={{
            headerTitleAlign: 'center',
            title: 'Detail',
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

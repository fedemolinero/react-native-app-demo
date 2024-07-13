import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import ProductListingScreen from '@/components/ProductList';
import ProductDetailsScreen from '@/components/ProductDetails';
import store from './redux/store';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <Provider store={store}>
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
    </Provider>


  );
}

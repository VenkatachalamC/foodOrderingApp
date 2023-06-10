import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Menu from './screens/menu';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Cart from './contexts/cartcontext';
import CartScreen from './screens/cart';
import Home from './screens/home';
import Orders from './screens/orders';
import SignIn from './screens/signIn';
import SignUp from './screens/signUp';
import UserContext from './contexts/usercontext';
export default function App() {
  const stack=createNativeStackNavigator();
  return (
    <Cart>
      <UserContext>
    <NavigationContainer>
      <stack.Navigator>
      <stack.Screen name="Sign-In" component={SignIn}/>
      <stack.Screen name="Sign-Up" component={SignUp}/>
      <stack.Screen name="Home" component={Home}/>
      <stack.Screen name="Menu" component={Menu}/>
      <stack.Screen name="Orders" component={Orders}/>
      <stack.Screen name="cart" component={CartScreen}/>
      </stack.Navigator>
      </NavigationContainer>
      </UserContext>
      </Cart>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

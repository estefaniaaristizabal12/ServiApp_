import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { CartProvider } from './src/context/cartContext/CartContext';
import { RootNavigation } from './src/navigation/RootNavigation';
// import { Home } from './src/screens/Home';

export default function App() {
  return (

    <AppState>
      <RootNavigation/>
    </AppState>
    
  );
}

const AppState = ({ children }: any ) => {
  return (
    <CartProvider>
      { children }
    </CartProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

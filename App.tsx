import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { CartProvider } from './src/context/cartContext/CartContext';
import { RootNavigation } from './src/navigation/RootNavigation';
// import { Home } from './src/screens/Home';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(["AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage"]);

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

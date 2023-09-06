import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StackNavigater from './navigation/StackNavigater';
import { Provider } from 'react-redux';
import store from './store';
import { ModalPortal } from 'react-native-modals';
import { UserContext } from './UserContext';
export default function App() {
  return (
    <>
      <Provider store={store}>
        <UserContext>
          <StackNavigater />
          <ModalPortal />
        </UserContext>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

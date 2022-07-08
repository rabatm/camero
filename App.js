import { StatusBar } from 'expo-status-bar';
import { StyleSheet,  SafeAreaView } from 'react-native';
import Cam from './component/cam';


export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Cam />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
});

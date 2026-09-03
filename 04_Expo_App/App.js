import { Text, View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MERN Assignment 04</Text>
      <Text style={styles.subtitle}>Expo App - SDK 54</Text>
      <Text style={styles.name}>Name: Waleed</Text>
      <Text style={styles.name}>Project: my-first-expo-app</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 5 },
  subtitle: { fontSize: 18, color: 'green', marginBottom: 15 },
  name: { fontSize: 16, marginTop: 5 },
});
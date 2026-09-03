import { useState } from 'react';
import { View, Text, Pressable, StyleSheet, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [showMsg, setShowMsg] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.card}>
        <Text style={styles.title}>My First Expo App</Text>
        <Text style={styles.welcome}>Welcome to React Native + Expo!</Text>
        <Text style={styles.name}>Ammar</Text>

        <Pressable 
          style={({pressed}) => [styles.button, pressed && styles.buttonPressed]} 
          onPress={() => setShowMsg(!showMsg)}
        >
          <Text style={styles.buttonText}>{showMsg ? 'Hide Message' : 'Show Message'}</Text>
        </Pressable>

        {showMsg && (
          <View style={styles.messageBox}>
            <Text style={styles.message}>Hello! Expo is working successfully. 🎉</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor:'#f3f4f6', justifyContent:'center', alignItems:'center', padding:20 },
  card: { backgroundColor:'#fff', width:'100%', maxWidth:380, borderRadius:20, padding:24, alignItems:'center', shadowColor:'#000', shadowOpacity:0.08, shadowRadius:12, elevation:4 },
  title: { fontSize:22, fontWeight:'800', color:'#111827', marginBottom:8, textAlign:'center' },
  welcome: { fontSize:15, color:'#6b7280', marginBottom:4 },
  name: { fontSize:18, fontWeight:'600', color:'#2563eb', marginBottom:20 },
  button: { backgroundColor:'#2563eb', paddingVertical:12, paddingHorizontal:28, borderRadius:12, width:'100%', alignItems:'center' },
  buttonPressed: { backgroundColor:'#1d4ed8', transform:[{scale:0.98}] },
  buttonText: { color:'#fff', fontWeight:'700', fontSize:15 },
  messageBox: { marginTop:20, backgroundColor:'#dcfce7', borderColor:'#86efac', borderWidth:1, padding:12, borderRadius:12, width:'100%' },
  message: { color:'#166534', textAlign:'center', fontWeight:'600' }
});

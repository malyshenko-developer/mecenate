import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {AppProvider} from "./src/providers/AppProvider";

export default function App() {
  return (
      <AppProvider>
          <NavigationContainer>
              <View style={styles.container}>
                  <Text>Screens</Text>
              </View>
          </NavigationContainer>
      </AppProvider>
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

import {NavigationContainer} from "@react-navigation/native";
import { SafeAreaProvider } from 'react-native-safe-area-context';

import {AppProvider} from "./src/providers/AppProvider";
import {AppNavigator} from "./src/navigation/AppNavigator";

export default function App() {
  return (
      <SafeAreaProvider>
      <AppProvider>
          <NavigationContainer>
              <AppNavigator />
          </NavigationContainer>
      </AppProvider>
      </SafeAreaProvider>
  );
}

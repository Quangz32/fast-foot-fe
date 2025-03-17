import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import AppNavigator from "./app/navigation/AppNavigator";

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <AppNavigator />
      <Toast />
    </SafeAreaProvider>
  );
}

import React from "react";

// Import React Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// import Screens
import HomeScreen from "./components/HomeScreen";
import HistoryScreen from "./components/HistoryScreen";

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          headerTitleAlign: "center",
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "#424242",
          },
        }}
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen}></Stack.Screen>
        <Stack.Screen
          name="HistoryScreen"
          component={HistoryScreen}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

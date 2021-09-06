import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Index from "./pages/Index";

const Stack = createNativeStackNavigator();

function AppNavigator(props) {
  return (
    <NavigationContainer style={{ backgroundColor: "red" }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {props.isAuth ? (
          <Stack.Screen name="Index" component={Index} />
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;

import React from "react";
import { useTailwind } from "./theme/tailwind";
import { SafeAreaView, StatusBar } from "react-native";
import Alert from "./components/Alert";
import Navbar from "./components/Navbar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authActions } from "./store/auth";
import { useDispatch, useSelector } from "react-redux";
import AppNavigator from "./AppNavigator";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

export default function Index() {
  const { tw, isDarkMode } = useTailwind();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const token = useSelector((state) => state.auth.token);
  let getToken = async () => {
    const value = await AsyncStorage.getItem("todoToken");
    dispatch(authActions.login({ token: value || null, isAuth: !!value }));
    return value;
  };
  React.useEffect(() => {
    getToken();
  }, []);
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: tw("text-blue-500").color,
      placeholder: tw("text-blue-500").color,
      text: tw("text-black dark:text-white").color,
    },
  };
  React.useEffect(() => {}, [isAuth || token]);
  return (
    <PaperProvider theme={theme}>
      <SafeAreaView
        style={{
          top: StatusBar.currentHeight,
          ...tw("h-full w-full flex flex-col bg-gray-100 dark:bg-gray-800"),
        }}
      >
        <StatusBar
          translucent
          {...tw("bg-white dark:bg-gray-900")}
          barStyle={isDarkMode ? "light-content" : "dark-content"}
        />
        <Navbar />
        <AppNavigator isAuth={isAuth} />

        <Alert />
      </SafeAreaView>
    </PaperProvider>
  );
}

import React from "react";
import { authActions } from "../store/auth";
import { useDispatch, useSelector } from "react-redux";
import { useTailwind } from "../theme/tailwind";
import { Text, TouchableOpacity, View } from "react-native";
import { Entypo, AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Navbar() {
  const { tw, isDarkMode, setDarkMode } = useTailwind();
  const isAuth = useSelector((state) => state.auth.isAuth);

  const dispatch = useDispatch();
  const logout = async () => {
    dispatch(authActions.logout());
    await AsyncStorage.removeItem("todoToken");
  };
  return (
    <View
      style={tw(
        "flex flex-row justify-between items-center px-2 bg-white dark:bg-gray-900"
      )}
    >
      <Text style={tw("text-2xl text-blue-500")}>To Do App </Text>
      <View style={tw("flex flex-row items-center")}>
        <View
          style={tw(
            "bg-gray-500 text-white rounded-full p-2 m-1 dark:bg-yellow-300"
          )}
        >
          <TouchableOpacity onPress={() => setDarkMode(!isDarkMode)}>
            {isDarkMode ? (
              <Entypo name="light-up" style={tw("text-white")} size={24} />
            ) : (
              <Entypo name="moon" style={tw("text-black")} size={24} />
            )}
          </TouchableOpacity>
        </View>
        {isAuth && (
          <TouchableOpacity onPress={logout}>
            <AntDesign
              name="logout"
              size={24}
              color="black"
              style={tw("text-red-600 text-4xl mx-2")}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

import React from "react";
import { snackbarActions } from "../store/snackbar";
import { useDispatch, useSelector } from "react-redux";
import { Text, Touchable, TouchableOpacity, View } from "react-native";
import { useTailwind } from "../theme/tailwind";
import { AntDesign } from "@expo/vector-icons";

export default function ErrorAlert() {
  const { tw } = useTailwind();
  const dispatch = useDispatch();
  const snackbarMessage = useSelector(
    (state) => state.snackbar.snackbarMessage
  );
  return (
    <View
      style={tw(
        `flex flex-row justify-between items-center flex-1 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative my-2`
      )}
    >
      <Text style={tw(`text-green-900`)}>{snackbarMessage}</Text>
      <Text style={tw("absolute top-0 bottom-0 right-0 px-4 py-3")}></Text>
      <TouchableOpacity onPress={() => dispatch(snackbarActions.close())}>
        <AntDesign name="close" size={24} style={tw("text-green-500")} />
      </TouchableOpacity>
    </View>
  );
}

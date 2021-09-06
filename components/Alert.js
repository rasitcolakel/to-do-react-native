import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import ErrorAlert from "./ErrorAlert";
import InfoAlert from "./InfoAlert";
import SuccessAlert from "./SuccessAlert";
import { useTailwind } from "../theme/tailwind";
export default function Alert() {
  const { tw } = useTailwind();

  const toggleSnackbar = useSelector((state) => state.snackbar.toggleSnackbar);
  const type = useSelector((state) => state.snackbar.type);
  return (
    <View style={tw("bottom-0 w-full absolute pb-6")}>
      <View style={tw("w-full px-2")}>
        {toggleSnackbar ? (
          type === "error" ? (
            <ErrorAlert />
          ) : type === "info" ? (
            <InfoAlert />
          ) : (
            <SuccessAlert />
          )
        ) : (
          <></>
        )}
      </View>
    </View>
  );
}
function Alert2() {
  const toggleSnackbar = useSelector((state) => state.snackbar.toggleSnackbar);

  const type = useSelector((state) => state.snackbar.type);

  return (
    <div style={tw("fixed bottom-0 w-full")}>
      <div style={tw("flex flex-1 justify-center items-center mb-4")}>
        <div style={tw("w-full px-2 md:w-2/4 lg:w-2/6")}>
          {toggleSnackbar ? (
            type === "error" ? (
              <ErrorAlert />
            ) : type === "info" ? (
              <InfoAlert />
            ) : (
              <SuccessAlert />
            )
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

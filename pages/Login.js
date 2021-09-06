import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/actions";
import { snackbarActions } from "../store/snackbar";
import { Text, View } from "react-native";
import { useTailwind } from "../theme/tailwind";
import { TextInput, Button } from "react-native-paper";
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
let fields = [
  {
    type: "email",
    name: "email",
    label: "Email Address",
  },
  {
    type: "password",
    name: "password",
    label: "Password",
  },
];
export default function Login({ navigation }) {
  const { tw } = useTailwind();
  const dispatch = useDispatch();
  const [params, setParams] = React.useState({
    email: "",
    password: "",
  });

  const RegisterForm = () => {
    if (!validateEmail(params.email))
      dispatch(
        snackbarActions.open({
          message: "Email is not valid",
          type: "error",
        })
      );
    else dispatch(login(params));
  };
  return (
    <View style={tw("h-full bg-gray-100 dark:bg-gray-800")}>
      <View style={tw("bg-white dark:bg-gray-900 rounded-xl p-4 mx-3 mt-4")}>
        <View style={tw("px-1")}>
          <Text
            style={tw(
              "text-3xl font-normal mt-2 mb-4 text-center text-blue-500"
            )}
          >
            Log In - Todo App
          </Text>
          {fields.map((field, i) => (
            <TextInput
              key={i}
              label={field.label}
              onChangeText={(e) => setParams({ ...params, [field.name]: e })}
              mode="outlined"
              style={tw("mb-2 text-black dark:bg-gray-800")}
            />
          ))}
          <Button
            mode="contained"
            onPress={RegisterForm}
            style={tw("bg-blue-600")}
          >
            Log IN
          </Button>
          <Button
            style={tw("text-blue-600 text-center w-full text-lg my-4")}
            onPress={() => navigation.navigate("Register")}
          >
            Don't you have account? Register
          </Button>
        </View>
      </View>
    </View>
  );
}

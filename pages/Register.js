import React from "react";
import { useDispatch } from "react-redux";
import { register } from "../store/actions";
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
    type: "text",
    name: "fullName",
    label: "Full Name",
  },
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
  {
    type: "password",
    name: "confirmPassword",
    label: "Confirm Password",
  },
];
export default function Register({ navigation }) {
  const { tw } = useTailwind();
  const dispatch = useDispatch();
  const [params, setParams] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
  });

  const RegisterForm = () => {
    if (params.password !== params.confirmPassword)
      dispatch(
        snackbarActions.open({
          message: "Password and confirm password should be same",
          type: "error",
        })
      );
    else if (!validateEmail(params.email))
      dispatch(
        snackbarActions.open({
          message: "Email is not valid",
          type: "error",
        })
      );
    else dispatch(register(params));
  };
  return (
    <View style={tw("h-full bg-gray-100 dark:bg-gray-800")}>
      <View style={tw("bg-white dark:bg-gray-900 rounded-xl p-8 mx-3 mt-4")}>
        <View style={tw("px-6")}>
          <Text
            style={tw(
              "text-3xl font-normal mt-2 mb-4 text-center text-blue-500"
            )}
          >
            Register - Todo App
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
            Register
          </Button>
          <Button
            style={tw("text-blue-600 text-center w-full text-lg my-4")}
            onPress={() => navigation.navigate("Login")}
          >
            Do you have account? Log in
          </Button>
        </View>
      </View>
    </View>
  );
}

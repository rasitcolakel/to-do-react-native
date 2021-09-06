import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodos, updateTodos, deleteTodos, newTodo } from "../store/actions";
import { RadioButton, IconButton, TextInput } from "react-native-paper";
import { Text, View, TouchableOpacity } from "react-native";
import { useTailwind } from "../theme/tailwind";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Index() {
  const { tw } = useTailwind();

  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.data);

  React.useEffect(() => {
    dispatch(getTodos());
  }, []);

  const [title, setTitle] = React.useState("");
  const submitNew = () => {
    dispatch(newTodo({ title: "123123123" }));
    setTitle("");
  };
  return (
    <View style={tw("h-full bg-gray-100 dark:bg-gray-800")}>
      <View style={tw("bg-white dark:bg-gray-900 rounded-xl p-8 mx-3 mt-4")}>
        <Text
          style={tw(
            "text-2xl pb-2 mb-4 text-black dark:text-gray-300 border-b-2 border-gray-100 dark:border-gray-700"
          )}
        >
          To-Dos ({todos.length})
        </Text>
        <View style={tw("flex flex-row items-center ")}>
          <TextInput
            value={title}
            label="Add a new todo"
            onChangeText={setTitle}
            mode="outlined"
            style={tw("text-black dark:bg-gray-800 flex-1")}
          />

          <IconButton
            icon="plus"
            style={tw("bg-blue-600 flex items-center justify-center")}
            color="white"
            onPress={() => submitNew()}
          ></IconButton>
        </View>

        {todos.map((todo, key) => (
          <View
            key={key}
            style={tw("flex flex-row items-center p-2 justify-between")}
          >
            <RadioButton
              value="first"
              status={todo.status ? "checked" : "unchecked"}
              onPress={() =>
                dispatch(
                  updateTodos({
                    _id: todo._id,
                    status: todo.status === 1 ? 0 : 1,
                    title: todo.title,
                  })
                )
              }
            />

            <Text
              style={tw(
                `text-xl px-2 text-black dark:text-gray-300 flex-1 ${
                  todo.status ? "line-through" : ""
                }`
              )}
            >
              {todo.title}
            </Text>
            <TouchableOpacity
              onPress={() =>
                dispatch(
                  deleteTodos({
                    _id: todo._id,
                  })
                )
              }
            >
              <MaterialCommunityIcons
                name="trash-can-outline"
                size={25}
                color={tw("text-red-700").color}
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}

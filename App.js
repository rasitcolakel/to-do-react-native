import React from "react";
import { TailwindProvider } from "./theme/tailwind";
import { Provider } from "react-redux";
import store from "./store";
import Index from "./Index";
export default function App() {
  return (
    <TailwindProvider>
      <Provider store={store}>
        <Index />
      </Provider>
    </TailwindProvider>
  );
}

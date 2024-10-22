"use client"
import { store } from "@/store/store";
import { Provider } from "react-redux";

const ThemeProvider = ({ children }: Readonly<{ children: React.ReactNode}>) => {

  return (
    <Provider store={store} >
      {children}
    </Provider>
  );
};

export default ThemeProvider

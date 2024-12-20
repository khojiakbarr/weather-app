"use client";

import Header from "../Header/Header";
import { Provider } from "react-redux";
import store from "@/store/store";
import { useEffect } from "react";

export default function Layout({ children }) {
  useEffect(() => {
    if (localStorage.getItem("darkMode")) {
      document.body.classList.add("dark-mode");
    }
  }, []);
  return (
    <Provider store={store}>
      <Header />
      {children}
    </Provider>
  );
}

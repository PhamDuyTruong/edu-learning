import React from "react";
//import Footer from "../../components/Footer";
import Header from "../../components/Header/Header";

export default function AppLayout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
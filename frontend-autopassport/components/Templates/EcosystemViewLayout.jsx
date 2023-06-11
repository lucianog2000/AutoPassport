import React from "react";
import Navbar from "../Organisms/Navbar";
import Footer from "../Organisms/Footer";
import EcosystemViews from "../Organisms/EcosystemGraphs";


export default function EcosystemViewLayout() {
  return (
    <>
      <Navbar />
      <EcosystemViews/>
      <Footer />
    </>
  );
}

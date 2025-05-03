import React from "react";
import AboutClientSide from "./components/AboutClientSide";
import {getEmployees} from "../lib/tina/queris";

async function AboutServerSide() {
  const employees = await getEmployees();
  return <AboutClientSide employees={employees} />;
}

export default AboutServerSide;

import React from "react";
import AboutClientSide from "./components/AboutClientSide";
import {getEmployees} from "../../lib/tina/queris";
import {getTranslations} from "next-intl/server";

async function AboutServerSide() {
  const employees = await getEmployees();
  const aboutUs = await getTranslations("AboutUs");

  return (
    <AboutClientSide
      employees={employees}
      aboutUsTitle={aboutUs("title")}
      firstDescription={aboutUs("description.first")}
      secondDescription={aboutUs("description.second")}
      thirdDescription={aboutUs("description.third")}
      fourthDescription={aboutUs("description.fourth")}
      creatingSince={aboutUs("description.creatingSince")}
      team={aboutUs("team")}
      ceoDescription={aboutUs("ceoDescription")}
      partnerDescription={aboutUs("partnerDescription")}
      teamLeaderDescription={aboutUs("teamLeaderDescription")}
      supervisorDescription={aboutUs("supervisorDescription")}
      architectDescription={aboutUs("architectDescription")}
      financeDescription={aboutUs("financeDescription")}
    />
  );
}

export default AboutServerSide;

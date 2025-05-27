"use client";
import React, {useRef} from "react";
import EmployeesCard from "./EmployeesCard";
import {AnimatedLines} from "./AnimatedLines";
import {motion} from "framer-motion";

function AboutClientSide({
  employees,
  aboutUsTitle,
  firstDescription,
  secondDescription,
  thirdDescription,
  fourthDescription,
  creatingSince,
  team,
  ceoDescription,
  partnerDescription,
  teamLeaderDescription,
  supervisorDescription,
  architectDescription,
  financeDescription,
}) {
  const teamDiv = useRef(null);
  // const teamDivInView = useInView(teamDiv, {once: true});
  return (
    <>
      <div className="pt-40 px-5 w-full md:flex md:justify-between">
        <div className="md:flex md:flex-col md:w-4/5">
          <h1 className="text-6xl w-full leading-snug">
            <AnimatedLines text={aboutUsTitle} />
          </h1>
          <div className="w-full mt-10 md:flex md:flex-wrap">
            <div id="page0" className="m-3 md:w-2/5">
              <AnimatedLines text={firstDescription} />
            </div>
            <div className="m-3 md:w-2/5">
              <AnimatedLines text={secondDescription} />
            </div>
            <div className="m-3 md:w-2/5">
              <AnimatedLines text={thirdDescription} />
            </div>
            <div className="m-3 md:w-2/5">
              <AnimatedLines text={fourthDescription} />
            </div>
          </div>
        </div>
        <div className="my-6 font-bold md:flex md:flex-col md:justify-end">
          <i>
            <AnimatedLines text={creatingSince} />
          </i>
        </div>
      </div>

      <motion.div
        ref={teamDiv}
        // initial={{opacity: 0, y: 100}}
        // transition={{duration: 0.7}}
        // animate={{opacity: teamDivInView ? 1 : 0, y: teamDivInView ? 0 : 50}}
      >
        <h1 className=" pt-10 text-5xl flex justify-center  md:pt-20">
          {team}
        </h1>

        {employees.ceo.length > 0 ? (
          <section>
            <EmployeesCard
              role={employees.ceo[0].role}
              employees={employees.ceo}
              description={ceoDescription}
            />
          </section>
        ) : (
          ""
        )}
        {employees.partners.length > 0 ? (
          <section>
            <EmployeesCard
              role={employees.partners[0].role}
              employees={employees.partners}
              description={partnerDescription}
            />
          </section>
        ) : (
          ""
        )}
        {employees.teamLeader.length > 0 ? (
          <section>
            <EmployeesCard
              role={employees.teamLeader[0].role}
              employees={employees.teamLeader}
              description={teamLeaderDescription}
            />
          </section>
        ) : (
          ""
        )}

        {employees.superVisors.length > 0 ? (
          <section>
            <EmployeesCard
              role={employees.superVisors[0].role}
              employees={employees.superVisors}
              description={supervisorDescription}
            />
          </section>
        ) : (
          ""
        )}
        {employees.architects.length > 0 ? (
          <section>
            <EmployeesCard
              role={employees.architects[0].role}
              employees={employees.architects}
              description={architectDescription}
            />
          </section>
        ) : (
          ""
        )}

        {employees.finance.length > 0 ? (
          <section>
            <EmployeesCard
              role={employees.finance[0].role}
              employees={employees.finance}
              description={financeDescription}
            />
          </section>
        ) : (
          ""
        )}
      </motion.div>
    </>
  );
}

export default AboutClientSide;

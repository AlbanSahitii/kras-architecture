"use client";
import React, {useRef} from "react";
import EmployeesCard from "./EmployeesCard";
import {AnimatedLines} from "./AnimatedLines";
import {motion} from "framer-motion";
import {CircleCheck} from "lucide-react";

function AboutClientSide({
  employees,
  aboutUsTitle,
  firstDescription,
  secondDescription,
  thirdDescription,
  fourthDescription,
  team,

  titleValue,
  firstValue,
  secondValue,
  thirdValue,
  fourthValue,
  fifthValue,
  ceoDescription,
  partnerDescription,
  teamLeaderDescription,
  supervisorDescription,
  architectDescription,
  financeDescription,
}) {
  const teamDiv = useRef(null);
  // const teamDivInView = useInView(teamDiv, {once: true});
  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const lineVariants = {
    hidden: {y: "100%", opacity: 0},
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <>
      <div id="page0" className="h-5"></div>

      <div className="pt-28 px-5 w-full flex justify-center items-center snap-start">
        <div className="md:flex md:flex-col md:w-4/5">
          <h1 id="page1" className="text-4xl w-full leading-snug">
            <AnimatedLines text={aboutUsTitle} />
          </h1>
          <div className="w-full   0 md:flex md:flex-wrap  md:justify-between md:items-center">
            <div className="m-3 md:w-2/5">
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
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className={`flex justify-center items-center text-start snap-start`}
          >
            <motion.div
              variants={lineVariants}
              className="pt-10 md:pt-20 snap-start"
            >
              <p className="font-bold pt-8 text-2xl">{titleValue}</p>
              <div className="flex flex-col items-center">
                <ol>
                  <li className="pt-3 md:pt-4 ml-3 text-lg flex items-start gap-2">
                    <CircleCheck className="w-5 h-5 shrink-0  mt-1" />
                    {firstValue}
                  </li>
                  <li className="pt-3 md:pt-4 ml-3 text-lg flex items-start gap-2">
                    <CircleCheck className="w-5 h-5 shrink-0  mt-1" />
                    {secondValue}
                  </li>
                  <li className="pt-3 md:pt-4 ml-3 text-lg flex items-start gap-2">
                    <CircleCheck className="w-5 h-5 shrink-0  mt-1" />
                    {thirdValue}
                  </li>
                  <li className="pt-3 md:pt-4 ml-3 text-lg flex items-start gap-2">
                    <CircleCheck className="w-5 h-5 shrink-0  mt-1" />
                    {fourthValue}
                  </li>
                  <li className="pt-3 md:pt-4 ml-3 text-lg flex items-start gap-2">
                    <CircleCheck className="w-5 h-5 shrink-0  mt-1" />
                    {fifthValue}
                  </li>
                </ol>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        ref={teamDiv}
        // initial={{opacity: 0, y: 100}}
        // transition={{duration: 0.7}}
        // animate={{opacity: teamDivInView ? 1 : 0, y: teamDivInView ? 0 : 50}}
      >
        <p className=" pt-20 text-5xl flex justify-center  md:pt-20 snap-start">
          {team}
        </p>

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

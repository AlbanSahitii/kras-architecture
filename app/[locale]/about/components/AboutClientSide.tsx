"use client";
import React from "react";
import EmployeesCard from "./EmployeesCard";

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
  return (
    <>
      <div className="pt-40 px-5 w-full md:flex md:justify-between ">
        <div className="md:flex md:flex-col md:w-4/5">
          <h1 className="text-6xl w-full ">{aboutUsTitle}</h1>
          <div className="w-full mt-10 md:flex md:flex-wrap ">
            <p className="m-3 md:w-2/5">{firstDescription}</p>
            <p className="m-3 md:w-2/5">{secondDescription}</p>
            <p className="m-3 md:w-2/5">{thirdDescription}</p>
            <p className="m-3 md:w-2/5">{fourthDescription}</p>
          </div>
        </div>
        <p className="my-6 font-bold md:flex md:flex-col md:justify-end">
          <i>{creatingSince}</i>
        </p>
      </div>
      <div>
        <h1 className=" pt-10 text-5xl flex justify-center  md:pt-40">
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
      </div>
    </>
  );
}

export default AboutClientSide;

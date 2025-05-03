"use client";
import React from "react";
import EmployeesCard from "./EmployeesCard";

function AboutClientSide({employees}) {
  return (
    <>
      <div className="pt-40 px-5 w-full md:flex md:justify-between ">
        <div className="md:flex md:flex-col md:w-4/5">
          <h1 className="text-6xl w-full ">
            Kras is an innovative and progressive practice.
          </h1>
          <div className="w-full mt-10 md:flex md:flex-wrap ">
            <p className="m-3 md:w-2/5">
              In 2025, we founded Kras to offer a unique architectural studio
              that provides comfort, fosters a friendly atmosphere, and
              encourages creativity.
            </p>
            <p className="m-3 md:w-2/5">
              Our aim was to create a space where innovative ideas blend
              seamlessly with the latest technologies and materials, ensuring
              our designs remain fresh and vibrant while staying true to our
              identity.
            </p>
            <p className="m-3 md:w-2/5">
              At Kras, we prioritize our work environment and the atmosphere we
              cultivate within it. We believe that a nurturing and stimulating
              workspace enhances creativity and productivity, allowing our team
              to thrive.
            </p>
            <p className="m-3 md:w-2/5">
              Our commitment to environmental responsibility is woven into our
              design philosophy, as we strive to create spaces that are not only
              aesthetically pleasing but also sustainable.
            </p>
          </div>
        </div>
        <p className="my-6 font-bold md:flex md:flex-col md:justify-end">
          <i>Creating since 2025</i>
        </p>
      </div>
      <div>
        <h1 className=" pt-10 text-5xl flex justify-center  md:pt-40">Team</h1>

        {employees.ceo.length > 0 ? (
          <section>
            <EmployeesCard
              role={employees.ceo[0].role}
              employees={employees.ceo}
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

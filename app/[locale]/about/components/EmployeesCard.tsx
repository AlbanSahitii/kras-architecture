"use client";
import React from "react";
import EmployeeCard from "./EmployeeCard";
import {useParams} from "next/navigation";

function EmployeesCard({employees, role, description}) {
  const params = useParams();
  return (
    <>
      {employees.length > 0 ? (
        <div className="mx-5 mt-14 md:mx-20 snap-start">
          <h1 className="text-3xl">{role}</h1>
          <p>{description}</p>
          <div className="flex flex-wrap justify-evenly md:justify-start">
            {employees.map((employee, index) => (
              <EmployeeCard
                key={index}
                employee={employee}
                role={
                  params!.locale === "en" ? employee.role : employee.germanRole
                }
              />
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default EmployeesCard;

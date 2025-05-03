"use client";
import React from "react";
import EmployeeCard from "./EmployeeCard";

function EmployeesCard({employees, role}) {
  const descriptions = {
    Ceo: "The Chief Executive Officer (CEO) holds the top executive position within a company. They oversee the organization's overall operations and resource management, make key strategic decisions, and serve as the primary link between the board of directors and the company's day-to-day activities",
    Partner:
      "Our Partners are individuals or organizations that have established a formal collaboration with our company. They contribute essential expertise, resources, and networks that support our strategic objectives and help us broaden our impact in the market.",
    "Team Leader":
      "Our Team Leaders are seasoned professionals responsible for directing and supporting teams within specific projects or departments. They set clear goals, delegate tasks, offer ongoing guidance, and ensure that projects are completed efficiently and successfully.",
    "Super Visor":
      "Our Supervisors manage the full project lifecycle—from planning and execution to completion. They collaborate with stakeholders to define objectives, develop detailed project plans, allocate resources effectively, track progress, and ensure timely, on-budget delivery that meets all quality standards.",
    Architect:
      "Our Architects are expert professionals who design the core structure and architecture of our software systems. They evaluate technical requirements, craft robust solutions, and ensure our systems are built to be scalable, secure, and high-performing.",
    Finance:
      "Our Finance team oversees the financial well-being of the company. They manage budgeting, forecasting, financial planning, accounting, and reporting to ensure we meet our obligations, maintain profitability, and deliver accurate financial insights.",
  };
  const getDescription = role => descriptions[role] || "No Description avaible";
  return (
    <>
      {employees.length > 0 ? (
        <div className="mx-5 mt-14 md:mx-20">
          <h1 className="text-3xl">
            {employees.length >= 2 ? `${role}\`s` : role}
          </h1>
          <p>{getDescription(role)}</p>
          <div className="flex flex-wrap justify-evenly md:justify-start">
            {employees.map((employee, index) => (
              <EmployeeCard key={index} employee={employee} />
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default EmployeesCard;

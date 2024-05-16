import React from "react";
import { FormEvent, useState } from "react";
import { useMultistepForm } from "../../UseMultiForm";
import { PersonalInfoRegis } from "./PersonalInfoRegis";
import { EcontactRegis } from "../docRegisterPage/EmergencyRegis";
import { AllergyRegis } from "./AllergyRegis";

type Props = {};

type FormData = {
  firstName: string;
  middleName: string;
  lastName: string;
  idNumber: string;
  DOB: Date;
  sex: string;
  address: string;
  tel: string;
  email: string;
  nationality: string;
  race: string;
  religion: string;
  bloodType: string;
  eConFirstName: string;
  eConMiddleName: string;
  eConLastName: string;
  eConRelation: string;
  eConTel: string;
  eConEmail: string;
  eConAddress: string;
  allergy: {
    type: string;
    allergen: string;
    status: number;
  }[];
};

const INITIAL_DATA: FormData = {
  firstName: "",
  middleName: "",
  lastName: "",
  idNumber: "",
  DOB: new Date(),
  sex: "",
  address: "",
  tel: "",
  email: "",
  nationality: "",
  race: "",
  religion: "",
  bloodType: "",
  eConFirstName: "",
  eConMiddleName: "",
  eConLastName: "",
  eConRelation: "",
  eConTel: "",
  eConEmail: "",
  eConAddress: "",
  allergy: [{ type: "", allergen: "", status: 0 }],
};

export default function PatientRegisPage({}: Props) {
  const [data, setData] = React.useState<FormData>(INITIAL_DATA);
  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }
  const { step, isFirstStep, isLastStep, back, next } = useMultistepForm([
    <PersonalInfoRegis {...data} updateFields={updateFields} />,
    <EcontactRegis {...data} updateFields={updateFields} />,
    <AllergyRegis {...data} updateFields={updateFields} />,
  ]);
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) return next();
    alert("Successful Inserting Patient Infomation");
  }
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center  px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <form
                className="space-y-4 md:space-y-6"
                action="#"
                onSubmit={onSubmit}
              >
                {step}
                <div className="my-2 flex justify-between">
                  {isFirstStep ? (
                    <button
                      className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-2 mx-2"
                      type="button"
                      disabled
                    >
                      Back
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="w-1/2 text-white bg-green-600 hover:bg-primary-700 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-2 mx-2"
                      onClick={() => {
                        back();
                      }}
                    >
                      Back
                    </button>
                  )}
                  <button
                    className={`w-${isFirstStep ? "full" : "1/2"} text-white ${
                      isLastStep
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-blue-600 hover:bg-blue-700"
                    }  font-medium rounded-lg text-sm px-5 py-2.5 text-center my-2 mx-2`}
                    type="submit"
                  >
                    {isLastStep ? "Finish" : "Next"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

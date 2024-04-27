import React from "react";
import { FormEvent, useState } from "react";
import { useMultistepForm } from "../UseMultiForm";

type Props = {};

type FormData = {
  firstName: string;
  lastName: string;
  idNumber: string;
  DOB: Date;
  sex: string;
  address: string;
  tell: string;
  email: string;
  nationality: string;
  race: string;
  religion: string;
  bloodType: string;
  eConFirstName: string;
  eConLastName: string;
  eConRelation: string;
  eConTell: string;
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
  lastName: "",
  idNumber: "",
  DOB: new Date(),
  sex: "",
    address: "",
    tell: "",
    email:"",
    



export default function PatientRegisPage({}: Props) {
  return <div>PatientRegisPage</div>;
}

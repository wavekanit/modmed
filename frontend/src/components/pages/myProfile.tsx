import React from "react";

import { FormEvent, useState } from "react";

export default function myProfile({ }: Props) {
    const fName = JSON.parse(localStorage.getItem("fName") || '""');
    const lName = JSON.parse(localStorage.getItem("lName") || '""');
    const roleName = JSON.parse(localStorage.getItem("role_name") || '""');
    const email = JSON.parse(localStorage.getItem("email") || '""');
    if (roleName === "doctor") {
        return <>
            {/* {console.log(val)} */}
            <div class="card lg:card-side bg-base-100 shadow-xl">
                <figure><img src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg" alt="Album" /></figure>
                <div class="card-body">
                    <h2 class="card-title">Welcome to your profile! {fName} {lName}</h2>
                    <h3>Your email : {email}</h3>
                    <li>Your ID Number : </li>
                    <li>Citizen ID Number : </li>
                    <li>First Name : </li>
                    <li>Middle Name : </li>
                    <li>Last Name : </li>
                    <li>Date of Birth : </li>
                    <li>Sex : </li>
                    <li>Address : </li>
                    <li>Telephone Number : </li>
                    <li>Nationality : </li>
                    <li>Race : </li>
                    <li>Religion : </li>
                    <li>Blood Type : </li>
                </div>
            </div>
        </>
    }
    else if (roleName === "register") {

    }
}


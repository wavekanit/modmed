import React from "react";
import checkLogin from "../../checkLogin";
type Props = {};

export default function HomePage({}: Props) {
  return <>{checkLogin() ? <h1>{localStorage.getItem("fName")}</h1> : null}</>;
}

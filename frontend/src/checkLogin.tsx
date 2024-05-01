import React, { useEffect } from "react";

type Props = {};

export default function checkLogin() {
  //   const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn === "true") {
    } else {
      // User is not logged in, redirect to login page
      window.location.href = "/login";
    }
  });
  return <div>checkLogin</div>;
}

import React, { useState, useEffect } from "react";
import axios from "axios";

type Props = {};

export default function CheckIn({}: Props) {
  const [email, setEmail] = useState("");
  const [apiData, setApiData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setApiData("");
    setError("");
  }, [email]);

  const checkIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.get("http://localhost:3000/testEmail", {
        params: { email: email },
      });
      console.log(response.data);
      alert(response.data[0]);
      setApiData(response.data);

      // Display the data
      const data = response.data[0];
      const {
        fName,
        lName,
        idNumber,
        DOB,
        sex,
        addresses,
        tel,
        email1,
        pw,
        nationality,
        race,
        religion,
        bloodType,
        e_id,
        relation,
        role_name,
        d_license_id,
        d_department,
        quit_date,
      } = data;
      const formattedDOB = new Date(DOB).toLocaleDateString();

      console.log("First Name:", fName);
      console.log("Last Name:", lName);
      console.log("ID Number:", idNumber);
      console.log("Date of Birth:", formattedDOB);
      console.log("Sex:", sex);
      console.log("Address:", addresses);
      console.log("Telephone:", tel);
      console.log("Email:", email);
      console.log("Password:", pw);
      console.log("Nationality:", nationality);
      console.log("Race:", race);
      console.log("Religion:", religion);
      console.log("Blood Type:", bloodType);
      console.log("Employee ID:", e_id);
      console.log("Relation:", relation);
      console.log("Role Name:", role_name);
      console.log("Doctor License ID:", d_license_id);
      console.log("Doctor Department:", d_department);
      console.log("Quit Date:", quit_date);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={checkIn}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={!email || loading}>
          {loading ? "Checking..." : "Check Innnsjodojsvojn"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {apiData && <p>{apiData}</p>}
    </div>
  );
}

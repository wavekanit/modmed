import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";

type Props = {};

type Role = {
  role_name: string;
  total_hour: number;
  expense: number;
};

type Case = {
    department_name: string;
    number_of_cases: number;
}

export default function Income({ }: Props) {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  const handleMonthChange = (month: number) => {
    setSelectedMonth(month);
  };

  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };
  const [minYear, setMinYear] = useState<number | null>(null);
  const [maxYear, setMaxYear] = useState<number | null>(null);

  const getMinMaxYearApi = async () => {
    try {
      const response = await fetch("http://localhost:3000/getMinMaxYearProfit");
      const data = await response.json();
      setMinYear(parseInt(data[0].min_year));
      setMaxYear(parseInt(data[0].max_year));
      console.log(data);
      console.log(minYear, maxYear);
    } catch (error) {
      console.error("Error fetching data from API:", error);
    }
  };

  const [year, setYear] = useState<number[]>([]);

  useEffect(() => {
    getMinMaxYearApi();
    console.log(minYear, maxYear);
    if (minYear && maxYear) {
      const years = [];
      for (let i = minYear; i <= maxYear; i++) {
        years.push(i);
      }
      setYear(years);
    }
  }, [minYear, maxYear]);

  const [role, setRole] = useState<Role[]>([]);
  const [numCase, setNumCase] = useState<Case[]>([]);

  const getNumber = async (month: number | null, year: number | null) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/getNumberOfCases/${month}/${year}`
      );
      const data = await response.json();
      console.log(data);
      setNumCase(data);
      console.log(data[0].department_name + " " + data[0].number_of_cases);
    } catch (error) {
      console.error("Error fetching data from API:", error);
    }
  };

  useEffect(() => {
    getNumber(selectedMonth, selectedYear);
    }, [selectedMonth, selectedYear]);

  const getNumberOfCases = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(selectedMonth, selectedYear);
    getNumber(selectedMonth, selectedYear);
  };

  console.log(cases);

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="">
            <div className="text-center">
              <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box text-center">
                <li><a href="/income">Performance Report</a></li>
                <li><a href="/staff_report">Number of Staff Report</a></li>
                <li><a href ="/cases_report">Number of Cases Each Department Report</a></li>
              </ul>
            </div>

            <h1 className="text-5xl font-bold">Cases Summary</h1>
            <form onSubmit={getNumberOfCases}>
              <div className="my-5">
                <div>
                  <h2 className="text-2xl">Select Month</h2>
                  <div className="join justify-center">
                    {Array.from({ length: 12 }, (_, index) => (
                      <input
                        key={index}
                        className="join-item btn btn-square"
                        type="radio"
                        name="monthS"
                        value={String(index + 1)}
                        aria-label={String(index + 1)}
                        onChange={() => handleMonthChange(index + 1)}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl">Select Year</h2>
                  <select
                    className="select w-full max-w-xs"
                    onChange={(e) => handleYearChange(Number(e.target.value))}
                  >
                    <option disabled selected>
                      Select Year
                    </option>
                    {year.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
                {/* <button className="btn btn-primary my-2" type="submit">
                  Find
                </button> */}
              </div>
            </form>
            <div className="stats text-primary-content border-4 border-sky-400 shadow-lg my-2">
              <div className="stats stats-vertical lg:stats-horizontal shadow">
              {numCase.map((item) => (
                <div className="stat">
                  <div className="stat-title">{item.department_name}</div>
                  <div className="stat-value">{item.number_of_cases}</div>
                  <div className="stat-desc">Cases</div>
                </div>
                    
                ))}
                
              </div>
            </div>
            <br />
          </div>
        </div>
      </div>
    </>
  );
}

import React from "react";
import { useState } from "react";

type Props = {};

export default function Income({}: Props) {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  const handleMonthChange = (month: number) => {
    setSelectedMonth(month);
  };

  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  const year = [2021, 2022, 2023, 2024, 2025];

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="">
            <h1 className="text-5xl font-bold">Income Summary</h1>
            <form action="">
              <div className="my-5">
                <div>
                  <h2 className="text-2xl">Select Month</h2>
                  <div className="join justify-center">
                    {Array.from({ length: 12 }, (_, index) => (
                      <input
                        key={index}
                        className="join-item btn btn-square"
                        type="radio"
                        name="options"
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
                <button className="btn btn-primary my-2" type="submit">
                  Find
                </button>
              </div>
            </form>
            <div className="stats text-primary-content border-4 border-sky-400 shadow-lg">
              <div className="stats stats-vertical lg:stats-horizontal shadow">
                <div className="stat">
                  <div className="stat-title">Income</div>
                  <div className="stat-value">31K</div>
                  <div className="stat-desc">Jan 1st - Feb 1st</div>
                </div>

                <div className="stat">
                  <div className="stat-title">Outcome</div>
                  <div className="stat-value">4,200</div>
                  <div className="stat-desc">↗︎ 400 (22%)</div>
                </div>

                <div className="stat">
                  <div className="stat-title">Profit</div>
                  <div className="stat-value">1,200</div>
                  <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

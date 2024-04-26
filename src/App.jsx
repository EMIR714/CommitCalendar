import React, { useState } from "react";
import moment from "moment";
import Timeline from "./components/CalendarNoLib/Timeline";
import { useFetchData } from "./hooks/useFetchData";
import "./App.css";

function App() {
  const [year, setYear] = useState(2023);
  const { data: rawData, error } = useFetchData(
    `https://dpg.gg/test/calendar.json?year=${year}`
  );

  if (error) {
    return <div>Произошла ошибка: {error.message}</div>;
  }

  let data = [];
  if (rawData) {
    data = Object.keys(rawData).map((date) => ({
      date: moment(date),
      value: rawData[date],
    }));
  }

  let startDate = moment().year(year).startOf("year");
  let dateRange = [startDate, startDate.clone().endOf("year")];

  return (
    <>
      <div className="main">
        <select value={year} onChange={(e) => setYear(e.target.value)}>
          <option value={moment().year() - 1}>{moment().year() - 1}</option>
          <option value={moment().year() - 2}>{moment().year() - 2}</option>
        </select>
        {data ? (
          data.length > 0 && (
            <Timeline
              range={dateRange}
              data={data}
              colorFunc={({ alpha }) => `rgba(3, 160, 3, ${alpha})`}
            />
          )
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    </>
  );
}

export default App;

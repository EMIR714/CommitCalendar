import React, { useEffect, useState } from "react";
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import './GithubCommitCalendar.css';
import { useFetchData } from '../hooks/useFetchData';

function GithubCommitCalendar() {
  const { data: rawData } = useFetchData('https://dpg.gg/test/calendar.json');
  const [data, setData] = useState(null);
  const [year, setYear] = useState(2022);
  const [years, setYears] = useState([]);

  useEffect(() => {
    if (rawData) {
      const yearsData = Object.keys(rawData).map(date => new Date(date).getFullYear());
      const uniqueYears = [...new Set(yearsData)];
      setYears(uniqueYears);

      const filteredData = Object.entries(rawData)
        .map(([date, count]) => ({ date, count }))
        .filter(item => new Date(item.date).getFullYear() === year);
      setData(filteredData);
    }
  }, [rawData, year]);

  const handleChange = (event) => {
    setYear(parseInt(event.target.value));
  };

  return (
    <div className="main">
      <div class="select">
      <select value={year} onChange={handleChange}>
        {years.map(year => <option key={year} value={year}>{year}</option>)}
      </select>
      </div>
      {data ? (
      <CalendarHeatmap
      startDate={new Date(`${year}-01-01`)}
      endDate={new Date(`${year}-12-31`)}
      showWeekdayLabels={true}
      weekdayLabels={['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', ]}
      monthLabels={['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']}
      values={data}
      classForValue={(value) => {
          if (!value) {
            return 'color-empty';
          } else if (value.count <= 2) {
            return 'color-scale-1-1';
          } else if (value.count <= 3) {
            return 'color-scale-1-2';
          } else if (value.count <= 6) {
            return 'color-scale-2';
          } else if (value.count <= 9) {
            return 'color-scale-3';
          } else if (value.count <= 12) {
            return 'color-scale-4';
          } else {
            return 'color-scale-5';
          }
        }}
      tooltipDataAttrs={(value) => { 
          return value ? { 'data-tip': `${value.date}: ${value.count} commits` } : { 'data-tip': '' };
        }}
      titleForValue={(value) => value ? `${value.date}: ${value.count} commits` : "No data"}
    />
    
    ) : (
      <p>Loading data...</p>
    )}
    </div>
  );
}

export default GithubCommitCalendar;
import React, { useEffect, useState } from "react";
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import './GithubCommitCalendar.css';
import { Tooltip as ReactTooltip, Tooltip } from 'react-tooltip';


import 'react-tooltip/dist/react-tooltip.css';




function GithubCommitCalendar() {
  const [data, setData] = useState([]);
  const [year, setYear] = useState((new Date()).getFullYear());

  useEffect(() => {
    fetch('https://dpg.gg/test/calendar.json')
      .then(response => response.json())
      .then(data => {
        const filteredData = Object.entries(data)
          .map(([date, count]) => ({ date, count }))
          .filter(item => new Date(item.date).getFullYear() === year);
        setData(filteredData);
      });
  }, [year]);
  
  
  const handleChange = (event) => {
    setYear(parseInt(event.target.value));
  };

  return (
    <div className="main">
      <select value={year} onChange={handleChange}>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
      </select>
      <CalendarHeatmap
        startDate={new Date(`${year}-01-01`)}
        endDate={new Date(`${year}-12-31`)}
        showWeekdayLabels={true}
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
          tooltipDataAttrs={(value) =>  { 
            return { 'data-tip': `${value.date}: ${value.count}` } 
          }}
          title={(value) =>  { 
            return { 'data-tip': `${value.date}: ${value.count}` } 
          }}
          
             />
      <ReactTooltip id='heatmapTooltip' effect='solid' />
    </div>
  );
}

export default GithubCommitCalendar;

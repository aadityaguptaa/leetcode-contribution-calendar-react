import React, { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "react-github-contribution-calendar";
import { useParams } from 'react-router-dom';


const CalendarLeetcode = () => {
  const { username } = useParams();

  const [data, setData] = useState();
  const [values, setValues] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://leetcode-stats-api.herokuapp.com/${username}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data?.submissionCalendar) {
      const formattedDates = Object.entries(data.submissionCalendar).reduce((accumulator, [key, value]) => {
        const formattedDate = convertUnixTimestampToDate(key);
        accumulator[formattedDate] = value;
        return accumulator;
      }, {});

      setValues(formattedDates);
      console.log(values);
    }
  }, [data]);

  const convertUnixTimestampToDate = (timestamp) => {
    const milliseconds = timestamp * 1000;
    const dateObject = new Date(milliseconds);
    return dateObject.toISOString().slice(0, 10);
  };

  const panelAttributes = { rx: 6, ry: 6 };
  const panelColors = ["#EEEEEE", "#F78A23", "#F87D09", "#AC5808", "#7B3F06"];
  return (
    <div >
      {data ? ( 
      <div className="cal-div" style={{ width:'100vw'}}>
      <Calendar
          values={values}
          panelAttributes={panelAttributes}
          panelColors={panelColors}
        />
        </div>
    ) : (
      <div>Loading data...</div>
    )}
    </div>

    
    
  )
}

export default CalendarLeetcode
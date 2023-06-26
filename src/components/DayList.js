// import dummy from "../db/data.json";
//-> instead of dummy data juse json server for API
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function DayList() {
  const [data, setData] = useState([]);

  async function getData() {
    try {
      const response = await fetch("http://localhost:3001/days");
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <ul className="dayList">
        {data.map((day) => (
          <li key={day.id}>
            <Link to={`/day/${day.day}`}>Day{day.day}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default DayList;

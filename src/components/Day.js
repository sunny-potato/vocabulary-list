// import dummy from "../db/data.json";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Word from "./Word";

function Day() {
  const { day } = useParams();
  //   const wordList = dummy.words.filter((word) => word.day === Number(day));
  //   console.log(wordList);

  const [data, setData] = useState([]);
  async function fetchData(day) {
    try {
      const response = await fetch(`http://localhost:3001/words?day=${day}`);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData(day);
  }, [day]);

  return (
    <>
      {/* <h2>Day {wordList[0].day}</h2>
      <table className="wordList">
        <thead>
          <tr>
            <td>Checkbox</td>
            <td>English</td>
            <td>Norwegian</td>
          </tr>
        </thead>
        <tbody>
          {wordList.map((word) => (
            <Word word={word} />
          ))}
        </tbody>
      </table> */}
      <h2>Day {day}</h2>
      <table className="wordList">
        <thead>
          <tr key={0}>
            <td>Checkbox</td>
            <td>English</td>
            <td>Norwegian</td>
          </tr>
        </thead>
        <tbody>
          {data.map((word) => (
            <Word word={word} key={word.id} />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Day;

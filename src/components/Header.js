import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Header() {
  const [day, setDay] = useState(0);

  async function getData() {
    try {
      const daysResponse = await fetch(`http://localhost:3001/days`);
      const daysData = await daysResponse.json();
      console.log(daysData, daysData.length);
      setDay(daysData.length);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);
  const defaultInput = {
    id: 0,
    day: 0,
  };
  function updateDay() {
    defaultInput.day = day + 1;
  }

  async function createNewDay() {
    try {
      const response = await fetch(`http://localhost:3001/days`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(defaultInput),
      });
      if (response.ok) {
        window.location.reload(true);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function addNewDay() {
    updateDay();
    console.log(defaultInput);
    createNewDay();
  }
  return (
    <>
      <div className="header">
        <Link to="/">
          <h2>Voca list</h2>
        </Link>
        <div>
          <Link to="/newword">
            <button>add word</button>
          </Link>
          <button onClick={addNewDay}>add day</button>
        </div>
      </div>
    </>
  );
}

export default Header;

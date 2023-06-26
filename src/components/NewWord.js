import { useState, useEffect } from "react";

function NewWord() {
  const defaultInput = {
    id: 0,
    day: 1,
    eng: "",
    nor: "",
    isDone: false,
  };
  const [input, setInput] = useState(defaultInput);
  const [days, setDays] = useState([]);
  const [wordsLength, setWordsLength] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  function onChangeHandler(key, value) {
    setInput({ ...input, [key]: value });
    if (value) {
      setShowMessage(false);
    }
  }

  async function getData() {
    try {
      const daysResponse = await fetch(`http://localhost:3001/days`);
      const daysData = await daysResponse.json();
      setDays(daysData);
      const wordsResponse = await fetch(`http://localhost:3001/words`);
      const wordsData = await wordsResponse.json();
      setWordsLength(wordsData.length);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  function updateId() {
    const id = wordsLength.length;
    input.id = id;
    input.day = Number(input.day);
    console.log(input);
  }

  async function createDate() {
    try {
      if (input.id !== 0) {
        const response = await fetch(`http://localhost:3001/words`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        });
        await response.json();
        setShowMessage(true);
      } else {
        setShowMessage(false);
        console.log("new data with id is 0");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function resetdata() {
    setInput(defaultInput);
    setDays([]);
    setWordsLength(0);
    getData();
  }

  function onSubmit(event) {
    event.preventDefault();
    updateId();
    if (input.eng && input.nor) {
      createDate();
      resetdata();
      setShowInfo(false);
    } else {
      setShowInfo(true);
    }
  }
  console.log("showMessage : ", showMessage);
  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="english" autoFocus>
            English :{" "}
          </label>
          <input
            name="english"
            value={input.eng}
            onChange={(event) => onChangeHandler("eng", event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="norwegian">Norwegian : </label>
          <input
            name="norwegian"
            value={input.nor}
            onChange={(event) => onChangeHandler("nor", event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="day">Day : </label>
          <select
            value={input.day}
            onChange={(event) => onChangeHandler("day", event.target.value)}
          >
            {days.map((day) => (
              <option key={day.id} value={day.day}>
                {day.day}
              </option>
            ))}
          </select>
        </div>
        <input type="submit" value="Save" />
      </form>
      <div>
        {showMessage ? (
          <div className="successResult">success!</div>
        ) : (
          <div></div>
        )}
        {showInfo ? (
          <div>English & Norwegian can not be empty </div>
        ) : (
          <div></div>
        )}
      </div>

      <div className="failResult">Fail!</div>
    </>
  );
}

export default NewWord;

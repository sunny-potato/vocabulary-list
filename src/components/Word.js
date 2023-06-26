import { useState } from "react";

function Word({ word }) {
  // console.log(word);
  const [isShow, setIsShow] = useState(false);
  const [isDone, setIsDone] = useState(word.isDone);

  function toggleIsShow() {
    setIsShow(!isShow);
  }

  async function toggleIsDone() {
    try {
      await fetch(`http://localhost:3001/words/${word.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...word, isDone: !isDone }),
      });
      setIsDone(!isDone);
    } catch (error) {
      console.error(error);
    }
  }
  //   function toggleIsDone() {
  //     setIsDone(!isDone);
  //   }

  async function deleteHandler() {
    console.log("delete");
    try {
      const response = await fetch(`http://localhost:3001/words/${word.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        window.location.reload(true);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function resetData() {}
  return (
    <>
      <tr className={isDone ? "off" : "on"}>
        <td>
          <input type="checkbox" checked={isDone} onChange={toggleIsDone} />
        </td>
        <td>{word.eng}</td>
        <td>{isShow && word.nor}</td>
        <td>
          <button onClick={toggleIsShow}>
            {isShow ? "hidden" : "meaning"}
          </button>
          <button onClick={deleteHandler}>delete</button>
        </td>
      </tr>
    </>
  );
}

export default Word;

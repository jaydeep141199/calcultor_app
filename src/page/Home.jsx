
import React, { useState } from "react";
import { IconBackspace } from "@tabler/icons-react";
import "../assets/style.css";

const Home = () => {
  const operators = /[+\-*/]/g;
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(0);
  const [memories, setMemories] = useState([]);
  const [history, setHistory] = useState([]);
  const [view, setView] = useState("history");

  const handleAppend = (value) => {
    setQuery((prev) => prev + value);
  };

  const handleresult = () => {
    const data = query.split("");
    let acc = parseInt(data[0], 10);
    
    for (let index = 1; index < data.length; index++) {
      const num = data[index];
      if (num === "+" || num === "-" || num === "*" || num === "/") {
        const nextNum = parseInt(data[index + 1], 10);
        if (num === "+") {
          acc += nextNum;
        } else if (num === "-") {
          acc -= nextNum;
        } else if (num === "*") {
          acc *= nextNum;
        } else if (num === "/") {
          acc /= nextNum;
        }
        index++;
      }
    }
    setResult(acc);
    setHistory((prevHistory) => [...prevHistory, { query, result: acc }]);
    setQuery("");
  };

  const handleClearAll = () => {
    setQuery("");
    setResult(0);
  };

  const handleBackspace = () => {
    setQuery((prev) => prev.slice(0, -1));
  };

  const handleClearEnd = () => {
    if (!query) return;
    const operatorMatch = query.match(operators);
    if (!operatorMatch) return;
    const lastOperator = operatorMatch.pop();
    const lastOperatorIndex = query.lastIndexOf(lastOperator);
    const result = query.slice(0, lastOperatorIndex);
    setQuery(result);
  };

  const clearAllMemory = () => {
    setMemories([]);
  };

  // Toggle between history and memory view
  const toggleView = () => {
    setView(view === "history" ? "memory" : "history");
  };

  return (
    <>
      <div className="maincalculater">
        <div className="display">
          <div>
            {/* <button onClick={toggleView}>Toggle</button> */}
            
          </div>
          <div>{query || 0}</div>
          
        </div>
        {result !== 0 && <div>Result :-{result}</div>}
        {/* {view === "history" ? (
              <div>
                {history.map((entry, index) => (
                  <div key={index}>
                    {entry.query} = {entry.result}
                  </div>
                ))}
              </div>
            ) : (
              <div>
                {memories.map((memory, index) => (
                  <div key={index}>
                    Memory {index + 1}: {memory}
                  </div>
                ))}
              </div>
            )} */}
        <div className="numeric">
          <button className="memory_buttons" onClick={clearAllMemory}>MC</button>
          <button className="memory_buttons"></button>
          <button className="memory_buttons"></button>
          <button className="memory_buttons"></button>

          <button className="memory_buttons">MR</button>
          <button className="memory_buttons">M+</button>
          <button className="memory_buttons">M-</button>
          <button className="memory_buttons">MS</button>
          {query.match(operators)?.length !== 0 ? (
            <button className="buttons" onClick={handleClearEnd}>CE</button>
          ) : (
            <button className="buttons" disabled>CE</button>
          )}
          <button className="buttons" onClick={handleClearAll}>C</button>
          <button className="buttons" onClick={handleBackspace}><IconBackspace /></button>
          <button className="buttons" onClick={() => handleAppend("/")}>/</button>
          <button className="buttons" onClick={() => handleAppend("7")}>7</button>
          <button className="buttons" onClick={() => handleAppend("8")}>8</button>
          <button className="buttons" onClick={() => handleAppend("9")}>9</button>
          <button className="buttons" onClick={() => handleAppend("*")}>*</button>
          <button className="buttons" onClick={() => handleAppend("4")}>4</button>
          <button className="buttons" onClick={() => handleAppend("5")}>5</button>
          <button className="buttons" onClick={() => handleAppend("6")}>6</button>
          <button className="buttons" onClick={() => handleAppend("-")}>-</button>
          <button className="buttons" onClick={() => handleAppend("1")}>1</button>
          <button className="buttons" onClick={() => handleAppend("2")}>2</button>
          <button className="buttons" onClick={() => handleAppend("3")}>3</button>
          <button className="buttons" onClick={() => handleAppend("+")}>+</button>
          <button className="buttons" disabled></button>
          <button className="buttons" onClick={() => handleAppend("0")}>0</button>
          <button className="buttons" onClick={() => handleAppend(".")}>.</button>

          <button className="buttons equal" onClick={handleresult}>=</button>
        </div>
      </div>
    </>
  );
};

export default Home;

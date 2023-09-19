import React, { useState, useRef, useEffect } from "react";
import {
  getRandomWord,
  getSolutionWordList,
  getAllPossibleWordList,
} from "../assets/wordbank";

var wor = "";
const WordleBoard = () => {

  const [currentRow, setCurrentRow] = useState(0);
  const [row1, setRow1] = useState(Array(5).fill("*"));
  const [row2, setRow2] = useState(Array(5).fill("*"));
  const [row3, setRow3] = useState(Array(5).fill("*"));
  const [row4, setRow4] = useState(Array(5).fill("*"));
  const [row5, setRow5] = useState(Array(5).fill("*"));
  const [row6, setRow6] = useState(Array(5).fill("*"));
  const [row1Color, setRow1Color] = useState(["g", "g", "g", "g", "g"]);
  const [row2Color, setRow2Color] = useState(["g", "g", "g", "g", "g"]);
  const [row3Color, setRow3Color] = useState(["g", "g", "g", "g", "g"]);
  const [row4Color, setRow4Color] = useState(["g", "g", "g", "g", "g"]);
  const [row5Color, setRow5Color] = useState(["g", "g", "g", "g", "g"]);
  const [row6Color, setRow6Color] = useState(["g", "g", "g", "g", "g"]);
  const [word, setWord] = useState("");
  const [targetWord, setTargetWord] = useState("");
  const [won, setWon] = useState(false);
  const [allPossibleWordList, setAllPossibleWordList] = useState(
    getAllPossibleWordList()
  );
  const [solutionWordList, setSolutionWordList] = useState(
    getSolutionWordList()
  );
  const firstCellRef = useRef(null);
  const tableRef = useRef(null);

  useEffect(() => {
    setAllPossibleWordList(getAllPossibleWordList());
    setSolutionWordList(getSolutionWordList());
    const target = getRandomWord();
    setTargetWord(target.toLowerCase());
    firstCellRef.current.focus();
  }, [won]);

  const isRowComplete = (row) => {
    return row.every((letter) => letter !== "*");
  };

  const giveHints = (word, row) => {
    if (!(allPossibleWordList.includes(word.toLowerCase()))){
      alert("Invalid word");
      return;
    } 
    console.log("target word: " + targetWord);
    var hints = "";
    for(var i = 0;i<5;i++){
      if(word.charAt(i) === targetWord.charAt(i)){
        hints = hints + "G";
    }
    else if(targetWord.includes(word.charAt(i))){
        hints = hints + "Y";
    }
    else{
        hints = hints + "g";
    }
    }
    console.log("hints: " + hints);
    switch (row) {
      case 0:
      // for(i in hints){
      //   row1Color[i] = hints.charAt(i);
      // }
        setRow1Color(hints.split(''));
        break;
      case 1:
      // for (i in hints) {
      //   row2Color[i] = hints.charAt(i);
      // }
        setRow2Color(hints.split(''));
        break;
      case 2:
      // for (i in hints) {
      //   row3Color[i] = hints.charAt(i);
      // }
        setRow3Color(hints.split(''));
        break;
      case 3:
      // for (i in hints) {
      //   row4Color[i] = hints.charAt(i);
      // }
        setRow4Color(hints.split(''));
        break;
      case 4:
      // for (i in hints) {
      //   row5Color[i] = hints.charAt(i);
      // }
        setRow5Color(hints.split(''));
        break;
      case 5:
      // for (i in hints) {
      //   row6Color[i] = hints.charAt(i);
      // }
        setRow6Color(hints.split(''));
        break;
      default:break;
    }
    return hints;
  }

  const handleInput = (e, row, col) => {
    e.preventDefault();
    // console.log(solutionWordList);
    // append the letter to the useState "word"
    // console.log(e.target.value);
    wor = wor + e.target.value;
    // console.log("var: " + wor);
    setWord(wor);
    // console.log("useState: " + word);
    // Get the input value and check if it is a single, lowercase letter
    const value = e.target.value.toLowerCase();
    if (value.length === 1 && value.match(/[a-z]/)) {
      // Copy the appropriate row
      let newRow;
      switch (row) {
        case 0:
          newRow = [...row1];
          break;
        case 1:
          newRow = [...row2];
          break;
        case 2:
          newRow = [...row3];
          break;
        case 3:
          newRow = [...row4];
          break;
        case 4:
          newRow = [...row5];
          break;
        case 5:
          newRow = [...row6];
          break;
        default:
          break;
      }

      newRow[col] = value;

      // Update the appropriate state
      switch (row) {
        case 0:
          setRow1(newRow);
          break;
        case 1:
          setRow2(newRow);
          break;
        case 2:
          setRow3(newRow);
          break;
        case 3:
          setRow4(newRow);
          break;
        case 4:
          setRow5(newRow);
          break;
        case 5:
          setRow6(newRow);
          break;
        default:
          break;
      }

      // Focus on the next cell or move to the next row if at the end
      if (col === 4) {
        console.log(row);
        var hints = giveHints(wor, row);
        if (hints === "GGGGG") {
          alert("You won!");
          setWon(true);
          window.location.reload();
        }
        wor = "";
        if (row === 5) {
          e.target.blur();
        } else {
            const table = e.target.parentElement.parentElement;
          setCurrentRow(row + 1);
          
            const firstCellOfNextRow = table.nextSibling.firstChild.firstChild;
            if (table.nextSibling) {
              setTimeout(() => {
                firstCellOfNextRow.focus();
              }, 0);
            }            
          }
        // setCompletedWords("");
      } else {
        const nextCell = e.target.parentElement.nextSibling.firstChild;
        nextCell.focus();
      }
    }
  };


  const handleChangeBackSpace = (e, row, col) => {
    e.preventDefault();
    wor = wor.substring(0, wor.length - 1);
    setWord(wor);
    if (e.keyCode === 8) {
      if (col !== 0) {
        const cells = e.target.parentElement.parentElement.children;
        const prevCell = cells[col - 1].firstChild;
        prevCell.focus();
      }

      // Copy the appropriate row
      let newRow;
      switch (row) {
        case 0:
          newRow = [...row1];
          break;
        case 1:
          newRow = [...row2];
          break;
        case 2:
          newRow = [...row3];
          break;
        case 3:
          newRow = [...row4];
          break;
        case 4:
          newRow = [...row5];
          break;
        case 5:
          newRow = [...row6];
          break;
        default:
          break;
      }

      newRow[col] = "*";

      // Update the appropriate state
      switch (row) {
        case 0:
          setRow1(newRow);
          break;
        case 1:
          setRow2(newRow);
          break;
        case 2:
          setRow3(newRow);
          break;
        case 3:
          setRow4(newRow);
          break;
        case 4:
          setRow5(newRow);
          break;
        case 5:
          setRow6(newRow);
          break;
        default:
          break;
      }
    }
  };
  const rows = [row1, row2, row3, row4, row5, row6];
  return (
    <div className="flex justify-center items-center h-screen">
      <table ref={tableRef} className="table-fixed border-gray-50">
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((letter, colIndex) => (
                <td key={colIndex} className=" ">
                  <input
                    ref={rowIndex === 0 && colIndex === 0 ? firstCellRef : null}
                    type="text"
                    value={letter === "*" ? "" : letter}
                    // className="text-center w-full"
                    disabled={rowIndex !== currentRow}
                    onChange={(e) => handleInput(e, rowIndex, colIndex)}
                    onKeyDown={(e) =>
                      [8, 46].includes(e.keyCode) &&
                      handleChangeBackSpace(e, rowIndex, colIndex)
                    }
                    className={`text-center m-2 w-12 bg-transparent border p-2 border-slate-700 text-sky-400 ${
                      rowIndex === 0
                        ? row1Color[colIndex] === "G"
                          ? "bg-green-500"
                          : row1Color[colIndex] === "Y"
                          ? "bg-yellow-500"
                          : "bg-gray-500"
                        : rowIndex === 1
                        ? row2Color[colIndex] === "G"
                          ? "bg-green-500"
                          : row2Color[colIndex] === "Y"
                          ? "bg-yellow-500"
                          : "bg-gray-500"
                        : rowIndex === 2
                        ? row3Color[colIndex] === "G"
                          ? "bg-green-500"
                          : row3Color[colIndex] === "Y"
                          ? "bg-yellow-500"
                          : "bg-gray-500"
                        : rowIndex === 3
                        ? row4Color[colIndex] === "G"
                          ? "bg-green-500"
                          : row4Color[colIndex] === "Y"
                          ? "bg-yellow-500"
                          : "bg-gray-500"
                        : rowIndex === 4
                        ? row5Color[colIndex] === "G"
                          ? "bg-green-500"
                          : row5Color[colIndex] === "Y"
                          ? "bg-yellow-500"
                          : "bg-gray-500"
                        : row6Color[colIndex] === "G"
                        ? "bg-green-500"
                        : row6Color[colIndex] === "Y"
                        ? "bg-yellow-500"
                        : "bg-gray-500"
                    }`}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WordleBoard;


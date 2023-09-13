import React, { useState, useRef, useEffect } from "react";
// import { emulateTab } from "emulate-tab";
import { getRandomWord, getWordList } from "../assets/wordbank";

const WordleBoard = () => {

  const [currentRow, setCurrentRow] = useState(0);
  const [row1, setRow1] = useState(Array(5).fill("*"));
  const [row2, setRow2] = useState(Array(5).fill("*"));
  const [row3, setRow3] = useState(Array(5).fill("*"));
  const [row4, setRow4] = useState(Array(5).fill("*"));
  const [row5, setRow5] = useState(Array(5).fill("*"));
  const [row6, setRow6] = useState(Array(5).fill("*"));
  const [completedWord, setCompletedWord] = useState([]);
  const [targetWord, setTargetWord] = useState("");
  const [wordList, setWordList] = useState(getWordList());
  const firstCellRef = useRef(null);
  const tableRef = useRef(null);

  useEffect(() => {
    setWordList(getWordList());
    const target = getRandomWord();
    setTargetWord(target.toLowerCase());
    firstCellRef.current.focus();
    
  }, []);

  const isRowComplete = (row) => {
    return row.every((letter) => letter !== "*");
  };

  const handleInput = (e, row, col) => {
    e.preventDefault();
    // Get the input value and check if it is a single, lowercase letter
    const value = e.target.value.toLowerCase();
    if (value.length === 1 && value.match(/[a-z]/)) {
        setCompletedWord([...completedWord, value]);
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
        setCompletedWord([...completedWord, value]);
        console.log(completedWord);
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
      <table ref={tableRef} className="table-fixed">
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((letter, colIndex) => (
                <td key={colIndex} className="border p-2">
                  <input
                    ref={rowIndex === 0 && colIndex === 0 ? firstCellRef : null}
                    type="text"
                    value={letter === "*" ? "" : letter}
                    className="bg-transparent text-center w-full"
                    disabled={rowIndex !== currentRow}
                    onChange={(e) => handleInput(e, rowIndex, colIndex)}
                    onKeyDown={(e) =>
                      [8, 46].includes(e.keyCode) &&
                      handleChangeBackSpace(e, rowIndex, colIndex)
                    }
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


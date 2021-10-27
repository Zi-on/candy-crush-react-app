import React, { useState, useEffect } from "react";
import Angry from "./pictures/angry-face.png"
import Cold from "./pictures/cold-face.png"
import Devil from "./pictures/devil.png"
import Pleading from "./pictures/pleading-eyes.png"
import Pumpkin from "./pictures/pumpkin.png"
import Skull from "./pictures/skull.png"
import Blank from "./pictures/blank.png"
const width = 8;
const candyColors = [
  Angry,
  Cold,
  Devil,
  Pleading,
  Pumpkin,
  Skull
];

function App() {
  const [currentRandomBoard, setRandomBoard] = useState([])
  const [squareBeingDragged, setSquareBeingDragged] = useState(null)
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null)

  const removeColumnOfThree = () => {

    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2]
      const decidedColor = currentRandomBoard[i]

      if (columnOfThree.every(square => currentRandomBoard[square] === decidedColor)) {
        columnOfThree.forEach(square => currentRandomBoard[square] = Blank)
        return true
      }
    }
  }

  const removeColumnOfFour = () => {

    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3]
      const decidedColor = currentRandomBoard[i]

      if (columnOfFour.every(square => currentRandomBoard[square] === decidedColor)) {
        columnOfFour.forEach(square => currentRandomBoard[square] = Blank)
        return true
      }
    }
  }

  const removeRowOfThree = () => {

    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2]
      const decidedColor = currentRandomBoard[i]
      const dontCheck = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]

      if (dontCheck.includes(i)) continue

      if (rowOfThree.every(square => currentRandomBoard[square] === decidedColor)) {
        rowOfThree.forEach(square => currentRandomBoard[square] = Blank)
        return true
      }
    }
  }

  const removeRowOfFour = () => {

    for (let i = 0; i < 47; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3]
      const decidedColor = currentRandomBoard[i]
      const dontCheck = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]

      if (dontCheck.includes(i)) continue

      if (rowOfFour.every(square => currentRandomBoard[square] === decidedColor)) {
        rowOfFour.forEach(square => currentRandomBoard[square] = Blank)
        return true
      }
    }
  }

  const moveDown = () => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
      const isFirstRow = firstRow.includes(i)

      if (isFirstRow && currentRandomBoard[i] === Blank) {
        currentRandomBoard[i] = candyColors[Math.floor(Math.random() * candyColors.length)]
      }

      if ((currentRandomBoard[i + width]) === Blank) {
        currentRandomBoard[i + width] = currentRandomBoard[i]
        currentRandomBoard[i] = Blank
      }
    }
  };

  const dragStart = (e) => {
    console.log(e.target)
    setSquareBeingDragged(e.target)
    console.log('dragStart')
  }
  const dragDrop = (e) => {
    console.log(e.target)
    console.log('dragDrop')
    setSquareBeingReplaced(e.target)


  }
  const dragEnd = (e) => {
    console.log(e.target)
    console.log('dragEnd')
    const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'));
    const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'));

    currentRandomBoard[squareBeingReplacedId] = squareBeingDragged.getAttribute('src')
    currentRandomBoard[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src')

    const validMoves = [
      squareBeingDraggedId - 1,
      squareBeingDraggedId + 1,
      squareBeingDraggedId - width,
      squareBeingDraggedId + width
    ]

    const validMove = validMoves.includes(squareBeingReplacedId)
    const isRowOfFour = removeRowOfFour()
    const isColumnOfFour = removeColumnOfFour()
    const isRowOfThree = removeRowOfThree()
    const isColumnOfThree = removeColumnOfThree()

    if (validMove && (isRowOfFour || isRowOfThree || isColumnOfFour || isColumnOfThree)) {
      setSquareBeingDragged(null)
      setSquareBeingReplaced(null)
      console.log('if', validMove)
    }
    else {
      console.log('else')
      currentRandomBoard[squareBeingReplacedId] = squareBeingReplaced.style.backgroundColor
      currentRandomBoard[squareBeingDraggedId] = squareBeingDragged.style.backgroundColor
      removeColumnOfThree(false)
      removeRowOfFour(false)
      removeColumnOfFour(false)
      removeRowOfThree(false)
      setRandomBoard([...currentRandomBoard])
    }
  }

  const createBoard = () => {
    const randomBoard = [];
    for (let i = 0; i < width * width; i++) {
      const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)];
      randomBoard.push(randomColor);
    }
    setRandomBoard(randomBoard)
  }

  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      removeColumnOfFour()
      removeRowOfFour()
      removeRowOfThree()
      removeColumnOfThree()
      moveDown()
      setRandomBoard([...currentRandomBoard])
    }, 100)
    return () => clearInterval(timer)
  }, [removeColumnOfFour, removeRowOfFour, removeColumnOfThree, removeRowOfThree, moveDown, currentRandomBoard]);



  return (
    <div className="app">
      <div className="board">
        {currentRandomBoard.map((candyColor, index) => (
          <img
            key={index}
            src={candyColor}
            alt={candyColor}
            data-id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          />
        ))}
      </div>

    </div>
  )
}

export default App;

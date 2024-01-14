/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import { useCallback, useEffect, useState } from 'react';
import { Buttons } from './components/buttons';
import { Grid } from './components/grid';

function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}


function App() {
  const [intervalId, setIntervalId] = useState(0)
  const [speed, setSpeed] = useState(100);
  const [grid, setGrid] = useState({
    rows: 30,
    cols: 50
  });

  const [generation, setGeneration] = useState(0);
  const [gridFull, setGridFull] = useState(() =>
    Array(30).fill().map(() => Array(50).fill(false))
  );


  const play = useCallback(() => {
    setGridFull((prevGrid) => {
      const g = prevGrid;
      const g2 = arrayClone(prevGrid);

      for (let i = 0; i < grid.rows; i++) {
        for (let j = 0; j < grid.cols; j++) {
          let count = 0;
          if (i > 0) if (g[i - 1][j]) count++;
          if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
          if (i > 0 && j < grid.cols - 1) if (g[i - 1][j + 1]) count++;
          if (j < grid.cols - 1) if (g[i][j + 1]) count++;
          if (j > 0) if (g[i][j - 1]) count++;
          if (i < grid.rows - 1) if (g[i + 1][j]) count++;
          if (i < grid.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
          if (i < grid.rows - 1 && j < grid.cols - 1) if (g[i + 1][j + 1]) count++;
          if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
          if (!g[i][j] && count === 3) g2[i][j] = true;
        }
      }

      setGeneration((prevGen) => prevGen + 1);
      return g2;
    });
  }, [grid])

  const selectBox = (row, col) => {
    setGridFull((prevGrid) => {
      const gridCopy = arrayClone(prevGrid);
      gridCopy[row][col] = !gridCopy[row][col];
      return gridCopy;
    });
  };

  const seed = useCallback(() => {
    setGridFull((prevGrid) => {
      const gridCopy = arrayClone(prevGrid);
      for (let i = 0; i < grid.rows; i++) {
        for (let j = 0; j < grid.cols; j++) {
          if (Math.floor(Math.random() * 4) === 1) {
            gridCopy[i][j] = true;
          }
        }
      }
      return gridCopy;
    });
  }, []);

  const playButton = useCallback(() => {
    clearInterval(intervalId);
    const newIntervalId = setInterval(play, speed);
    setIntervalId(newIntervalId);
  }, []);

  const pauseButton = () => {
    clearInterval(intervalId);
  };

  const slow = () => {
    setSpeed(100);
    playButton();
  };

  const fast = () => {
    setSpeed(50);
    playButton();
  };

  const clear = () => {
    const newGrid = Array(grid.rows).fill().map(() => Array(grid.cols).fill(false));
    setGridFull(newGrid);
    setGeneration(0);
  };

  const gridSize = (size) => {
    let grid_size = {
      cols: 70,
      rows: 50,
    }
    switch (size) {
      case "1":
        grid_size = {
          cols: 20,
          rows: 10,
        }
        break;
      case "2":
        grid_size = {
          cols: 20,
          rows: 10,
        }
        break;
      default:
        grid_size = {
          cols: 70,
          rows: 50,
        }
        break;
    }
    setGrid((prevState) => ({
      ...prevState,
      ...grid_size
    }))
    clear()
  };

  useEffect(() => {
    seed()
  }, [seed])

  useEffect(() => {
    playButton()
  }, [playButton])

  return (
    <div>
      <h1>The Game Of Life</h1>
      <Buttons
        playButton={playButton}
        pauseButton={pauseButton}
        slow={slow}
        fast={fast}
        clear={clear}
        seed={seed}
        gridSize={gridSize}
      />
      <Grid
        gridFull={gridFull}
        rows={grid.rows}
        cols={grid.cols}
        selectBox={selectBox}
      />
      <h2>Generations: {generation}</h2>
    </div>
  );
}

export default App;

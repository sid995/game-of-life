import React, { useState, useCallback, useRef } from 'react'
import produce from 'immer'

const NUMROWS = 50
const NUMCOLS = 50

const operations = [
	[0, 1],
	[0, -1],
	[1, 0],
	[-1, 0],
	[1, 1],
	[-1, 1],
	[1, -1],
	[-1, -1]
]

const generateEmptyGrid = () => {
	const rows = []
	for (let i = 0; i < NUMROWS; i++) {
		rows.push(Array.from(Array(NUMCOLS), () => 0))
	}
	return rows
}

function App() {
	const [grid, setGrid] = useState(() => {
		return generateEmptyGrid()
	})

	const [running, setRunning] = useState(false)

	const [gen, setGen] = useState(0)

	const runningRef = useRef(running)
	runningRef.current = running

	const runSimulation = useCallback(() => {
		if (!runningRef.current) {
			return
		}
		setGrid(g => {
			return produce(g, gridCopy => {
				for (let i = 0; i < NUMROWS; i++) {
					for (let k = 0; k < NUMCOLS; k++) {
						let neighbors = 0
						operations.forEach(([x, y]) => {
							const newI = i + x
							const newK = k + y
							if (newI >= 0 && newI < NUMROWS && newK >= 0 && newK < NUMCOLS) {
								neighbors += g[newI][newK]
							}
						})

						if (neighbors < 2 || neighbors > 3) {
							gridCopy[i][k] = 0
						} else if (g[i][k] === 0 && neighbors === 3) {
							gridCopy[i][k] = 1
						}
					}
				}
			})
		})
		setGen(prevGen => prevGen + 1)
		setTimeout(runSimulation, 100)
	}, [])

	return (
		<>
			<button
				onClick={() => {
					setRunning(!running)
					if (!running) {
						runningRef.current = true
						runSimulation()
					}
				}}
			>
				{running ? 'stop' : 'start'}
			</button>
			<button
				onClick={() => {
					setGen(0)
					setGrid(generateEmptyGrid())
				}}
			>
				clear
			</button>
			<button
				onClick={() => {
					const rows = []
					for (let i = 0; i < NUMROWS; i++) {
						rows.push(Array.from(Array(NUMCOLS), () => (Math.random() > 0.7 ? 1 : 0)))
					}
					setGrid(rows)
				}}
			>
				random
			</button>
			<span style={{ marginLeft: 10 }}>Generation: {gen}</span>
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: `repeat(${NUMCOLS}, 20px)`,
					gridColumnGap: '1px'
				}}
			>
				{grid.map((rows, i) =>
					rows.map((col, k) => (
						<div
							key={`${i}-${k}`}
							onClick={() => {
								const newGrid = produce(grid, gridCopy => {
									gridCopy[i][k] = gridCopy[i][k] ? 0 : 1
								})
								setGrid(newGrid)
							}}
							style={{
								width: '20px',
								height: '20px',
								backgroundColor: grid[i][k] ? 'pink' : undefined,
								border: 'solid 1px black'
							}}
						></div>
					))
				)}
			</div>
		</>
	)
}

export default App

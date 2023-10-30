import React, { useContext, useEffect, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import styles from './memoryGame.module.scss'
import { GameContext } from '../../context/GameProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icons from '../../assets/icons';
import winningGif from '../../assets/6mb.gif'

const MemoryGame = () => {

    const navigate = useNavigate();
    const gameContext = useContext(GameContext);
    const initialGridSize = gameContext.gridSize; // Store the initial gridSize
    const [gridSize, setGridSize] = useState(initialGridSize);
    const [grid, setGrid] = useState<any>([]);
    const [selectedPairs, setSelectedPairs] = useState<any>([]);
    const [matchedPairs, setMatchedPairs] = useState<any>([]);
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [showResults, setShowResults] = useState<boolean>(false);
    const [timer, setTimer] = useState(0); // Timer state
    let timerInterval: any; // Variable to store the timer interval ID

    // Function to start the timer
    const startTimer = () => {
        timerInterval = setInterval(() => {
            setTimer((prevTimer) => prevTimer + 1);
        }, 1000);
    };

    // Function to stop the timer
    const stopTimer = () => {
        clearInterval(timerInterval);
    };

    // Function to shuffle an array randomly
    const shuffleArray = (array: any) => {
        const shuffledArray = array.slice();
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };

    const initializeGrid = (gridSize: number) => {
        const totalPairs = gridSize * gridSize / 2;
        const pairs = Array.from({ length: totalPairs }, (_, index) => index);
        const shuffledPairs = shuffleArray([...pairs, ...pairs]);

        const newGrid = [];
        for (let i = 0; i < gridSize; i++) {
            const row = [];
            for (let j = 0; j < gridSize; j++) {
                const index = i * gridSize + j;
                row.push(shuffledPairs[index]);
            }
            newGrid.push(row);
        }
        return newGrid;
    };

    const handleReset = () => {
        const newGrid = initializeGrid(gridSize);
        setGrid(newGrid);
        setGridSize(initialGridSize);
        setSelectedPairs([]);
        setMatchedPairs([]);
        stopTimer();
        setTimer(0);

    }

    const handleNewGame = () => {
        setShowDialog(true);
    }

    useEffect(() => {
        const newGrid = initializeGrid(gridSize);
        setGrid(newGrid);
    }, [gridSize]);

    const formatTime = (timeInSeconds: any) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;;
    };

    const handleIconClick = (rowIndex: any, colIndex: any) => {

        if (!selectedPairs.includes(`${rowIndex}-${colIndex}`)) {
            const newSelectedPairs = [...selectedPairs, `${rowIndex}-${colIndex}`];
            setSelectedPairs(newSelectedPairs);

            if (newSelectedPairs.length === 2) {
                const [row1, col1] = newSelectedPairs[0].split('-');
                const [row2, col2] = newSelectedPairs[1].split('-');

                if (grid[row1][col1] === grid[row2][col2]) {
                    // Matched pair
                    setMatchedPairs([...matchedPairs, grid[row1][col1]]);
                }

                // Start the timer when the user makes the first move
                if (timer === 0) {
                    startTimer();
                }

                // Reset selection after a short delay
                setTimeout(() => {
                    setSelectedPairs([]);
                }, 500);
            }

        }
    };

    useEffect(() => {
        // Check if all pairs are matched
        if (matchedPairs.length === gridSize * gridSize / 2) {
            setShowResults(true);
            stopTimer();
            console.log("Timer stopped");
        }
        // console.log("useEffect executed with matchedPairs:", matchedPairs, "gridSize:", gridSize, "Condition met:", matchedPairs.length === gridSize * gridSize / 2);
    }, [matchedPairs, gridSize]);


    return (
        <>
            <div className={styles.header}>
                <Typography variant='h4' fontWeight={'900'} marginBottom={'3rem'}>memory</Typography>
                <div>
                    <Button variant="contained" className={styles.commonButton} sx={{ marginRight: '1rem' }} onClick={handleReset}><Typography variant='h6' fontWeight={'bold'}>Reset</Typography></Button>
                    <Button variant="contained" className={styles.commonButton}><Typography variant='h6' fontWeight={'bold'} onClick={handleNewGame}>New Game</Typography></Button>
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {grid.map((row: any, rowIndex: any) => (
                        <div key={rowIndex} className={styles.row}>
                            {row.map((number: any, colIndex: any) => {
                                const isSelected = selectedPairs.includes(`${rowIndex}-${colIndex}`);
                                const isMatched = matchedPairs.includes(number);
                                const numIconsClass = `${styles.numIcons} ${isSelected ? styles.selected : ''} ${isMatched ? styles.matched : ''}`;

                                return (
                                    <div
                                        key={colIndex}
                                        className={numIconsClass}
                                        onClick={() => handleIconClick(rowIndex, colIndex)}
                                    >
                                        {gameContext.theme === 'icons' ? (
                                            // Render the icon based on the number
                                            isSelected || isMatched ? <FontAwesomeIcon icon={icons[number]} /> : ''
                                        ) : (
                                            // Render the number
                                            isSelected || isMatched ? number : ''
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>

                <div className={styles.footer}>
                    <div className={styles.footerContainer}>
                        <Typography variant='h6' fontWeight={'bold'}>
                            Time: {formatTime(timer)}
                        </Typography>
                    </div>
                </div>

                <Dialog
                    open={showDialog}
                    onClose={() => setShowDialog(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"You are about to lost all your progress!"}
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={() => setShowDialog(false)}>Cancel</Button>
                        <Button onClick={() => navigate('/')} autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={showResults}
                    onClose={() => setShowResults(false)}
                    PaperProps={{
                        style: {
                            borderRadius: '20px',
                            width: '30rem'
                        },
                    }}
                >
                    <DialogTitle style={{ display: 'flex', justifyContent: 'center' }}>
                        <img src={winningGif} height={200} width={250} />
                    </DialogTitle>
                    <DialogContent style={{
                        display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: '1rem'
                    }}>
                        <Typography variant='h4' color={'green'} fontWeight={700}>🎉You Win🎉</Typography>
                        <Typography variant='h5' fontWeight={700}>All the pairs match!</Typography>
                        <Typography variant='h6'>{`Time: ${formatTime(timer)}`}</Typography>
                    </DialogContent>
                    <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant="contained"
                            style={{
                                width: '200px',
                                backgroundColor: '#FDA214',
                                borderRadius: '20px'
                            }}
                            onClick={() => navigate('/')}>
                            Cool
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    )
}

export default MemoryGame
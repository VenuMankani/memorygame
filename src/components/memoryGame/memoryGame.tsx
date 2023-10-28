import React, { useContext, useEffect, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import styles from './memoryGame.module.scss'
import { GameContext } from '../../context/GameProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icons from '../icons';


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

    // Function to shuffle an array randomly
    const shuffleArray = (array: any) => {
        const shuffledArray = array.slice();
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };

    useEffect(() => {
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

        setGrid(newGrid);
    }, [gridSize]);

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

                // Reset selection after a short delay
                setTimeout(() => {
                    setSelectedPairs([]);
                }, 1000);
            }
        }
    };

    useEffect(() => {
        // Check if all pairs are matched
        if (matchedPairs.length === gridSize * gridSize / 2) {
            setShowResults(true);
        }
    }, [matchedPairs.length === gridSize * gridSize / 2])


    const handleReset = () => {
        setGridSize(initialGridSize);
        setSelectedPairs([]);
        setMatchedPairs([]);
    }

    const handleNewGame = () => {
        setShowDialog(true);
    }

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
                    {/* <div className={styles.footerContainer}>
                        <Typography variant='h6' fontWeight={'bold'}>
                            Time: 00:00
                        </Typography>
                    </div> */}
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
                        <Button onClick={() => setShowDialog(false)}>Disagree</Button>
                        <Button onClick={() => navigate('/')} autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={showResults}
                    onClose={() => setShowResults(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" color={'green'}>
                        🎉You Win🎉
                    </DialogTitle>
                    <DialogContent>
                        <Typography variant='h4'>All the pairs match!</Typography>
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
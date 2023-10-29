import React, { forwardRef, useContext, useState } from 'react'
import { AlertProps, Button, Typography, Snackbar } from '@mui/material';
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from 'react-router-dom'
import styles from './gameSettings.module.scss'
import { GameContext } from '../../context/GameProvider';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const GameSettings = () => {

    const navigate = useNavigate();
    const gameContext = useContext(GameContext);
    const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');

    const validateSelections = () => {
        if (!gameContext.theme) {
            setShowSnackbar(true);
            setSnackbarMessage("Please Select The Theme.");
        } else if (!gameContext.gridSize) {
            setShowSnackbar(true);
            setSnackbarMessage("Please Select The Grid Size.");
        } else {
            navigate('/memory');
        }
    }

    return (
        <div className={styles.container}>
            <Typography variant='h4' fontWeight={'900'} color={'white'} marginBottom={'3rem'}>memory</Typography>
            <div className={styles.settings}>
                <div className={styles.selectTheme}>
                    <Typography variant='h6' fontWeight={'bold'} color={'#73a9ca'}>Select Theme</Typography>
                    <div className={styles.selections}>
                        <Button
                            variant="contained"
                            onClick={() => gameContext.handleTheme('numbers')}
                            style={{
                                backgroundColor:
                                    gameContext.theme === 'numbers' ? '#FDA214' : '#152938',
                            }}
                            className={styles.commonButton}>
                            <Typography variant='h6' fontWeight={'bold'}>Numbers</Typography>
                        </Button>
                        <Button variant="contained" onClick={() => gameContext.handleTheme('icons')}
                            style={{
                                backgroundColor:
                                    gameContext.theme === 'icons' ? '#FDA214' : '#152938',
                            }} className={styles.commonButton}><Typography variant='h6' fontWeight={'bold'}>Icons</Typography></Button>
                    </div>
                </div>

                <div className={styles.selectTheme}>
                    <Typography variant='h6' fontWeight={'bold'} color={'#73a9ca'}>Grid Size</Typography>
                    <div className={styles.selections}>
                        <Button variant="contained" onClick={() => gameContext.handleGridSize(4)}
                            style={{
                                backgroundColor:
                                    gameContext.gridSize === 4 ? '#FDA214' : '#152938',
                            }} className={styles.commonButton}><Typography variant='h6' fontWeight={'bold'}>4x4</Typography></Button>
                        <Button variant="contained" onClick={() => gameContext.handleGridSize(6)}
                            style={{
                                backgroundColor:
                                    gameContext.gridSize === 6 ? '#FDA214' : '#152938',
                            }} className={styles.commonButton}><Typography variant='h6' fontWeight={'bold'}>6x6</Typography></Button>
                        <Button variant="contained" onClick={() => gameContext.handleGridSize(8)}
                            style={{
                                backgroundColor:
                                    gameContext.gridSize === 8 ? '#FDA214' : '#152938',
                            }} className={styles.commonButton}><Typography variant='h6' fontWeight={'bold'}>8x8</Typography></Button>
                    </div>
                </div>

                <div className={styles.startGameBtn}>
                    <Button variant="contained"
                        sx={{
                            height: '4rem',
                            width: '32rem',
                            borderRadius: '25px',
                            backgroundColor: '#FDA214',
                            '&:hover': {
                                backgroundColor: '#FFB84A'
                            }
                        }}
                        onClick={validateSelections}
                    >
                        <Typography variant='h5' fontWeight={'bold'}>Start Game</Typography>
                    </Button>
                </div>
            </div>

            <Snackbar
                open={showSnackbar}
                autoHideDuration={2000}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                onClose={() => setShowSnackbar(false)}>
                <Alert variant="filled" severity="error">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default GameSettings

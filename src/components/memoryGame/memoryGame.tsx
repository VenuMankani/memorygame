import React from 'react'
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import styles from './memoryGame.module.scss'

const MemoryGame = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className={styles.header}>
                <Typography variant='h4' fontWeight={'900'} marginBottom={'3rem'}>memory</Typography>
                <div>
                    <Button variant="contained" className={styles.commonButton} sx={{ marginRight: '1rem' }}><Typography variant='h6' fontWeight={'bold'}>Reset</Typography></Button>
                    <Button variant="contained" className={styles.commonButton}><Typography variant='h6' fontWeight={'bold'}>New Game</Typography></Button>
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.numIcons}>1</div>
                    <div className={styles.numIcons}></div>
                    <div className={styles.numIcons}></div>
                    <div className={styles.numIcons}></div>
                    <div className={styles.numIcons}></div>
                    <div className={styles.numIcons}></div>
                </div>

                <div className={styles.footer}>
                    <div className={styles.footerContainer}>
                        <Typography variant='h6' fontWeight={'bold'}>Time : 0:00</Typography>
                    </div>
                    <div className={styles.footerContainer}>
                        <Typography variant='h6' fontWeight={'bold'}>Turn : Player 1</Typography>
                    </div>
                    <div className={styles.footerContainer}>
                        <Typography variant='h6' fontWeight={'bold'}>Moves : 0</Typography>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MemoryGame
import React from 'react'
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import styles from './gameSettings.module.scss'

const GameSettings = () => {

    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <Typography variant='h4' fontWeight={'900'} color={'white'} marginBottom={'3rem'}>memory</Typography>
            <div className={styles.settings}>
                <div className={styles.selectTheme}>
                    <Typography variant='h6' fontWeight={'bold'} color={'#BCCED9'}>Select Theme</Typography>
                    <div className={styles.selections}>
                        <Button variant="contained" className={styles.commonButton}><Typography variant='h6' fontWeight={'bold'}>Numbers</Typography></Button>
                        <Button variant="contained" className={styles.commonButton}><Typography variant='h6' fontWeight={'bold'}>Icons</Typography></Button>
                    </div>
                </div>

                <div className={styles.selectTheme}>
                    <Typography variant='h6' fontWeight={'bold'} color={'#BCCED9'}>Number of Players</Typography>
                    <div className={styles.selections}>
                        <Button variant="contained" className={styles.commonButton}><Typography variant='h6' fontWeight={'bold'}>1</Typography></Button>
                        <Button variant="contained" className={styles.commonButton}><Typography variant='h6' fontWeight={'bold'}>2</Typography></Button>
                        <Button variant="contained" className={styles.commonButton}><Typography variant='h6' fontWeight={'bold'}>3</Typography></Button>
                        <Button variant="contained" className={styles.commonButton}><Typography variant='h6' fontWeight={'bold'}>4</Typography></Button>
                    </div>
                </div>

                <div className={styles.selectTheme}>
                    <Typography variant='h6' fontWeight={'bold'} color={'#BCCED9'}>Grid Size</Typography>
                    <div className={styles.selections}>
                        <Button variant="contained" className={styles.commonButton}><Typography variant='h6' fontWeight={'bold'}>4x4</Typography></Button>
                        <Button variant="contained" className={styles.commonButton}><Typography variant='h6' fontWeight={'bold'}>6x6</Typography></Button>
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
                        onClick={()=>navigate('/memory')}
                        >
                        <Typography variant='h5' fontWeight={'bold'}>Start Game</Typography>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default GameSettings

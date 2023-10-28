import React, { useState, createContext } from 'react'

interface IProps {
    children: React.ReactNode
}

interface GameDataType {
    theme: string;
    gridSize: any;
    handleTheme: (value: any) => void;
    handleGridSize: (value: any) => void;
}

export const GameContext = createContext<GameDataType>({} as GameDataType);

const GameProvider = ({ children }: IProps) => {

    const [theme, setTheme] = useState<string>('');
    const [gridSize, setGridSize] = useState<any>();

    const handleTheme = (value: string) => {
        setTheme(value);
    }

    const handleGridSize = (value: any) => {
        setGridSize(value)
    }


    const value = {
        theme,
        gridSize,
        handleTheme,
        handleGridSize
    }

    return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export default GameProvider

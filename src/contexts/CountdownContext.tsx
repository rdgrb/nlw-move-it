import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextValues {
    minutes: number;
    seconds: number;
    hasFinished: boolean; 
    isActive: boolean;
    start: () => void;
    reset: () => void;
}

interface ProviderProps {
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextValues);

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: ProviderProps) {
    const { startNewChallenge } = useContext(ChallengesContext);

    const [time, setTime] = useState(0.1 * 60 - 1);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);
    
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function start() {
        setIsActive(true);
    }

    function reset() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setHasFinished(false);
        setTime(0.1 * 60 - 1);
    }
    
    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        } else if (isActive && time == 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time])

    return (
        <CountdownContext.Provider value={
            { minutes, seconds, hasFinished, isActive, start, reset }} >
            { children }
        </CountdownContext.Provider>
    )
}
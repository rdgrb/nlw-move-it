import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextValues {
    minutes: number;
    seconds: number;
    hasFinished: boolean; 
    isActive: boolean;
    remainingTime: number;
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

    const fullTime = 61
    const [time, setTime] = useState(1 * 60);
    const [remainingTime, setRemainingTime] = useState(0);
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
        setRemainingTime(0);
        setTime(1 * 60);
    }
    
    function calculateRemainingTime() {
        const remaining = Math.floor(((fullTime - time) / fullTime) * 100)
        setRemainingTime(remaining);
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
                calculateRemainingTime();
            }, 1000);
        } else if (isActive && time == 0) {
            setHasFinished(true);
            setIsActive(false);
            setRemainingTime(0);
            startNewChallenge();
        }
    }, [isActive, time])

    return (
        <CountdownContext.Provider value={
            { minutes, seconds, hasFinished, remainingTime, isActive, start, reset }} >
            { children }
        </CountdownContext.Provider>
    )
}
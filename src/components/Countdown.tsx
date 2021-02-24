import { useState, useEffect } from "react";
import styles from "../styles/components/Countdown.module.css";

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
    const [time, setTime] = useState(0.1 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);
    
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const [minuteLeftLabel, minuteRightLabel] = String(minutes).padStart(2, "0").split("");
    const [secondLeftLabel, secondRightLabel] = String(seconds).padStart(2, "0").split("");

    function start() {
        setIsActive(true);
    }

    function reset() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(0.1 * 60);
    }
    
    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        } else if (isActive && time == 0) {
            setHasFinished(true);
            setIsActive(false);
        }
    }, [isActive, time])

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeftLabel}</span>
                    <span>{minuteRightLabel}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeftLabel}</span>
                    <span>{secondRightLabel}</span>
                </div>
            </div>
            
            {hasFinished ? (
                <button disabled className={styles.countdownButton}>
                    Ciclo terminado
                </button>
            ) : (
                <>
                    {isActive ? (
                        <button onClick={reset}
                            type="button" className={`${styles.countdownButton} ${styles.countdownButtonActive}`}>
                            Abandonar ciclo
                        </button>
                    ) : (
                        <button onClick={start} 
                            type="button" className={styles.countdownButton}>
                            Iniciar um ciclo
                        </button>
                    )}
                </>
            )}

        </div>
    )
}
import { useState, useContext } from "react";
import { CountdownContext } from "../contexts/CountdownContext";
import { Close } from "./icons/Close";

import styles from "../styles/components/Countdown.module.css";
import { ThemeContext } from "../contexts/ThemeContext";

export function Countdown() {
    const [hover, setHover] = useState(false);

    const { theme } = useContext(ThemeContext);

    const { 
        remainingTime,
        minutes, 
        seconds, 
        hasFinished, 
        isActive, 
        start, 
        reset,
    }  = useContext(CountdownContext);

    const [minuteLeftLabel, minuteRightLabel] = String(minutes).padStart(2, "0").split("");
    const [secondLeftLabel, secondRightLabel] = String(seconds).padStart(2, "0").split("");

    function getHoverIconColor(): string {
        if (theme.title === "light") {
            return hover ? "#FFFFFF" : "#000000"
        } else {
            return hover ? "#000000" : "#FFFFFF"
        }
    }

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
                    Ciclo encerrado
                    <img src="icons/green-check.svg" />
                </button>
            ) : (
                <>
                    {isActive ? (
                        <>
                            <button onClick={reset} onMouseEnter={() => setHover(true)} onMouseOut={() => setHover(false)}
                                type="button" className={`${styles.countdownButton} ${styles.countdownButtonActive}`}>
                                Abandonar ciclo
                                <Close color={getHoverIconColor()}/>
                            </button>
                            <div className={styles.buttonProgress}>
                                <div style={{ width: `${remainingTime}%` }} />
                            </div>
                        </>
                    ) : (
                        <button onClick={start} 
                            type="button" className={styles.countdownButton} >
                            Iniciar um ciclo
                            <img src="icons/play.svg" />
                        </button>
                    )}
                </>
            )}

        </div>
    )
}
import styles from "../styles/components/Countdown.module.css";

export function Countdown() {
    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>1</span>
                    <span>2</span>
                </div>
                <span>:</span>
                <div>
                    <span>3</span>
                    <span>4</span>
                </div>
            </div>
            
            <button type="button" className={styles.countdownButton}>
                Iniciar um ciclo
            </button>
        </div>
    )
}
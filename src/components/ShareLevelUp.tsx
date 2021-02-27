import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/ShareLevelUp.module.css";

export function ShareLevelUp() {
    const { level, currentExperience, challengesCompleted } = useContext(ChallengesContext);
    
    return (
        <div className={styles.shareContainer}>
            <div id={styles.shareContainerLeft}>
                <header>{ level }</header>

                <p>Avancei para o próximo level</p>
            </div>
            <div id={styles.shareContainerRight}>
                <div>
                    <h5>Desafios</h5>
                    <p>
                        <span>{ challengesCompleted } </span>
                        completados
                    </p>
                </div>
                <div>
                    <h5>Experiência</h5>
                    <p>
                        <span>{ currentExperience + Math.pow((level) * 4, 2) } </span> 
                        xp
                    </p>
                </div>

                <img src="/logo-full.svg" />
            </div>
        </div>
    )
}
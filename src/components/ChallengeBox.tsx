import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/ChallengeBox.module.css";

export function ChallengeBox() {
    const { activeChallenge, resetChallenge } = useContext(ChallengesContext);

    return (
        <div className={styles.boxContainer}>
            {activeChallenge ? (
                <div className={styles.challengeActive}>
                    <header>Ganhe { activeChallenge.amount } xp</header>

                    <main>
                        <img src={ `icons/${activeChallenge.type}.svg` } alt="Ilustração" />
                        <strong>Novo desafio</strong>
                        <p>{ activeChallenge.description }</p>
                    </main>

                    <footer>
                        <button onClick={resetChallenge}
                            type="button" className={styles.failedButton}>
                            Falhei
                        </button>
                        <button type="button" className={styles.succeededButton}>
                            Completei
                        </button>
                    </footer>
                </div>
            ) : (
                <div className={styles.challengeNotActive}>
                    <strong>Inicie um ciclo para receber desafios a serem completados</strong>

                    <p>
                        <img src="icons/level-up.svg" alt="Level up icon" />
                        Avance de level completando desafios.
                    </p>
                </div>
            )}
        </div>
    )
}
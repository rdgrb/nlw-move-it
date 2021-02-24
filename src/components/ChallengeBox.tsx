import styles from "../styles/components/ChallengeBox.module.css";

export function ChallengeBox() {
    const hasChallenge = true;

    return (
        <div className={styles.boxContainer}>
            {hasChallenge ? (
                <div className={styles.challengeActive}>
                    <header>Ganhe 400 xp</header>

                    <main>
                        <img src="icons/body.svg" alt="" />
                        <strong>Novo desafio</strong>
                        <p>Caminhe por 3 minutos e estique suas pernas
                            pra você ficar saudável.</p>
                    </main>

                    <footer>
                        <button type="button" className={styles.failedButton}>
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
import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import { ThemeContext } from "../contexts/ThemeContext";
import styles from "../styles/components/Profile.module.css";

import { Moon } from "../components/icons/Moon";

export function Profile() {
    const { theme, changeTheme } = useContext(ThemeContext);
    const { level } = useContext(ChallengesContext);
    
    return (
        <div className={styles.profileContainer}>
            <img src="icons/default-avatar.svg" alt="Foto de perfil" />
            <div>
                <strong>Convidado</strong>
                <p>
                    <img src="icons/level.svg" alt="Level icon" />
                    Level { level }
                </p>
            </div>
            <div className={styles.buttonContainer}>
                <button onClick={changeTheme}>
                    <Moon color={ theme.title === "light" ? "#000000" : "#BABABA"}/>
                </button>
            </div>
        </div>
    )
}
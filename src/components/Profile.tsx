import { useContext, useEffect, useState } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import { ThemeContext } from "../contexts/ThemeContext";
import styles from "../styles/components/Profile.module.css";

import { MoveItIcons } from "./icons/MoveItIcons";

export function Profile() {
    const { theme, changeTheme } = useContext(ThemeContext);
    const { level } = useContext(ChallengesContext);
    
    const [icon, setIcon] = useState({ name: "moon", color: "#BABABA" });
    useEffect(() => {
        setIcon(theme.title === "light" ? 
            { name: "moon", color: "#000"} :
            { name: "sun", color: "#BABABA" }
        )
    }, [theme]);

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
                    <MoveItIcons name={icon.name} color={icon.color} />
                </button>
            </div>
        </div>
    )
}
import { createContext, useState, useEffect, ReactNode } from "react";
import challenges from "../../challenges.json";

interface Challenge {
    type: "body" | "eye"; 
    description: string;
    amount: number;
}

interface ChallengesContextValues {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    experienceToNextLevel: number;
    activeChallenge: Challenge;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
}

interface ProviderProps {
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextValues);

export function ChallengesProvider({ children }: ProviderProps) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    
    const [activeChallenge, setActiveChallenge] = useState(null);
    const [challengesCompleted, setChallengesCompleted] = useState(0);
    
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);
    
    useEffect(() => {
        Notification.requestPermission();
    }, [])

    function levelUp() {
        setLevel(level + 1);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);
        
        new Audio("/notification.mp3").play();
        if(Notification.permission === "granted") {
            new Notification("moveit - Desafio recebido 🥳", {
                body: `Complete o desafio e ganhe ${challenge.amount}xp!`,
                silent: true,
                icon: "/favicon.png",
            })
        }
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }
    
    function completeChallenge() {
        if (!activeChallenge) {
            return; 
        }

        const { amount } = activeChallenge;
        
        let finalExperience = currentExperience + amount; 
        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp(); 
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }

    return (
        <ChallengesContext.Provider 
            value={{ 
                level, 
                levelUp, 
                currentExperience, 
                challengesCompleted,
                activeChallenge,
                startNewChallenge,
                resetChallenge,
                experienceToNextLevel,
                completeChallenge
            }}>
            {children}
        </ChallengesContext.Provider>
    )
}
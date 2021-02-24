import { createContext, useState, ReactNode } from "react";
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

    function levelUp() {
        setLevel(level + 1);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);
    }

    function resetChallenge() {
        setActiveChallenge(null);
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
                experienceToNextLevel
            }}>
            {children}
        </ChallengesContext.Provider>
    )
}
import { Moon } from "./Moon";
import { Sun } from "./Sun";
import { Close } from "./Close"
import { Home } from "./Home"
import { Medal } from "./Medal";

interface MoveItIconsProps {
    name: string;
    color: string;
}

export interface IconProps {
    color: string;
}

export function MoveItIcons(props: MoveItIconsProps) {
    const Icon = {
        moon: <Moon color={props.color} />,
        sun: <Sun color={props.color} />,
        close: <Close color={props.color} />,
        home: <Home color={props.color} />,
        medal: <Medal color={props.color} />
    }
    
    return Icon[props.name];
}
import { defaultSettings } from "./types/constants";
import { GameState, Settings } from "./types/types";

export const settings: Settings = defaultSettings;

export const gameState: GameState = {
    shells: [],
    ballIndex: null
};

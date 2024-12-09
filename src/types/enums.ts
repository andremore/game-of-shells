export enum SettingsStoreKeys {
    CHANCES = 'chances',
    SHELL_NUMBER = 'shellNumber',
    SHUFFLE_NUMBER = 'shuffleNumber',
    SPEED = 'speed',
    DISPLAY_BALL_TTL = 'displayBallTTl'
}

export enum GameStoreKeys {
    SHELLS = 'shells',
    BALL_INDEX = 'ballIndex',
    CHANCES_LEFT = 'chancesLeft',
    IS_GAME_ON_GOING = 'isGameOngoing' 
}

export enum Difficulty {
    EASY = 'easy',
    NORMAL = 'normal',
    HARD = 'hard',
    HARDCORE = 'hardcore',
    CUSTOM = 'custom'
}

export enum Speed {
    SLOW = 500,
    NORMAL = 1000,
    FAST = 150,
    HARDCORE = 50
}

export enum Mode {
    DEFAULT = 'default',
    ROGUELIKE = 'roguelike'
}

export enum Ids {
    BTN_START_GAME = 'btn-start-game',
    START_GAME_SANTA = 'start-game-santa',
    GAME = 'game-container',
    SHELL = 'shell-container',
    CHANCES = 'chances-container',
    DIFFICULTY = 'difficulty-container'
}

export enum ButtonType {
    SUBMIT = 'submit',
    BUTTON = 'button',
    RESET = 'reset'
}

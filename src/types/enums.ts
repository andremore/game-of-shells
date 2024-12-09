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
    CUSTOM = 'custom'
}

export enum Speed {
    SLOW = 1000,
    NORMAL = 500,
    FAST = 350,
}

export enum Ids {
    BTN_START_GAME = 'btn-start-game',
    START_GAME_SANTA = 'start-game-santa',
    POST_GAME_MSG = 'msg-post-game',
    POST_GAME_BTN = 'btn-post-game',
    POST_GAME_IMG = 'img-post-game',
    GAME = 'game-container',
    SHELL = 'shell-container',
    CHANCES = 'chances-container',
    DIFFICULTY = 'difficulty-container'
}

export enum Classes {
    POST_GAME = '.post-game',
}

export enum ButtonType {
    SUBMIT = 'submit',
    BUTTON = 'button',
    RESET = 'reset'
}

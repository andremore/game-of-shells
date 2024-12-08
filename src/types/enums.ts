export enum SettingsKeys {
    CHANCES = 'chances',
    SHELL_NUMBER = 'shellNumber',
    SHUFFLE_NUMBER = 'shuffleNumber',
    SPEED = 'speed',
    DISPLAY_BALL_TTL = 'displayBallTTl'
}

export enum Difficulty {
    EASY = 'easy',
    NORMAL = 'normal',
    HARD = 'hard',
    HARDCORE = 'hardcore'
}

export enum Speed {
    SLOW = 500,
    NORMAL = 250,
    FAST = 150,
    HARDCORE = 50
}

export enum Mode {
    DEFAULT = 'default',
    ROGUELIKE = 'roguelike'
}

export enum ContainerIds {
    START_GAME = 'start-game',
    GAME = 'game-container',
    SHELL = 'shell-container',
    CHANCES = 'chances-container',
    DIFFICULTY = 'difficulty-container'
}

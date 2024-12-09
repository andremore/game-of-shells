import { Difficulty, Speed } from "./enums"

export type SettingsStore = {
    shellNumber: number
    shuffleNumber: number
    speed: Speed
    chances: number
    displayBallTTl: number
    difficulty: Difficulty
}

export type Shell = {
    element: HTMLDivElement
    listener: (index: number, chancesSpan: HTMLSpanElement | null) => void
    handlerFn: () => void
}

export type GameStore = {
    shells: Shell[]
    ballIndex: number | null
    chancesLeft: number
    isGameOngoing: boolean
}

export type VirtualPositions = {
    [shellIndex: number]: number
}

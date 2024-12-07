import { Mode, Speed } from "./enums"

export type Settings = {
    shellNumber: number
    speed: Speed
    chances: number
    mode: Mode
}

export type Shell = {
    element: HTMLDivElement
    hasBall: boolean
}

export type GameState = {
    shells: Shell[]
    ballIndex: number | null
}

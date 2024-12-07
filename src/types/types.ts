import { Mode, Speed } from "./enums"

export type Settings = {
    shellNumber: number
    shuffleNumber: number
    speed: Speed
    chances: number
    mode: Mode
}

export type Shell = {
    element: HTMLDivElement
    listener: (index: number) => void
    handlerFn: () => void
}

export type GameState = {
    shells: Shell[]
    ballIndex: number | null
}

export interface Movie {
    id: number
    title: string
    studio_id: number
    genres_ids: number[]
    imdb: number
    duration: number
    local: boolean
    release: string
    user: number
}

export interface MovieFormData {
    title: string
    studio_id: number
    genres_ids: number[]
    imdb: number
    duration: number
    local: boolean
    release: string
    user: number
}
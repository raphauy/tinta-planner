import Client from "./Client"

export default interface User {
    id: string
    name?: string
    email: string
    sessions?: string
    image?: string | null
    role?: string | null
    client: Client
}


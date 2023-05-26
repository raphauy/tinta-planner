export default interface User {
    id: string
    name?: string
    email: string
    sessions?: string
    image?: string | null
    role?: string | null
    client: { id: number, name: string, image_insta: string }
}


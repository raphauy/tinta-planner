"use server"

import { createAgencyUser, deleteUser, getAgencyUsers, getAllUsers, getUser, getUserComplentaryClients, setClientsToUser, updateUser } from "@/services/userService";
import { User, Client } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { UserFormValues } from "./user-form";
import getCurrentUser from "@/app/(server-side)/services/getCurrentUser";

export type DataClient = {
    id: number
    name: string
}
export type DataUser = {
    id: string
    nombre: string | null
    email: string
    verificado: Date | null
    rol: string
    imagen: string | null
    agencyId: number | null
    clients: DataClient[] | null
    clientsCSV: string
}

function getData(user: User & {clients?: Client[]}): DataUser {
    const clients= user.clients || []
    
    const dataClients= clients.map(client => {
        return {
            id: client.id,
            name: client.name,
        }
    })
    const data: DataUser= {
        id: user.id,
        nombre: user.name,
        email: user.email,
        verificado: user.emailVerified,
        rol: user.role,
        imagen: user.image,
        agencyId: user.agencyId,
        clients: dataClients,
        clientsCSV: dataClients.map(client => client.name).join(', ')
    }
    return data    
}
      

export async function getUserData(userId: string): Promise<DataUser | null>{
    const user= await getUser(userId)
    if (!user) return null

    const data= getData(user)
    return data
}

export async function getAgencyUsersData(agencyId: number): Promise<DataUser[]> {
    const users= await getAgencyUsers(agencyId)

    const data: DataUser[]= []
    users.forEach(user => {
        data.push(getData(user))
    })    

    return data    
}

export async function getAllUsersData(): Promise<DataUser[]> {
    const users= await getAllUsers()

    const data: DataUser[]= []
    users.forEach(user => {
        data.push(getData(user))
    })    

    return data    
}


export async function createAgencyUserAction(agencyId: number, data: UserFormValues): Promise<DataUser | null> {
    const created= await createAgencyUser(agencyId, data)

    revalidatePath(`/config/users`)

    const res= getData(created)

    return res
}
  
export async function update(userId: string, data: UserFormValues): Promise<DataUser | null> {  
    const edited= await updateUser(userId, data)    

    revalidatePath(`/config/users`)

    const res= getData(edited)
    
    return res
}


export async function eliminate(userId: string): Promise<DataUser | null> {    
    const deleted= await deleteUser(userId)

    revalidatePath(`/config/users`)

    const res= getData(deleted)

    return res
}

export async function getCurrentUserData(): Promise<DataUser | null> {
    const currentUser= await getCurrentUser()
    if (!currentUser) return null

    const res= getData(currentUser)

    return res
}

export async function setClientsToUserAction(userId: string, clients: DataClient[]): Promise<boolean> {
    const ok= await setClientsToUser(userId, clients)

    revalidatePath(`/config/users`)

    return ok
}

export async function getUserComplentaryClientsData(userId: string): Promise<DataClient[]> {
    const clients= await getUserComplentaryClients(userId)
    const res= clients.map(client => {
        return {
            id: client.id,
            name: client.name
        }
    })

    return res
}
"use client"

import { Button } from "@/components/ui/button"
import { ChevronsLeft, ChevronsRight } from "lucide-react"
import { useEffect, useState } from "react"
import { DataClient, DataUser, getUserComplentaryClientsData, getUserData } from "./(crud)/actions"
import { toast } from "@/components/ui/use-toast"
import { LoadingSpinnerChico } from "@/components/LoadingSpinner"

interface Props{
    userId: string
    setClientsToUserAction: (userId: string, clients: DataClient[]) => Promise<boolean>
    closeDialog: () => void
}
export default function UserClientsBox({ userId, setClientsToUserAction, closeDialog }: Props) {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState<DataUser>()
    const [clients, setClients] = useState<DataClient[]>([])
    const [complementaryClients, setComplementaryClients] = useState<DataClient[]>([])

    useEffect(() => {
        getUserData(userId).then((data) => {
            if(!data) return null

            setUser(data)
        })
        getUserData(userId).then((data) => {
            if(!data) return null
            if(!data.clients) return null

            setClients(data.clients)
        })
        getUserComplentaryClientsData(userId).then((data) => {
            if(!data) return null           

            setComplementaryClients(data)
        })
    }, [userId])

    function clientIn(clientId: number) {
        // check the rol of the user, if the role is "client" then it can only have one client
        // if the user has another role then it can have multiple clients
        if(!user) {
            toast({ title: "No se encontró usuario", variant: "destructive" })
            return
        }

        const userRole= user.rol
        if(userRole === "client" && clients.length > 0) {
            toast({ title: "Los usuarios con rol 'client' solo pueden tener un cliente.", variant: "destructive" })
            return
        }


        const client= complementaryClients.find((client) => client.id === clientId)
        if(!client) return
        const newComplementaryClients= complementaryClients.filter((client) => client.id !== clientId)
        setComplementaryClients(newComplementaryClients)
        setClients([...clients, client])                
    }

    function clientOut(clientId: number) {
        const client= clients.find((client) => client.id === clientId)
        if(!client) return
        const newClients= clients.filter((client) => client.id !== clientId)
        setClients(newClients)
        setComplementaryClients([...complementaryClients, client])                
    }

    async function handleSave() {
        setLoading(true)
        const success= await setClientsToUserAction(userId, clients)
        if(success) {
            toast({ title: "Clientes actualizados" })
            closeDialog()
        } else {
            toast({ title: "Error al actualizar clientes", variant: "destructive" })
        }        
        setLoading(false)
        closeDialog()
    }       

    function allClientsIn() {
        if(!user) {
            toast({ title: "No se encontró usuario", variant: "destructive" })
            return
        }

        const userRole= user.rol
        if(userRole === "client") {
            toast({ title: "Los usuarios con rol 'client' solo pueden tener un cliente.", variant: "destructive" })
            return
        }

        setClients([...clients, ...complementaryClients])
        setComplementaryClients([])
    }

    function allClientsOut() {
        setComplementaryClients([...complementaryClients, ...clients])
        setClients([])
    }
     

    return (
        <div>
            <div className="grid grid-cols-2 gap-4 p-3 border rounded-md min-w-[400px] min-h-[300px]">
                <div className="flex flex-col border-r">
                    <p className="mb-3 font-bold">Clientes:</p>
                {
                    clients.map((client) => {

                    return (
                        <div key={client.id} className="flex items-center justify-between gap-2 mb-1 mr-5">
                            <p className="whitespace-nowrap">{client.name}</p>
                            <Button variant="secondary" className="h-7 x-7" onClick={() => clientOut(client.id)}>
                                <ChevronsRight />
                            </Button>
                        </div>
                    )})
                }
                        <div className="flex items-end justify-between flex-1 gap-2 mb-1 mr-5">
                            <p className="whitespace-nowrap">Todos</p>
                            <Button variant="secondary" className="h-7 x-7 bg-slate-400" 
                                onClick={() => allClientsOut()}
                                disabled={user?.rol === "client"}
                            >
                                    <ChevronsRight />
                            </Button>
                        </div>
                </div>
                <div className="flex flex-col">
                    <p className="mb-3 font-bold">&nbsp;</p>
                {
                    complementaryClients.map((client) => {

                    return (
                        <div key={client.id} className="flex items-center gap-2 mb-1">
                            <Button variant="secondary" className="h-7 x-7" onClick={() => clientIn(client.id)}>
                                <ChevronsLeft />
                            </Button>
                            <p className="whitespace-nowrap">{client.name}</p>
                        </div>
                    )})
                }
                        <div className="flex items-end flex-1 gap-2 mb-1">
                            <Button variant="secondary" className="h-7 x-7 bg-slate-400" 
                                onClick={() => allClientsIn()}
                                disabled={user?.rol === "client"}
                            >
                                    <ChevronsLeft />
                            </Button>
                            <p className="whitespace-nowrap">Todos</p>
                        </div>
                </div>
            </div>

            <div className="flex justify-end mt-4">
                <Button type="button" variant={"secondary"} className="w-32" onClick={() => closeDialog()}>Cancelar</Button>
                <Button onClick={handleSave} className="w-32 ml-2" >{loading ? <LoadingSpinnerChico /> : <p>Guardar</p>}</Button>
            </div>
        </div>
    )
}

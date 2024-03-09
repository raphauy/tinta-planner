// location: {
//     latitude: -34.90589179394829,
//     longitude: -56.13775273688759,
//     name: 'Castel Forte',
//     address: '26 De Marzo 3468',
//     foursquareUrl: 'https://foursquare.com/v/50a2987ee4b03e0e24d113a3'
//   }

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

type Props = {
    location: {
        latitude: number
        longitude: number
        name: string
        address: string
        foursquareUrl: string
    }
}

export default function LocationBox({ location }: Props) {
  return (
    <div>
        <p className="text-xl font-bold">Ubicación:</p>
        { location.name && <p>Nombre: {location.name}</p> }
        { location.address && <p>Dirección: {location.address}</p> }
        <p>Latitud: {location.latitude}</p>
        <p>Longitud: {location.longitude}</p>
        <div className="flex flex-col gap-2 mt-3">
            {
                location.foursquareUrl &&
                <Link href={location.foursquareUrl} target="_blank" rel="noreferrer">
                    <Button variant="link" className="w-full">{location.foursquareUrl}</Button>
                </Link>
            }
            <Link href={`https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`} target="_blank" rel="noreferrer">
                <Button className="w-full">Ver en Google Maps</Button>
            </Link>            
        </div>
    </div>
  )
}

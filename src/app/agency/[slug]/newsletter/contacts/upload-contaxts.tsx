"use client"

import { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Loader, Upload } from "lucide-react";
import Papa from 'papaparse';
import { ContactImportData, importContactsAction } from './contact-actions';
import { toast } from '@/components/ui/use-toast';
import Link from 'next/link';

type Props = {
    clientId: number
}
export default function UploadContacts({ clientId }: Props) {

    const [loading, setLoading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUploadClick = () => {
        fileInputRef.current!.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setLoading(true)
            const file = files[0];
            Papa.parse(file, {
                complete: (result) => {
                    const contacts: ContactImportData[] = result.data.map((row: any, index) => {

                        let name = row[1];
                        if (row[2] && row[2].trim() !== "") {
                            name += " " + row[2];
                        }
                                                
                        return {
                            email: row[0],
                            name,
                        };
                    })
                    importContactsAction(clientId, contacts)
                    .then((message) => {
                        toast({ title: message })
                    })
                    .catch((error) => {
                        toast({ 
                            title: "Error al importar", 
                            description: "La primera columna del archivo CSV debe ser el email y la segunda el nombre del contacto.",
                            variant: "destructive" 
                        })
                    })
                    .finally(() => {
                        setLoading(false)
                        event.target.value = '';
                    })
                },
                header: false,
            });
        }
    };

    return (
        <>
            <input
                type="file"
                accept=".csv"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
            {
                loading ? <Loader className="w-4 h-4 animate-spin" /> :
                <Button variant="outline" className="flex items-center w-40 gap-2" onClick={handleUploadClick}>
                    <Upload size={22} />
                    <p>Import CSV</p>
                </Button>
            }
            <Link href={`/example.csv`}>
                <Button variant="link">Example CSV</Button>
            </Link>
        </>
    );
}

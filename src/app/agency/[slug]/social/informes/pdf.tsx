"use client"

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button } from "@/components/ui/button"
import { FileDown } from "lucide-react"
import { useState } from 'react';

interface Props {
    pdfName: string
}

export default function PdfPage({ pdfName }: Props) {

    const [loader, setLoader] = useState(false)

    const downloadPDF = () =>{
            // capture the element that you want to turn into a canvas which in this case is the div with id `pdf-target`
            const capture = document.getElementById('pdf-target')
            if (capture === null) return console.log("No se pudo descargar el PDF")

            setLoader(true);
            html2canvas(capture).then((canvas)=>{
                const imgData = canvas.toDataURL('img/png');
                const doc = new jsPDF('p', 'mm', 'a4');
                const componentWidth = doc.internal.pageSize.getWidth();
                const componentHeight = doc.internal.pageSize.getHeight();
                doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
                setLoader(false);
                doc.save(`Tinta Planner - ${pdfName}.pdf`)
            })
    }


    return (
        <div>
            <Button className="w-32 h-8" onClick={downloadPDF} disabled={!(loader===false)}>
                <FileDown className="mr-2" />
                {loader?(
                    <span>Downloading</span>
                ):(
                    <p>Descargar</p>
                )}                    
            </Button>            
        </div>

    )
}

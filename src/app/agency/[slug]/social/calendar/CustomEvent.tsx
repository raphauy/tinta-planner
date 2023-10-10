import Link from "next/link";

import { AdvancedImage } from '@cloudinary/react';
import { CloudinaryImage } from '@cloudinary/url-gen';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import { cn } from "@/lib/utils";
import { backgroundClip } from "html2canvas/dist/types/css/property-descriptors/background-clip";

export interface Event {
  fechaImportante: string;
  title: string;
  content: string;
  start: Date;
  end: Date;
  image: string;
  color: string;
  href: string;
}

interface CustomEventProps {
  event: Event
}

const CustomEvent: React.FC<CustomEventProps> = ({ event }) => {

  const cldImage = new CloudinaryImage(event.image.split("/").slice(-2).join("/"), {cloudName: 'dtm41dmrz'}).resize(thumbnail().width(50))

  const tail= event.content.length > 39 ? "..." : ""

  return (
    <>
      {
        event.fechaImportante &&
        (<div className="h-5 px-1 mb-1 text-sm font-bold text-gray-600 bg-gray-100 border border-gray-400 rounded-md ">{event.fechaImportante}</div>)
      }
      {
        event.title && (
          <div className="px-1 border rounded-md" style={{ backgroundColor: `${event.color}`}}>
          <Link href={event.href} >
            <p className="flex items-center text-sm font-bold text-gray-700">{event.title}</p>
            <div className="flex">
              <div>
                <AdvancedImage cldImg={cldImage} />          
              </div>
              
              <div className="flex flex-col w-20 ml-1 text-gray-700">
                <p className="text-xs whitespace-pre-wrap">{event.content.substring(0, 39)+tail}</p>
              </div>
            </div>
          </Link>  
        </div>  
        )
      }
    </>
  );
};

export default CustomEvent;

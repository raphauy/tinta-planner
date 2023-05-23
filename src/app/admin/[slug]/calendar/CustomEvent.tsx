import Link from "next/link";

import { AdvancedImage } from '@cloudinary/react';
import { CloudinaryImage } from '@cloudinary/url-gen';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';

export interface Event {
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

  const tail= event.content.length > 30 ? "..." : ""

  return (
    <Link href={event.href} >
      <p className="font-bold text-gray-700">{event.title}</p>
      <div className="flex">
        <div>
          <AdvancedImage cldImg={cldImage} />          
        </div>
        
        <div className="flex flex-col w-20 ml-1 text-gray-700">
          <p className="text-sm whitespace-pre-wrap">{event.content.substring(0, 30)+tail}</p>
        </div>
      </div>
    </Link>
  );
};

export default CustomEvent;

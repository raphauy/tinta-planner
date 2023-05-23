"use client"

import { AdvancedImage } from '@cloudinary/react';
import { CloudinaryImage } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';

export default function PilaresPage() {
  const myImage = new CloudinaryImage("https://res.cloudinary.com/dtm41dmrz/image/upload/v1684609584/tinta-posts/lyy7zl7r94hmceouli3p.jpg".split("/").slice(-2).join("/"), {cloudName: 'dtm41dmrz'}).resize(fill().width(400).height(400));
  return (
    <div>
      
      <p>PilaresPage</p>
      <AdvancedImage cldImg={myImage} />
    </div>
  )
}

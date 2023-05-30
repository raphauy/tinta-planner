"use client"

import { useEffect, useState } from "react";
import { BsChevronLeft, BsChevronRight, BsTrash } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion"
import useMeasure from "react-use-measure";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { CloudinaryImage } from "@cloudinary/url-gen";

interface Props{
    images: string[]
    onDelete?: (image: string) => void
}

export default function PostCarouselForm({images, onDelete}: Props) {
  const [count, setCount] = useState(0)
  const previous = usePrevious(count);
  const [ref, { width }] = useMeasure();
  const direction = previous === null || count > previous ? 1 : -1;  


  useEffect(() => {
    if (images.length>0)
        setCount(images.length-1);

  }, [images]); 

  const hasMore= images.length > 1

  
  const imageName= images.length === 0 ? "tinta-posts/thxal175stlimthovo7t.png" : images[Math.abs(count) % images.length]
  const image= new CloudinaryImage(imageName.split("/").slice(-2).join("/"), {cloudName: 'dtm41dmrz'}).resize(fill().width(width))

  const duration= images.length === 1 ? { duration: 0 } : { duration: 0.5 }
    
  return (

    <div className="flex justify-center w-full h-full">
        <div ref={ref} className="relative flex items-center justify-center w-full h-full overflow-hidden ">
          <AnimatePresence custom={{ direction, width }}>
              <motion.div className="absolute flex items-center justify-center w-full h-full"
                  key={count}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  transition={ duration }
                  exit="exit"
                  custom={{ direction, width }}
              >                        
                  {hasMore && <button onClick={() => setCount(count -1)}><BsChevronLeft fontSize={25} className="absolute left-0 z-20" /></button>}
                  {hasMore && <button onClick={() => setCount(count +1)}><BsChevronRight fontSize={25} className="absolute right-0 z-20" /></button>}
                  <AdvancedImage cldImg={image}/> 
                  {onDelete && <BsTrash onClick={() => onDelete(imageName)} className="absolute z-20 text-white bottom-1 right-1 hover:cursor-pointer" size={30}/>}
              </motion.div>
          </AnimatePresence>
        </div>            
    </div>
  )
}


  const variants: {
    enter: ({ direction, width }: { direction: number; width: number }) => any;
    center: { x: number };
    exit: ({ direction, width }: { direction: number; width: number }) => any;
  } = {
    enter: ({ direction, width }) => ({
      x: direction * width,
    }),
    center: { x: 0 },
    exit: ({ direction, width }) => ({
      x: direction * -width,
    }),
  };
  
  
  
  function usePrevious(state: number): number | null {
    let [tuple, setTuple] = useState<[number | null, number ]>([null, state]);
  
    if (tuple[1] !== state) {
      setTuple([tuple[1], state]);
    }
  
    return tuple[0];
  }
  
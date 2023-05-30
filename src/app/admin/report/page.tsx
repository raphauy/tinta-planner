"use client"

import CommingSoon from '@/components/CommingSoon';
import PostCarouselForm from '../[slug]/posts/PostCarouselForm'
import { useState } from 'react';

export default function ReportPage() {
  const fakeImages: string[]= []
  const [images, setImages] = useState(fakeImages);

  return (
    <CommingSoon />
  )
}

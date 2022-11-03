import Image from 'next/image'
import { VideoCameraIcon } from '@heroicons/react/24/solid'
import s from './ShareModal.module.css'
import TestimonialTypeSelector from './TestimonialTypeSelector'

export const ShareModal = () => {
  return (
    <div className={s.root}>
      <h1 className="text-2xl text-primary font-bold mb-4">HouseWork</h1>
      <h2 className="text-accent-4 text-xl text-center">If you are satisfied with our service please leave a testimonial, it means a lot for us!</h2>

      <TestimonialTypeSelector />
    </div>
  )
}

import s from './ShareModal.module.css'
import dynamic from 'next/dynamic'

const TestimonialTypeSelector = dynamic(() => import("./TestimonialTypeSelector"), { ssr: false })
const KYCForm = dynamic(() => import('./KYCForm/KYCForm.component').then(mod => mod.KYCForm), { ssr: false })

export const ShareModal = () => {

  return (
    <div className={s.root}>
      <h1 className="text-2xl text-primary font-bold mb-4">HouseWork</h1>
      <h2 className="text-accent-6 text-center">If you are satisfied with our service please leave a testimonial, it means a lot for us!</h2>
      <KYCForm />
    </div>
  )
}

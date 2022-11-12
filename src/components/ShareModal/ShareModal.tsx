import s from './ShareModal.module.css'
import dynamic from 'next/dynamic'

const KYCForm = dynamic(() => import('./KYCForm/KYCForm.component').then(mod => mod.KYCForm), { ssr: false })

export const ShareModal = () => {
  return (
    <div className={s.root}>
      <KYCForm />
    </div>
  )
}

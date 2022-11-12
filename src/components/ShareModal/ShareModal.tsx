import s from './ShareModal.module.css'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
const KYCForm = dynamic(() => import('./KYCForm/KYCForm.component'), { ssr: false })


export const ShareModal = () => {
  return (
    <div className={s.root}>
      <KYCForm />
    </div>
  )
}

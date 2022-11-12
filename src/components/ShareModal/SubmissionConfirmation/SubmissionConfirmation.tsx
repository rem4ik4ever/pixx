import { useEffect } from "react"
import { Profile } from "../KYCForm/types"
import s from './styles.module.css'
import clx from 'classnames'

interface Props {
  profile: Profile
}

export const SubmissionConfirmation = ({ profile }: Props) => {
  return (
    <div className="text-center flex flex-col items-center">
      <div className={clx(s.heart, s.heartActive)} />
      <h1 className="text-2xl">
        Thank you {profile.name}!
      </h1>
      <p className="my-4 text-xl">
        We are very happy that you enjoyed our service!
      </p>
    </div>
  )
}

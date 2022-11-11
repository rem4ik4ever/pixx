import Input from "@components/ui/Input";
import { useCallback, useEffect, useState } from "react"
import { SocialLogin } from "../SocialLogin";
import { Profile } from "./types";
import s from './KYCForm.module.css'
import { ProfileView } from "./Profile";

export const ManualForm = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Input type="text" name="firstName" placeholder="First name" />
        <Input type="text" name="lastName" placeholder="Last name" />
      </div>
      <Input type="email" name="email" placeholder="Email" />
    </div>
  )
}

interface OccupationFormProps {
  profile: Profile;
  onChange: (profile: Profile) => void
}
export const OccupationForm = ({ profile, onChange }: OccupationFormProps) => {
  const handleChange = useCallback((field: string) => (value: string) => {
    onChange({
      ...profile,
      [field]: value
    })
  }, [profile, onChange])
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Input type="text" name="jobTitle" placeholder="Job title (optional)" value={profile.jobTitle} onChange={handleChange('jobTitle')} />
        <Input type="text" name="occupation" placeholder="Company (optional)" value={profile.company} onChange={handleChange('company')} />
      </div>
    </div>
  )
}

export const KYCForm = () => {
  const [step, setStep] = useState(0)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [provider, setProvider] = useState<string>('form')
  const [mounted, setMounted] = useState<boolean>(false)

  const handleLogin = (socialProfile: Profile, provider: string) => {
    setProfile(socialProfile)
    setProvider(provider)
  }

  const handleLogout = () => {
    setProfile(null)
    setProvider('form')
  }

  return (
    <div className="flex flex-col gap-4 items-center py-4">
      <span className="text-primary text-xl">
        About you
      </span>
      {!profile && (
        <>
          <SocialLogin onLogin={handleLogin} />
          <div className={s.separator}>
            <span className="px-2 text-accent-3">or</span>
          </div>
          <ManualForm />
        </>
      )}
      {profile && (
        <ProfileView profile={profile} onLogout={handleLogout} />
      )}
      {profile && <>
        <span className="text-accent-3">What do you do?</span>
        <OccupationForm profile={profile} onChange={setProfile} />
      </>}
    </div>
  )
}

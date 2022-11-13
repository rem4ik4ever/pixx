import Input from "@components/ui/Input";
import { useCallback, useEffect, useRef, useState } from "react"
import { SocialLogin } from "../SocialLogin";
import { Profile } from "./types";
import s from './KYCForm.module.css'
import { ProfileView } from "./Profile";
import { Formik, useFormik } from 'formik'
import Button from "@components/ui/Button";
import * as Yup from 'yup'

interface ManualFormProps {
  profile: Profile
  handleChange: (field: string, value: string) => void
  handleBlur: (e: any) => void
  errors: Record<any, any>;
  touched: Record<any, any>;
}
export const ManualForm = ({ profile, handleChange, handleBlur, errors, touched }: ManualFormProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 w-full">
      <Input type="text" name="name" placeholder="Name" onChange={v => handleChange('name', v)} onBlur={handleBlur} value={profile.name} error={errors.name} touched={touched.name} />
      <Input type="email" name="email" placeholder="Email" onChange={v => handleChange('email', v)} onBlur={handleBlur} value={profile.email} error={errors.email} touched={touched.email} />
    </div>
  )
}

interface OccupationFormProps {
  profile: Profile;
  handleChange: (field: string, value: string) => void
}
export const OccupationForm = ({ profile, handleChange }: OccupationFormProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 w-full">
      <Input type="text" name="jobTitle" placeholder="Job title (optional)" value={profile.jobTitle} onChange={v => handleChange('jobTitle', v)} />
      <Input type="text" name="occupation" placeholder="Company (optional)" value={profile.company} onChange={v => handleChange('company', v)} />
    </div>
  )
}


const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email('Must be a valid email').when('provider', {
    is: 'twitter',
    then: schema => schema.notRequired(),
    otherwise: schema => schema.required('Required')
  }),
  provider: Yup.string().required()
})
interface Props {
  initialValues: Profile,
  onSubmit: (data: Profile) => void
}
export const ProfileForm = ({ initialValues, onSubmit }: Props) => {
  const { values: profile, handleSubmit, handleBlur, setFieldValue, setValues, isValid, errors, touched } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    validateOnMount: true
  });

  const handleLogin = (socialProfile: Profile) => {
    setValues(socialProfile)
  }

  const handleLogout = () => {
    setValues({ provider: 'form' })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 items-center py-4">
        <span className="text-primary text-xl">
          About you
        </span>
        {profile.provider === 'form' && (
          <>
            <SocialLogin onLogin={handleLogin} />
            <div className={s.separator}>
              <span className="px-2 text-accent-3">or</span>
            </div>
            <ManualForm profile={profile} errors={errors} touched={touched} handleChange={setFieldValue} handleBlur={handleBlur} />
          </>
        )}
        {profile.provider !== 'form' && (
          <ProfileView profile={profile} onLogout={handleLogout} />
        )}
        <>
          <span className="text-accent-3">What do you do?</span>
          <OccupationForm profile={profile} handleChange={setFieldValue} />
        </>
      </div>
      <Button type="submit" disabled={!isValid} className="w-full mt-8" variant="slim">Next</Button>
    </form>
  )
}

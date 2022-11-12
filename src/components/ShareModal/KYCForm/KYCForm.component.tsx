import Input from "@components/ui/Input";
import { useCallback, useEffect, useRef, useState } from "react"
import { Profile } from "./types";
import { useFormik } from 'formik'
import { ProfileForm } from "./ProfileInfo.component";
import autoAnimate from "@formkit/auto-animate";
import TestimonialTypeSelector from "../TestimonialTypeSelector";
import { useReactMediaRecorder } from "react-media-recorder";
import { Testimonial } from "@prisma/client";
import { SubmissionConfirmation } from "../SubmissionConfirmation/SubmissionConfirmation";
import { trpc } from "src/utils/trpc";

interface ManualFormProps {
  profile: Profile
  onChange: (profile: Profile) => void
}
export const ManualForm = ({ profile, onChange }: ManualFormProps) => {
  const handleChange = useCallback((field: string) => (value: string) => {
    onChange({
      ...profile,
      [field]: value
    })
  }, [profile, onChange])
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Input type="text" name="firstName" placeholder="First name" onChange={handleChange('firstName')} />
        <Input type="text" name="lastName" placeholder="Last name" onChange={handleChange('lastName')} />
      </div>
      <Input type="email" name="email" placeholder="Email" onChange={handleChange('email')} />
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
  const parent = useRef(null)
  const { isLoading, isSuccess, isError, error, mutateAsync, } = trpc.useMutation('public.createTestimonial')
  const mediaRecorder = useReactMediaRecorder({
    video: true, audio: true, blobPropertyBag: {
      type: 'video/webm'
    }
  });
  const [step, setStep] = useState(0)
  const { values, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      profile: { provider: 'form', name: '', email: '' },
      testimonial: {
        type: 'text',
        rating: 0,
        content: '',
        videoUrl: ''
      }
    },
    onSubmit: async (values) => {
      const result = await mutateAsync(values)
      console.log({ result })
    }
  });

  const handleProfileSubmit = useCallback((profile: Profile) => {
    setFieldValue('profile', profile)
    setStep(step + 1)
  }, [])

  const handleTestimonialSubmit = useCallback((testimonial: Omit<Testimonial, "id">) => {
    setFieldValue('testimonial', testimonial)
    handleSubmit()
    setStep(2)
  }, [])

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [])

  return (
    <>
      {step !== 2 && <>
        <h1 className="text-2xl text-primary font-bold mb-4">HouseWork</h1>
        <h2 className="text-accent-6 text-center">If you are satisfied with our service please leave a testimonial, it means a lot for us!</h2>
      </>}
      <div ref={parent} className="w-full flex-col justify-center">
        {step == 0 && <ProfileForm
          initialValues={values.profile}
          onSubmit={handleProfileSubmit} />
        }
        {step === 1 && <TestimonialTypeSelector
          mediaRecorder={mediaRecorder}
          onSubmit={handleTestimonialSubmit}
          onBack={() => setStep(step - 1)}
        />}
        {step === 2 && <SubmissionConfirmation profile={values.profile} />}
      </div>
    </>
  )
}

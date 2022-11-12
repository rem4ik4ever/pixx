import { useEffect, useMemo, useRef, useState } from 'react'
import { Tab } from '@headlessui/react'
import { ChatBubbleBottomCenterIcon, VideoCameraIcon, ShareIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import { ChatBubbleBottomCenterIcon as ChatBubbleSolid, VideoCameraIcon as VideoCameraSolid, ShareIcon as ShareSolid } from '@heroicons/react/24/solid'
import { TextTestimonial } from './TextTestimonial'
import autoAnimate from '@formkit/auto-animate'
import { SocialTestimonial } from './SocialTestimonial'
import { ReactMediaRecorderRenderProps, useReactMediaRecorder } from 'react-media-recorder'
import VideoTestimonial from './VideoTestimonial'
import { Rating } from './Rating'
import Button from '@components/ui/Button'
import { useFormik } from 'formik'
import { Testimonial, TestimonialType } from '@prisma/client'
import * as yup from 'yup'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const validationSchema = yup.object({
  type: yup.string().required(),
  content: yup.string().when('type', {
    is: TestimonialType.TEXT,
    then: schema => schema.max(250).required('Missing testimonial text')
  }),
  rating: yup.number().min(1).max(5).when({
    is: TestimonialType.SOCIAL,
    then: schema => schema.notRequired(),
    otherwise: schema => schema.required('Please add your rating')
  }),
  videoUrl: yup.string().when({
    is: TestimonialType.VIDEO,
    then: schema => schema.required('Please record video first'),
    otherwise: schema => schema.notRequired()
  })
})

interface Props {
  onBack: () => void
  onSubmit: (data: any) => void
  mediaRecorder: ReactMediaRecorderRenderProps,
}
export default function TestimonialTypeSelector({ onBack, onSubmit, mediaRecorder }: Props) {
  const parent = useRef(null)

  const { status, startRecording, stopRecording, mediaBlobUrl, previewStream, clearBlobUrl } = mediaRecorder;
  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])

  let categories = useMemo(() => ([
    {
      type: 'Text',
      Icon: ChatBubbleBottomCenterIcon,
      IconSolid: ChatBubbleSolid,
    },
    {
      type: 'Video',
      Icon: VideoCameraIcon,
      IconSolid: VideoCameraSolid,
    },
    {
      type: 'Social',
      Icon: ShareIcon,
      IconSolid: ShareSolid,
    }
  ]), [])

  const { values, setFieldValue, handleSubmit, isValid, errors, touched } = useFormik<Partial<Testimonial>>({
    initialValues: {
      type: TestimonialType.TEXT,
      content: '',
      rating: 0
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values)
    },
    validateOnMount: true
  })

  return (
    <form className="w-full flex flex-col items-center" onSubmit={handleSubmit}>
      <Rating rating={values.rating || 0} onChange={(r) => setFieldValue('rating', r)} />
      <div className="w-full max-w-md px-2 pt-8 pb-4 sm:px-0">
        <Tab.Group onChange={(index) => {
          if (index === 0) setFieldValue('type', TestimonialType.TEXT)
          if (index === 1) setFieldValue('type', TestimonialType.VIDEO)
          if (index === 2) setFieldValue('type', TestimonialType.SOCIAL)
          if (index !== 1) {
            stopRecording()
            clearBlobUrl()
          }
        }}>
          <Tab.List className="flex space-x-1 rounded-xl p-1 border" ref={parent}>
            {categories.map(({ type, Icon, IconSolid }) => (
              <Tab
                key={type}
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-accent-4',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-blue-light shadow text-white'
                      : 'hover:text-blue'
                  )
                }
              >
                {({ selected }) => (
                  <div className='flex flex-row items-center gap-2 justify-center'>
                    {selected ? <IconSolid className="w-6 h-6" /> : <Icon className="w-6 h-6" />} {type}
                  </div>
                )}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            <Tab.Panel
              key="Text"
              className={classNames(
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
              )}
            >
              {touched.content && errors.content && (<span>{errors.content}</span>)}
              <TextTestimonial
                onChange={(c => setFieldValue('content', c))}
                value={values.content || ''}
              />
            </Tab.Panel>

            <Tab.Panel
              key="Video"
              className={classNames(
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
              )}
            >
              <VideoTestimonial {...{ status, startRecording, stopRecording, mediaBlobUrl, previewStream, clearBlobUrl }} />
            </Tab.Panel>

            <Tab.Panel
              key="Social"
              className={classNames(
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
              )}
            >
              <SocialTestimonial />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
        <div className="flex justify-between mt-2">
          <Button variant="naked" type="button" onClick={onBack}><ArrowLeftIcon className='w-4 h-4 mr-2' /> back</Button>
          <Button variant="slim" type="submit" disabled={!isValid}>Submit</Button>
        </div>
      </div>
    </form>
  )
}

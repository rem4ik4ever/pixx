import { useEffect, useMemo, useRef, useState } from 'react'
import { Tab } from '@headlessui/react'
import { ChatBubbleBottomCenterIcon, VideoCameraIcon, ShareIcon } from '@heroicons/react/24/outline'
import { ChatBubbleBottomCenterIcon as ChatBubbleSolid, VideoCameraIcon as VideoCameraSolid, ShareIcon as ShareSolid } from '@heroicons/react/24/solid'
import { TextTestimonial } from './TextTestimonial'
import autoAnimate from '@formkit/auto-animate'
import { SocialTestimonial } from './SocialTestimonial'
import { useReactMediaRecorder } from 'react-media-recorder'
import VideoTestimonial from './VideoTestimonial'
//import { VideoTestimonial } from './VideoTestimonial'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function TestimonialTypeSelector() {
  const parent = useRef(null)

  const { status, startRecording, stopRecording, mediaBlobUrl, previewStream, clearBlobUrl } =
    useReactMediaRecorder({
      video: true, audio: true, blobPropertyBag: {
        type: 'video/webm'
      }
    });
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

  return (
    <div className="w-full max-w-md px-2 pt-8 pb-4 sm:px-0">
      <Tab.Group>
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
            <TextTestimonial />
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
    </div>
  )
}

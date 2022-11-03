import { useEffect, useRef, useState } from 'react'
import { Tab } from '@headlessui/react'
import { ChatBubbleBottomCenterIcon, VideoCameraIcon, ShareIcon } from '@heroicons/react/24/outline'
import { ChatBubbleBottomCenterIcon as ChatBubbleSolid, VideoCameraIcon as VideoCameraSolid, ShareIcon as ShareSolid } from '@heroicons/react/24/solid'
import { TextTestimonial } from './TextTestimonial'
import Button from '@components/ui/Button'
import autoAnimate from '@formkit/auto-animate'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function TestimonialTypeSelector() {
  const parent = useRef(null)
  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])
  let [categories] = useState([
    {
      type: 'Text',
      Icon: ChatBubbleBottomCenterIcon,
      IconSolid: ChatBubbleSolid,
      Content: TextTestimonial,
    },
    {
      type: 'Video',
      Icon: VideoCameraIcon,
      IconSolid: VideoCameraSolid,
      Content: TextTestimonial,
    },
    {
      type: 'Social',
      Icon: ShareIcon,
      IconSolid: ShareSolid,
      Content: TextTestimonial,
    }
  ])

  return (
    <div className="w-full max-w-md px-2 py-8 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl p-1 border" ref={parent}>
          {categories.map(({ type, Icon, IconSolid }) => (
            <Tab
              key={type}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-accent-4',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-blue-400 shadow text-white'
                    : 'hover:text-blue-500'
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
          {categories.map(({ Content, type }, idx) => (
            <>
              <Tab.Panel
                key={type}
                className={classNames(
                  'bg-white',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                )}
              >
                <Content />
              </Tab.Panel>
            </>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

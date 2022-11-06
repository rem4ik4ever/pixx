import { useMemo } from 'react'
import s from './Card.module.css'


interface Props {
  testimonial: {
    name: {
      first: string;
      last: string;
    };
    email: string;
    picture: {
      large: string;
      medium: string;
      thumbnail: string;
    },
    location: {
      country: string;
      state: string;
      city: string;
    },
    review: string
  }
}
export const Card = ({ testimonial }: Props) => {
  return (
    <div className={s.root}>
      <div className='flex items-center gap-4'>
        <img src={testimonial.picture.thumbnail} className={s.avatar} />
        <div>
          <div>{testimonial.name.first} {testimonial.name.last}</div>
          <span className="text-sm text-accent-6">{testimonial.location.country}, {testimonial.location.city}</span>
        </div>
      </div>
      <div className={s.content}>
        {testimonial.review}
      </div>
    </div>
  )
}

import StarIconOutline from '@heroicons/react/24/outline/StarIcon'
import StarIconSolid from '@heroicons/react/24/solid/StarIcon'
import { useCallback, useState } from 'react';
import s from './Rating.module.css'

interface Props {
  rating: number
  onChange: (rating: number) => void
}
export const Rating = ({ rating, onChange }: Props) => {
  const onClick = useCallback((rating: number) => () => {
    onChange(rating)
  }, [])

  const list = (num: number) => {
    if (num < 0) return []
    return Array(num).fill(1)
  }

  return (
    <div className={s.root}>
      {list(rating).map((_, idx) => (
        <button type="button" onClick={onClick(idx + 1)} key={idx}>
          <StarIconSolid key={idx} className={s.icon} />
        </button>
      ))}
      {list(5 - rating).map((_, idx) => (
        <button type="button" onClick={onClick(rating + idx + 1)} key={rating + idx} >
          <StarIconOutline key={idx} className={s.icon} />
        </button>
      ))}
    </div>
  )
}

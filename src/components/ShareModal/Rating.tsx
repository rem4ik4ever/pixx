import StarIconOutline from '@heroicons/react/24/outline/StarIcon'
import StarIconSolid from '@heroicons/react/24/solid/StarIcon'
import { useCallback, useState } from 'react';
import s from './Rating.module.css'

export const Rating = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const onClick = useCallback((rating: number) => () => {
    console.log({ rating })
    setRating(rating)
  }, [])

  const onHover = useCallback((idx: number) => (e: any) => {
    console.log({ hoverRating: idx })
    e.preventDefault();
    setHoverRating(idx)
  }, [])

  const onMouseLeave = useCallback(() => {
    setHoverRating(null)
  }, [])

  const list = (num: number) => {
    if (num < 0) return []
    return Array(num).fill(1)
  }

  return (
    <div className={s.root} onMouseLeave={onMouseLeave}>
      {list(hoverRating || rating).map((_, idx) => (
        <button onClick={onClick(idx + 1)} key={idx}>
          <StarIconSolid key={idx} className={s.icon} />
        </button>
      ))}
      {list(hoverRating ? (5 - hoverRating) : (5 - rating)).map((_, idx) => (
        <button onClick={onClick(rating + idx + 1)} key={rating + idx} >
          <StarIconOutline key={idx} className={s.icon} />
        </button>
      ))}
    </div>
  )
}

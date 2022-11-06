import { Card } from "@components/Card"
import { useEffect, useMemo, useState } from "react";
import s from './WallOfLove.module.css'

const fakeReviews = [
  "I couldn't have asked for more than this.",
  "You won't regret it. ClientsTrust.me is the real deal! I didn't even need training. I'd be lost without ClientsTrust.me.",
  "Best. Product. Ever! ",
  "ClientsTrust.me is worth much more than I paid. Since I invested in ClientsTrust.me I made over 100,000 dollars profits. ClientsTrust.me has really helped our business. Dude, your stuff is the bomb!",
  "Needless to say we are extremely satisfied with the results. ClientsTrust.me has really helped our business. ClientsTrust.me is worth much more than I paid.",
  "Really good. I can't say enough about ClientsTrust.me. It's just amazing. ",
  "ClientsTrust.me is the next killer app. ClientsTrust.me is the real deal!",
  "Definitely worth the investment.",
  "Your company is truly upstanding and is behind its product 100%. ClientsTrust.me is the real deal! Thanks to ClientsTrust.me, we've just launched our 5th website!",
  "Since I invested in ClientsTrust.me I made over 100,000 dollars profits.",
  "I am completely blown away. If you want real marketing that works and effective implementation - ClientsTrust.me's got you covered. After using ClientsTrust.me my business skyrocketed!",
  "Man, this thing is getting better and better as I learn more about it. The very best.",
  "Thank you for making it painless, pleasant and most of all hassle free!",
  "It's really wonderful.",
  "Thanks ClientsTrust.me!",
  "I would gladly pay over 600 dollars for ClientsTrust.me. It's really wonderful. I will recommend you to my colleagues.",
  "The best on the net! ClientsTrust.me has completely surpassed our expectations. Thanks for the great service.",
  "It's incredible.",
  "Thanks for the great service. ClientsTrust.me did exactly what you said it does. Very easy to use.",
  "This is simply unbelievable! Best. Product. Ever! I am really satisfied with my ClientsTrust.me.",
  "ClientsTrust.me should be nominated for service of the year. I don't always clop, but when I do, it's because of ClientsTrust.me.",
  "ClientsTrust.me is the real deal!",
  "ClientsTrust.me is awesome! I STRONGLY recommend ClientsTrust.me to EVERYONE interested in running a successful online business!",
  "It's incredible. Nice work on your ClientsTrust.me. ClientsTrust.me was worth a fortune to my company.",
  "I have gotten at least 50 times the value from ClientsTrust.me. Thanks for the great service. I would like to personally thank you for your outstanding product. ClientsTrust.me has got everything I need.",
  "No matter where you go, ClientsTrust.me is the coolest, most happening thing around! Thank you so much for your help. ClientsTrust.me has got everything I need. It's all good. "
]

const fetchReviews = async () => {
  try {
    const users: any = await (await fetch(`https://randomuser.me/api/?results=${fakeReviews.length}`)).json()
    const reviews = users.results.map((user: any, idx: number) => ({
      ...user,
      review: fakeReviews[idx]
    }))
    return reviews;
  } catch (error) {
    return []
  }
}


export const WallOfLove = () => {
  const [reviews, setReviews] = useState<any[]>([])
  useEffect(() => {
    async function init() {
      const res = await fetchReviews()
      setReviews(res)
    }
    init()
  }, [])

  const columns = useMemo(() => {
    const res: [any[], any[], any[]] = [[], [], []]
    let col = 0;
    for (let i = 0; i < reviews.length; i = i + 1) {
      res[col]?.push(reviews[i])
      col = (col + i) % 4
    }
    return res;
  }, [reviews])

  return (
    <div className={s.root}>
      <div className={s.columns}>
        {columns.map((column, colIdx) => (
          <div className={s.column} key={colIdx}>
            {column.map((review: any) => (
              <Card key={review.id.value} testimonial={review} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

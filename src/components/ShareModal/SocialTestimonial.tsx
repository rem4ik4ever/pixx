import { AiOutlineFacebook, AiOutlineTwitter, AiOutlineLinkedin } from 'react-icons/ai'
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton } from 'react-share'
import s from './social-testimonial.module.css'
import clx from 'classnames'

export const SocialTestimonial = () => {
  return (
    <div className={s.root}>
      <FacebookShareButton url="https://clientstrust.me" title="Check out this amazing app!">
        <div className={clx(s.button, s.facebook)}>
          <AiOutlineFacebook className={s.icon} /> <span>Post on Facebook!</span>
        </div>
      </FacebookShareButton>

      <TwitterShareButton url="https://clientstrust.me" title="Check out this amazing app!">
        <div className={clx(s.button, s.twitter)}>
          <AiOutlineTwitter className={s.icon} />
          <span>
            Tweet it!
          </span>
        </div>
      </TwitterShareButton>

      {/*<LinkedinShareButton url="https://clientstrust.me" title="Check out this amazing app!">
        <div className={clx(s.button, s.linkedin)}>
          <AiOutlineLinkedin className={s.icon} />
          <span>
            Share on LinkedIn!
          </span>
        </div>
      </LinkedinShareButton>*/}
    </div>
  )
}

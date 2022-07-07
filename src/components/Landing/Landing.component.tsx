import Link from 'next/link'
import Button from '../ui/Button'
import Input from '../ui/Input'
import s from './landing.module.css'
import clx from 'classnames'
import RightSvg from '../../assets/undraw_well_done_re_3hpo.svg'
import LeftSvg from '../../assets/undraw_projections_re_ulc6.svg'
import MobileSvg from '../../assets/undraw_email_campaign_re_m6k5.svg'
import Image from 'next/image'

const HeroSection = () => {
  return (
    <>
    <header className={s.header}>
      <Link href="/"><span className={s.logo}>Flows</span></Link>
    </header> 
    <section className={clx(s.hero, 'fit')}>
      <div className="md:block hidden">
        <Image src={LeftSvg} alt="left-svg" width={380}/>
      </div>
      <div className={s.heroContent}>
        <h1 className={s.heroTitle}>
          Increase <span className="text-orange">sales</span><br /> 
          with email<br />
          automation
        </h1>
        <p className={s.subtitle}>
          Automate email marketing campaigns and make them look awesome for your clients
        </p>
        <form className={s.subscribeForm}>
          <Input type="email" placeholder='Enter your email*' required/>
          <Button type="submit" variant='slim' className='whitespace-nowrap'>JOIN WAITLIST</Button>
        </form>
      </div>
      <div className="md:block hidden">
        <Image src={RightSvg} alt="right-svg" width={380}/>
      </div>
      <div className='block md:hidden'>
        <Image src={MobileSvg} alt="right-svg" width={220} height={220}/>
      </div>
    </section>
    </>
  )
}

export const Landing = () => {
  return <div className='container mx-auto'>
    <HeroSection />
  </div>
}

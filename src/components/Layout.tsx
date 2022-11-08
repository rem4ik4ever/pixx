import { ShieldCheckIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import React, { FC, ReactNode } from 'react';
import { SubscribeForm } from './Landing';
import s from './Landing/landing.module.css'
import { ThemeSwitcher } from './ThemeSwitcher';
import Button from './ui/Button';

const Header = () => {

  return (
    <header className={s.header}>
      <Link href="/">
        <a>
          <div className="flex gap-2">
            <ShieldCheckIcon className="w-8 h-8" />
            <span className={s.logo}>clientstrust.me</span>
          </div>
        </a>
      </Link>

      <div className="gap-4 hidden md:flex">
        <Link href="/blog" passHref>
          <a>
            <span className="font-semibold text-accent-9">Blog</span>
          </a>
        </Link>

        <Link href="/pricing" passHref>
          <a>
            <span className='font-semibold text-accent-9'>Pricing</span>
          </a>
        </Link>
      </div>

      <div className="hidden md:flex gap-5 items-center">
        <ThemeSwitcher />
        <Link href="/sign-up">
          <a>
            <Button type="button" variant='slim'>
              Sign up
            </Button>
          </a>
        </Link>
      </div>
    </header>
  )
}

export const Footer = () => {
  return (
    <footer className="container mx-auto flex py-4 my-8 gap-8 md:flex-row flex-col md:p-0 p-4">
      <div className="">
        <Link href="/">
          <a>
            <div className="flex gap-2">
              <ShieldCheckIcon className="w-8 h-8" />
              <span className={s.logo}>clientstrust.me</span>
            </div>
          </a>
        </Link>
        <p className="text-lg max-w-xs mt-6 text-accent-4">
          Create trust and strengthen brand credibility. With easy no code testimonial collection!
        </p>
      </div>
      <div>
        <h4 className="text-xl">Sign up for updates</h4>
        <SubscribeForm />
      </div>
    </footer>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export const withLayout = (Component: React.FC) => (props: any) => {
  return (
    <Layout>
      <Component {...props} />
    </Layout>
  )
}


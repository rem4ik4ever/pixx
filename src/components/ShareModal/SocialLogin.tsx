import { useState } from "react";
import { IResolveParams, LoginSocialGoogle, LoginSocialTwitter } from "reactjs-social-login"
import { Profile } from "./KYCForm/types";
import { AiFillTwitterCircle, AiFillFacebook, AiFillLinkedin, AiFillGoogleCircle } from 'react-icons/ai'

interface Props {
  onLogin: (profile: Profile) => void
  onError?: (error: unknown) => void
}

const REDIRECT_URI = process.env.LOGIN_REDIRECT_URL || 'http://localhost:3000'

const formatTwitterProfile = (data: any): Profile => {
  return {
    name: data.name,
    provider: 'twitter',
    profileImgUrl: data.profile_image_url,
    username: data.username,
  }
}

const formatGoogleProfile = (data: any): Profile => {
  return {
    name: data.name,
    profileImgUrl: data.picture,
    provider: 'google',
    email: data.email,
  }
}

export const SocialLogin = ({ onLogin, onError }: Props) => {
  return (
    <div className="flex gap-2">
      <LoginSocialGoogle
        client_id={process.env.NEXT_PUBLIC_GG_APP_ID || ''}
        scope="openid profile email"
        discoveryDocs="claims_supported"
        access_type="offline"
        onResolve={({ data }: IResolveParams) => {
          onLogin(formatGoogleProfile(data))
        }}
        onReject={err => {
          onError?.(err)
          console.log(err);
        }}
      >
        <button>
          <AiFillGoogleCircle className="w-10 h-10" />
        </button>
      </LoginSocialGoogle>
      <LoginSocialTwitter
        client_id={process.env.NEXT_PUBLIC_TWITTER_V2_APP_KEY || ''}
        redirect_uri={REDIRECT_URI}
        onResolve={({ data }: IResolveParams) => {
          onLogin(formatTwitterProfile(data))
        }}
        onReject={(err: any) => {
          onError?.(err)
          console.log(err);
        }}
      >
        <button>
          <AiFillTwitterCircle className="w-10 h-10" />
        </button>
      </LoginSocialTwitter>
    </div>
  )
}

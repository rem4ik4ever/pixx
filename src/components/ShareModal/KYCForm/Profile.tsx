import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid'
import { Profile } from "./types"

interface Props {
  profile: Profile
  onLogout: () => void
}

export const ProfileView = ({ profile, onLogout }: Props) => {
  return (
    <div className="border rounded-xl p-2 bg-primary w-full flex justify-between">
      <div className="flex gap-4 ">
        {profile.profileImgUrl && <img className="rounded-full h-12 w-12" src={profile.profileImgUrl} alt="avatar" height={120} width={120} referrerPolicy="no-referrer" />}
        <div className="flex flex-col justify-center">
          <div className="text-primary">{profile.name}</div>
          <div className="text-accent-3 text-sm">{profile.jobTitle} {profile.jobTitle && profile.company && 'at'} {profile.company}</div>
        </div>
      </div>
      <button onClick={onLogout}>
        <ArrowRightOnRectangleIcon className="w-6 h-6 text-accent-3" />
      </button>
    </div>
  )
}

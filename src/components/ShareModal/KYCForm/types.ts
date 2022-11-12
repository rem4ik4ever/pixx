
export interface Profile {
  name?: string;
  email?: string;
  profileImgUrl?: string;
  provider: string;
  username?: string;
  jobTitle?: string;
  company?: string;
}


export interface Testimonial {
  type: 'text' | 'social' | 'video';
  content?: string;
  rating?: number;
}

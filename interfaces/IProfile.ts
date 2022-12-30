export interface IProfile extends ProfileCreatetionAttributes {
  subscribers: number[];
  subscribtions: number[];
  createdAt: string;
  likes: number[];
}

export interface ProfileCreatetionAttributes {
  name: string;
  username: string;
  bio?: string;
  avatar?: string;
  header?: string;
}

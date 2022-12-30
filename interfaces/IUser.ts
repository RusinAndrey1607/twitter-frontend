export interface IUser extends UserCreationAttributes {
  id: number;
  blocked: boolean;
}

export interface UserCreationAttributes {
  email: string;
  password: string;
}

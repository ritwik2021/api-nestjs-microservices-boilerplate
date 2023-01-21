import { Document } from 'mongoose';
export interface User extends Document {
  name: string;
  email: string;
  username: string;
  password: string;
  isEmailVerified: boolean;
  role: string;
  mobile: string;
  status: string;
  isProfileUpdated: boolean;
  profileImageUrl: string;
  checkPassword(attempt): boolean;
  appleId: string;
  isBlocked: boolean;
  dob: string;
  deletedAt: any;
  isUsernameConfirmed: boolean;
  lastLogin: Date;
  pinCode: string;
  state: string;
  country: string;
  address: string;
  profilePicUrl: string;
  city: string;
}

export interface Address {
  userId: string;
  firstName: string;
  lastName: string;
  pinCode: string;
  state: string;
  country: string;
  phone: string;
  addressType: string;
  address: string;
  _id: string;
}

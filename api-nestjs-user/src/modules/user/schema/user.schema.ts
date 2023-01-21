import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as grpc from 'grpc';
import { ConfigService } from '@nestjs/config';
import { HttpStatus } from '@nestjs/common';

import { User } from '../interface/user.interface';
import { ResponseHandlerModel } from '../../../shared/model/response-handler.model';

const GrpcStatus = grpc.status;
const configService = new ConfigService();
const responseHandlerModel = new ResponseHandlerModel();

export enum UserRole {
  USER = 'user',
  SUPERADMIN = 'superadmin',
  ADMIN = 'admin',
  CLIENT = 'client'
}

export enum DocumentType {
  PASSPORT = 'passport',
  LICENSE = 'license',
  BANK_PASSBOOK = 'bank_passbook',
  ADDRESS_PROOF = 'address_proof'
}

export const UserSchema = new mongoose.Schema<User>(
  {
    name: {
      type: String
    },
    email: {
      type: String
    },
    username: {
      type: String
    },
    password: {
      type: String,
      default: null
    },
    mobile: {
      type: String,
      default: null
    },
    role: {
      type: String,
      enum: UserRole,
      default: UserRole.USER
    },
    status: {
      type: String,
      default: null
    },
    deletedAt: {
      type: Date,
      default: null
    },
    isEmailVerified: {
      type: Boolean,
      default: false
    },
    isBlocked: {
      type: Boolean,
      default: false
    },
    isUsernameConfirmed: {
      type: Boolean,
      default: false
    },
    dob: {
      type: String
    },
    lastLogin: {
      type: Date,
      default: null
    },
    pinCode: {
      type: String,
      default: null
    },
    state: {
      type: String,
      default: null
    },
    country: {
      type: String,
      default: 'USA'
    },
    city: {
      type: String,
      default: ''
    },
    address: {
      type: String,
      default: null
    },
    profilePicUrl: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true
  }
);

UserSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  if (userObject?.profilePicUrl?.length > 0) {
    userObject.profilePicUrl = `${configService.get('S3_PREFIX')}${userObject.profilePicUrl}`;
  }

  delete userObject.password;
  return userObject;
};

UserSchema.pre('save', function (next) {
  const user = this;
  if (!user.password) {
    next();
  }

  // Make sure not to rehash pwd if already hashed
  if (!user.isModified('password')) return next();

  // Generate a salt and use it to hash the user
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.checkPassword = async function (attempt) {
  try {
    const user = this;
    const isMatch = await bcrypt.compare(attempt, user.password);
    return isMatch;
  } catch (e) {
    await responseHandlerModel.response('Unauthorized', HttpStatus.UNAUTHORIZED, GrpcStatus.UNAUTHENTICATED, null);
  }
};

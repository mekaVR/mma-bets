import { Schema } from 'mongoose';

export const STRING = {
  type: String,
  required: false,
};

export const STRING_REQUIRED = {
  type: String,
  required: true,
};

export const BOOLEAN = {
  type: Boolean,
  required: false,
};

export const BOOLEAN_REQUIRED = {
  type: Boolean,
  required: true,
};

export const NUMBER = {
  type: Number,
  required: false,
};

export const NUMBER_REQUIRED = {
  type: Number,
  required: true,
};

export const DATE = {
  type: Date,
  required: false,
};

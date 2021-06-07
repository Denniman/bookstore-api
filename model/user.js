import pkg from 'mongoose';

const { Schema, model } = pkg;

const userSchema = new Schema(
  {
    
    lastName: {
        type: String,
        required: true
    },

    firstName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true, 
    },
    password: {
      type: String,
      // required: true
    }
  },
  { timestamps: true }
);

export const User = model('user', userSchema);

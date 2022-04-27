import mongoose from 'mongoose';
const Schema = mongoose.Schema

const userSchema = new Schema({
  first_name: {
    type: String,
    lowercase: true,
    required: [true, 'First name cannot be blank'],
    minlength: [1, 'Minimum 1 characters required'],
    maxlength: [20, 'First name cannot be that long']
  },
  last_name: {
    type: String,
    lowercase: true,
    default: '',
    required: [true, 'Last name cannot be blank'],
    minlength: [1, 'Minimum 1 characters required'],
    maxlength: [20, 'Last name cannot be that long']
  },
  email:{
    type: String,
    lowercase: true,
    required: [true, 'Email cannot be blank'],
    minlength: [1, 'Minimum 1 characters required'],
    maxlength: [70, 'Email cannot be that long']
  },
  note: {
    type: String,
    lowercase: true,
    default: '',
  }
})

export default mongoose.model('user', userSchema)
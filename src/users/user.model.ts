import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  id: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true },
  challenges: { type: Array },
});

export interface User extends mongoose.Document {
    id: string;
    email: string;
    username: string;
    challenges: { id: string, title: string }[];
}

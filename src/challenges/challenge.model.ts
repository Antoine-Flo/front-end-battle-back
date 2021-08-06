import * as mongoose from 'mongoose';

export const ChallengeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  code: { type: String, required: true },
  description: { type: String, required: true },
  imgUrl: { type: String, required: true },
});

export interface Challenge extends mongoose.Document {
  id: string;
  title: string;
  code: string;
  description: string;
  imgUrl: string;
}

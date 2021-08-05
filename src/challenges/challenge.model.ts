import * as mongoose from 'mongoose';

export const ChallengeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imgUrl: { type: String, required: true },
});

export interface Challenge {
  id: string;
  title: string;
  description: string;
  imgUrl: string;
}

import * as mongoose from 'mongoose';

export const ChallengeSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  code: { type: String, required: true },
  description: { type: String, required: true },
  imgId: { type: String, required: true },
  creatorId: { type: String, required: true },
});

export interface Challenge extends mongoose.Document {
  id: string;
  title: string;
  code: string;
  description: string;
  imgId: string;
  creatorId: string;
}

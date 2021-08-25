import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChallengeDocument = Challenge & Document;

@Schema()
export class Challenge {
  @Prop({ required: true })
  id: string;
  
  @Prop()
  title: string;

  @Prop({ required: true })
  code: string;

  @Prop()
  description: string;

  @Prop()
  imgId: string;

  @Prop({ required: true })
  creatorId: string;
}

export const ChallengeSchema = SchemaFactory.createForClass(Challenge);
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Challenge } from './challenge.model';

@Injectable()
export class ChallengesService {
  private challenges: Challenge[] = [];

  constructor(
    @InjectModel('Challenge') private readonly challengeModel: Model<Challenge>,
  ) {}

  async addChallenge(title: string, description: string, imgUrl: string) {
    const newChallenge = new this.challengeModel({ title, description, imgUrl, });
    const result = await newChallenge.save();    
    return result.id as string;
  }

  async getChallenges() {
    const challenges = await this.challengeModel.find().exec();
    return challenges as Challenge[];
  }

  getChallenge(challengeId: string) {
    const challenge = this.findChallenge(challengeId)[0];
    return { ...challenge };
  }

  updateChallenge(
    challengeId: string,
    title: string,
    description: string,
    imgUrl: string,
  ) {
    const [challenge, index] = this.findChallenge(challengeId);
    const updatedChallenge = { ...challenge };
    if (title) {
      updatedChallenge.title = title;
    }
    if (description) {
      updatedChallenge.description = description;
    }
    if (imgUrl) {
      updatedChallenge.imgUrl = imgUrl;
    }
    this.challenges[index] = updatedChallenge;
  }

  deleteChallenge(challengeId: string) {
    const [, index] = this.findChallenge(challengeId);
    this.challenges.splice(index, 1);
  }

  private findChallenge(challengeId: string): [Challenge, number] {
    const challengeIndex = this.challenges.findIndex(
      (chal) => chal.id === challengeId,
    );
    const challenge = this.challenges[challengeIndex];
    if (!challenge) {
      throw new NotFoundException('Could not find product');
    }
    return [challenge, challengeIndex];
  }
}

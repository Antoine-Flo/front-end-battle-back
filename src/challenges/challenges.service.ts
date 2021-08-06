import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Challenge } from './challenge.model';

@Injectable()
export class ChallengesService {

  constructor(
    @InjectModel('Challenge') private readonly challengeModel: Model<Challenge>,
  ) {}

  async addChallenge(title: string, code: string, description: string, imgUrl: string) {
    const newChallenge = new this.challengeModel({
      title,
      code,
      description,
      imgUrl,
    });
    const result = await newChallenge.save();
    return result.id as string;
  }

  async getChallenges() {
    const challenges = await this.challengeModel.find().exec();
    return challenges.map((chal) => ({
      id: chal.id,
      title: chal.title,
      code: chal.code,
      description: chal.description,
      imgUrl: chal.imgUrl,
    }));
  }

  async getChallenge(challengeId: string) {
    const chal = await this.findChallenge(challengeId);
    return {
      id: chal.id,
      title: chal.title,
      code: chal.code,
      description: chal.description,
      imgUrl: chal.imgUrl,
    };
  }

  async updateChallenge(
    challengeId: string,
    title: string,
    code: string,
    description: string,
    imgUrl: string,
  ) {
    const updatedChallenge = await this.findChallenge(challengeId);

    if (title) {
      updatedChallenge.title = title;
    }
    if (code) {
      updatedChallenge.code = code;
    }
    if (description) {
      updatedChallenge.description = description;
    }
    if (imgUrl) {
      updatedChallenge.imgUrl = imgUrl;
    }
    updatedChallenge.save();
  }

  async deleteChallenge(challengeId: string) {
    const result = await this.challengeModel.deleteOne({_id: challengeId}).exec();
    if(result.n === 0 ) {
      throw new NotFoundException('Could not find product');
    }
    
  }

  private async findChallenge(challengeId: string): Promise<Challenge> {
    let challenge;
    try {
      challenge = await this.challengeModel.findById(challengeId);
    } catch (error) {
      throw new NotFoundException('Could not find product');
    }
    if (!challenge) {
      throw new NotFoundException('Could not find product');
    }
    return challenge;
  }
}

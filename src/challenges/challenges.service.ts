import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Challenge, ChallengeDocument } from './challenge.model';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectModel('Challenge') private readonly challengeModel: Model<ChallengeDocument>,
  ) {}

  async create(createChallengeDto: CreateChallengeDto) {
    const newChallenge = new this.challengeModel(createChallengeDto);
    return newChallenge.save();
  }

  async findAll() {
    return this.challengeModel.find().exec();
  }

  async findOne(id: string) {
    return this.findChallenge(id).then((challenge) => {
      if (!challenge) throw new NotFoundException();
      if (challenge) return challenge;
    });
  }

  async updateChallenge(id: string, updateChallengeDto: UpdateChallengeDto) {
    return this.challengeModel.findOneAndUpdate({ id }, updateChallengeDto, {
      new: true,
      useFindAndModify: false
    });
  }

  async deleteChallenge(id: string) {
    const result = await this.challengeModel.deleteOne({ id }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find product');
    }
  }

  private async findChallenge(id: string): Promise<Challenge> {
    let challenge;
    try {
      challenge = await this.challengeModel.findOne({ id });
    } catch (error) {
      throw new NotFoundException('Could not find challenge');
    }
    if (!challenge) {
      throw new NotFoundException('Could not find challenge');
    }
    return challenge;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Challenge } from './challenge.model';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectModel('Challenge') private readonly challengeModel: Model<Challenge>,
  ) {}

  create(createChallengeDto: CreateChallengeDto) {
    const newChallenge = new this.challengeModel(createChallengeDto);
    return newChallenge
      .save()
      .then(() => {
        return 'Nouveau challenge créé';
      })
      .catch((err) => console.log(err));
  }

  findAll() {
    return this.challengeModel.find().exec();
  }

  findOne(id: string) {
    return this.findChallenge(id);
  }

  updateChallenge(id: string, updateChallengeDto: UpdateChallengeDto) {
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

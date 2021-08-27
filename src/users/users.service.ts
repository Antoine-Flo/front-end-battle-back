import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto);
    return newUser
      .save()
      .then(() => {
        return 'Nouveau utilisateur créé';
      })
      .catch((err) => console.log(err));
  }

  addChallenge(userId: string, challengeId: string) {
    return this.userModel.updateOne({id: userId}, { $push: { challenges:  challengeId } })
  }

  findAll() {
    return this.userModel.find().exec();
  }

  findOne(email: string) {
    return this.userModel.findOne({email});
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findOneAndUpdate({ id }, updateUserDto, {
      new: true,
      useFindAndModify: false
    });
  }

  remove(id: string) {
    return this.userModel.deleteOne({ id }).exec();
  }
}

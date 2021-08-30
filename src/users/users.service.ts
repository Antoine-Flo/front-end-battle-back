import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  //////////////////
  //     GET      //
  //////////////////

  findAll() {
    return this.userModel.find().exec();
  }

  findOne(id: string) {
    return this.userModel.findOne({ id }).then((user) => {
      if (!user) throw new NotFoundException();
      if (user) return user;
    });
  }

  findUserID(email: string) {
    return this.userModel.findOne({ email }, { id: 1 }).then((id) => {
      if (!id) throw new NotFoundException();
      if (id) return id;
    });
  }

  ////////////////////
  //      POST      //
  ////////////////////

  create(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto);
    return newUser.save().then((user) => {
      return user;
    });
  }

  /////////////////////
  //      PATCH      //
  /////////////////////

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findOneAndUpdate({ id }, updateUserDto, {
      new: true,
      useFindAndModify: false,
    });
  }

  addChallenge(id: string, userChallenge: { id: string }) {
    return this.userModel.updateOne(
      { id },
      { $push: { challenges: userChallenge } },
    );
  }

  deleteChallenge(id: string, userChallenge: { id: string }) {
    return this.userModel.updateOne(
      { id },
      { $pull: { challenges: { id: userChallenge.id } } },
    );
  }

  /////////////////////
  //      DELETE     //
  /////////////////////

  remove(id: string) {
    return this.userModel.deleteOne({ id }).exec();
  }
}

import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';

@Controller('challenges')
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @Post()
  async create(@Body() challenge: CreateChallengeDto) {
    return this.challengesService.create(challenge);
  }

  @Get()
  async findAll() {
    return this.challengesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') chalId: string) {
    return this.challengesService.findOne(chalId);
  }

  @Patch(':id')
  async patchChallenge(
    @Param('id') id: string,
    @Body() updateChallengeDto: UpdateChallengeDto,
  ) {
    return this.challengesService.updateChallenge(id, updateChallengeDto);
  }

  @Delete(':id')
  async removeChallenge(@Param('id') id: string) {
    return this.challengesService.deleteChallenge(id);
  }
}

import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ChallengesService } from './challenges.service';

@Controller('challenges')
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @Post()
  async addChallenge(
    @Body('title') chalTitle: string,
    @Body('description') chalDesc: string,
    @Body('imgUrl') chalImgUrl: string,
  ) {
    const generatedId = await this.challengesService.addChallenge(
      chalTitle,
      chalDesc,
      chalImgUrl,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllChallenges() {
    const challenges = await this.challengesService.getChallenges();
    return challenges;
  }

  // You can delete this comment
  @Get(':id')
  getChallenge(@Param('id') chalId: string) {
    return this.challengesService.getChallenge(chalId);
  }

  @Patch(':id')
  patchChallenge(
    @Param('id') chalId: string,
    @Body('title') chalTitle: string,
    @Body('description') chalDesc: string,
    @Body('imgUrl') chalImgUrl: string,
  ) {
    this.challengesService.updateChallenge(chalId, chalTitle, chalDesc, chalImgUrl);
    return null;
  }

  @Delete(':id')
  removeChallenge(@Param('id') chalId: string,) {
    this.challengesService.deleteChallenge(chalId);
    return null;
  }
}

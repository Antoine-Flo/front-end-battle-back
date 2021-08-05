import { Injectable, NotFoundException } from '@nestjs/common';
import { Challenge } from './challenge.model';

@Injectable()
export class ChallengesService {
  private challenges: Challenge[] = [];

  addChallenge(title: string, description: string, imgUrl: string) {
    const chalId = Math.random().toString();
    const newChallenge = new Challenge(chalId, title, description, imgUrl);
    this.challenges.push(newChallenge);
    return chalId;
  }

  getChallenges() {
    return [...this.challenges];
  }

  getChallenge(challengeId: string) {
    const challenge = this.findChallenge(challengeId)[0];
    return { ...challenge };
  }

  updateChallenge(challengeId: string, title: string, description: string, imgUrl: string) {
    const [challenge, index] = this.findChallenge(challengeId);
    const updatedChallenge = {...challenge} 
    if(title) {
        updatedChallenge.title = title
    }
    if(description) {
        updatedChallenge.description = description
    }
    if(imgUrl) {
        updatedChallenge.imgUrl = imgUrl
    }
     this.challenges[index] = updatedChallenge;
  }

  deleteChallenge(challengeId: string) {
      const [ , index] = this.findChallenge(challengeId);
    this.challenges.splice(index, 1);
  }

  private findChallenge(challengeId: string): [Challenge, number] {
    const challengeIndex = this.challenges.findIndex((chal) => chal.id === challengeId);
    const challenge = this.challenges[challengeIndex];
    if (!challenge) {
      throw new NotFoundException('Could not find product');
    }
    return [challenge, challengeIndex];
  }
}

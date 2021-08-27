import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new uuuuuuuser' })
  // @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post(':userEmail/challenge')
  @ApiOperation({ summary: "Add a challenge ID to the user's challenges array." })
  addChallenge(@Param('userEmail') userEmail: string, @Body() challenge: {}) {
    return this.usersService.addChallenge(userEmail, challenge);
  }

  @Get()
  @ApiOperation({ summary: "Find all the users." })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.usersService.findOne(email);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Delete(':userEmail/challenge')
  deleteChallenge(@Param('userEmail') userEmail: string, @Body() challenge: {id: string, }) {
    return this.usersService.deleteChallenge(userEmail, challenge)
  }
}

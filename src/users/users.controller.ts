import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseFilters,
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
  
  //////////////////
  //     GET      //
  //////////////////
  
  @Get()
  @ApiOperation({ summary: 'Find all the users.' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':userId')
  findOne(@Param('userId') userId: string) {
    return this.usersService.findOne(userId);
  }
  
  @Get(':email/id')
  findUserId(@Param('email') email: string) {
    return this.usersService.findUserID(atob(email));
  }
  
  ////////////////////
  //      POST      //
  ////////////////////
  
  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /////////////////////
  //      PATCH      //
  /////////////////////

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch(':userId/challenge')
  @ApiOperation({
    summary: "Add a challenge ID to the user's challenges array.",
  })
  addChallenge(
    @Param('userId') userId: string,
    @Query('action') action: string,
    @Body() challenge: { id: string },
  ) {
    if (action === 'add') {
      return this.usersService.addChallenge(userId, challenge);
    }
    if (action === 'delete') {
      return this.usersService.deleteChallenge(userId, challenge);
    }
  }

  /////////////////////
  //      DELETE     //
  /////////////////////

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}

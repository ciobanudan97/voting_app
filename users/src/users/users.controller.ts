import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @MessagePattern({ cmd: 'createUser' })
  create(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern({ cmd: 'findAllUsers' })
  findAll() {
    return this.usersService.findAll();
  }

  @MessagePattern({ cmd: 'findOneUser' })
  findOne(@Payload() id: string) {
    return this.usersService.findOne(id);
  }

  @MessagePattern({ cmd: 'updateUser' })
  update(@Payload() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  @MessagePattern({ cmd: 'deleteUser' })
  remove(@Payload() id: string) {
    return this.usersService.remove(id);
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_SERVICE') private readonly client: ClientProxy) {
  }

  async create(createUserDto: CreateUserDto) {
    return await firstValueFrom(this.client.send({ cmd: 'createUser' }, createUserDto));
  }

  async findAll() {
    return await firstValueFrom(this.client.send({ cmd: 'findAllUsers' }, ''));
  }

  async findOne(id: string) {
    return await firstValueFrom(this.client.send({ cmd: 'findOneUser' }, id));
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await firstValueFrom(this.client.send({ cmd: 'updateUser' }, updateUserDto));
  }

  async remove(id: string) {
    return await firstValueFrom(this.client.send({ cmd: 'deleteUser' }, id));
  }
}

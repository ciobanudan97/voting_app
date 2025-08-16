import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService implements OnModuleInit {
  async onModuleInit() {
    await this.ensureAdminExists();
  }

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {

  }
  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.passwd, 10);

    const userDto: CreateUserDto = {
      ...createUserDto,
      passwd: hashedPassword
    }
    const user = await this.userRepository.create(userDto);

    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update({ id }, updateUserDto);
  }

  remove(id: string) {
    return this.userRepository.softDelete(id);
  }

  async ensureAdminExists() {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || '12356dfhrzal';

    const existingAdmin = await this.userRepository.findOneBy({ email: adminEmail });
    if (existingAdmin) return;

    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    const adminUser = this.userRepository.create({
      email: adminEmail,
      passwd: hashedPassword,
      role: 'admin',
      name: 'admin',
      cnp: '124'
    });

    await this.userRepository.save(adminUser);
    console.log('✅ Admin user created at startup');
  }
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateVotingOptionDto } from './create-voting-option.dto';

export class UpdateVotingOptionDto extends PartialType(CreateVotingOptionDto) {
  id: number;
}

import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VoteOptionDto } from './dto/vote-option.dto';
import { Connection } from 'mongoose';

@Injectable()
export class VotingExecutorService {
    constructor(
        @InjectModel('Elector') private electorSchemaModel: Model<any>,
        @InjectModel('VoteOption') private voteOptionModel: Model<any>,
    ) { }

    async createVote(voteOptionDto: VoteOptionDto, email: string) {

        const hasAlreadyVote = await this.checkVote(voteOptionDto.category, email)
        if (hasAlreadyVote) {
            await this.sendMail('You have already vote', email)
            return;
        }

        this.voteOptionModel.create(voteOptionDto);
        this.electorSchemaModel.create({ category: voteOptionDto.category, email });

    }

    async checkVote(category: string, email: string) {
        const hasVote = await this.electorSchemaModel.find({ category, email });
        if (hasVote.length)
            return true;
        return false
    }

    async sendMail(message: string, email: string) {
        console.log(`Send email to ${email}: ${message}`)
    }
}

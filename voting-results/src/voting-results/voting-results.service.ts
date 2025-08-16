import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class VotingResultsService {
    constructor(
        @InjectModel('VoteOption') private voteOptionModel: Model<any>
    ) { }

    countVotesByCategory(category: string) {
        return this.voteOptionModel.aggregate([
            { $match: { category: category } },
            {
                $group: {
                    _id: "$option",
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    option: "$_id",
                    count: 1
                }
            },
            { $sort: { count: -1 } }
        ])
    }

    findByCategory(category: string) {
        return this.voteOptionModel.find({
            category
        })
    }
}



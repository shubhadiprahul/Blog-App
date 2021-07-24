const Like_Dislike = require('../model/like_Dislike');
module.exports = class likeservice{
    async create(details){
        console.log(details,"i'ts working")
        return await Like_Dislike.query().insert(details)
    }
    async findAll(txn){
        return await Like_Dislike.query()
    }

    async totallikes(total){
        const sum = await Like_Dislike.query().sum('like',true)
        console.log(sum)
        return sum
    }

    async totaldislike(total){
        const sum = await Like_Dislike.query().sum('dislike',false)
        console.log(sum)
        return sum
    }
}
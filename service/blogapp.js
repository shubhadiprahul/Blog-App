const Blog = require('../model/blogApp');
module.exports = class BlogService{
    async create(details){
        console.log(details,"service details")
        return await Blog.query().insert(details)
    }
    async findAll(txn){
        return await Blog.query();
    }
    async findById(id){
        const userId = await Blog.query().findById(id);
        if(userId === undefined){
            return (`{sorry : user ${id} not found }`)
        }
        return userId;
    }
    async userUpdate(id, user_details){
        console.log(user_details,id,"user_details");
        const userUpdate = await Blog.query().findById(id).patch(user_details);
        return userUpdate
    }
    async userDelete(userId){
        // console.log(userId,"userId");
        const userDelete = await Blog.query().deleteById(userId);
        return userDelete;
    }
}
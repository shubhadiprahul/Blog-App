const { Router } = require('express');
var express = require('express');
const router = express.Router();    
const BlogService = require('../service/blogapp');
const service = new BlogService();

const {authenticateToken} = require('../auth/jwt')

router.get('/homepage',authenticateToken,(req,res)=>{
    console.log({"sucess": "Welcome to blog home page"});
    res.send({"sucess": "Welcome to blog home page"})
});

router.post("/createblog",authenticateToken,async (req,res)=>{
    console.log(req.body);
    service.create(req.body).then((data)=>{
        console.log({"sucess": "create blog successfully"})
        res.send({"sucess": "create blog successfully"})
    }).catch((error)=>{
        res.send(error)
    })
});

router.get('/getAll',authenticateToken,(req,res)=>{
    service.findAll().then((data)=>{
        res.send(data);
    }).catch((error)=>{
        res.send(error)
    })
})

router.get('/data/:id',authenticateToken,(req,res)=>{
    const userId = req.params.id;
    console.log(userId)
    service.findById(userId).then((data)=>{
        res.send(data)
    }).catch((error)=>{
        res.send(error)
    })

})

// Update 
router.put('/updateblog/:id',authenticateToken,(req,res)=>{
    const userId = req.params.id;
    console.log(userId,req.body );
    service.userUpdate(userId,req.body).then((data)=>{
        console.log(data,"data")
        if(data > 0){
            res.send({"success":`id ${userId} details update`})
        }else{
            res.send({"sorry": `id ${userId} not found`})
        }
    }).catch((err)=>{
        res.send(err);
    })  
});

router.delete("/deleteblog/:id",authenticateToken,(req,res)=>{
    const userId = req.params.id;
    console.log(userId)
    service.userDelete(userId).then((data)=>{
        console.log(userId,"id found")
        if (data > 0){
            res.send("delete sucessfully")
        }else{
            res.send(`id not ${userId}  found`)
        }
    }).catch((err)=>{
        res.send(err)
    })
})

module.exports = router;

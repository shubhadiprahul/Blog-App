const Router = require('express');
var express = require('express');
const router = express.Router();
const likeservice = require('../service/like_Dislike');
const service = new likeservice();

const {authenticateToken} = require('../auth/jwt')

router.put('/likedislike',authenticateToken,(req,res)=>{
    console.log(req.body)
    service.create(req.body).then((data)=>{
        console.log({"success":"like "})
        res.send({"success":"like "})
    }).catch((err)=>{
        res.send(err)
    })
})

router.get('/getAll',authenticateToken,(req,res)=>{
    service.findAll().then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send(err)
    })
})
router.get('/Alllike',authenticateToken,(req,res)=>{
    service.totallikes().then((data)=>{
        console.log(data)
        res.send(data)
    }).catch((err)=>{
        res.send(err)
    })
})

router.get('/Alldislike',authenticateToken,(req,res)=>{
    service.totaldislike().then((data)=>{
        console.log(data)
        res.send(data)
    }).catch((err)=>{
        res.send(err)
    })
})



module.exports = router;
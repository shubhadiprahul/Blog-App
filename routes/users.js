const jwt = require('jsonwebtoken')
const bcyrpt =  require('bcrypt')
const { Router } = require('express');
const Users = require('../model/users');

var express = require('express');
const router = express.Router();    
const UserService = require('../service/users');
const service = new UserService();

const {generateAccessToken, authenticateToken} = require('../auth/jwt')


router.get('/homepage',(req,res)=>{
    console.log({"sucess": "Welcome to home page"});
    res.send({"sucess": "Welcome to home page"})
});

// sign up
router.post("/signup",async (req,res)=>{
    console.log(req.body);
    service.create(req.body).then((data)=>{
        console.log({"sucess": "signup successfully"})
        res.send({"sucess": "signup successfully"})
    }).catch((error)=>{
        res.send(error)
    })
});


// Get data by id 
router.get('/data/:id',(req,res)=>{
    const userId = req.params.id;
    console.log(userId)
    service.findById(userId).then((data)=>{
        res.send(data)
    }).catch((error)=>{
        res.send(error)
    })

})


// Update 
router.put('/updateUser/:id',(req,res)=>{
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


// All data
router.get('/getAll',authenticateToken,(req,res)=>{
    service.findAll().then((data)=>{
        res.send(data);
    }).catch((error)=>{
        res.send(error)
    })
})


// delete by id
router.delete("/userdelete/:id",(req,res)=>{
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

router.post('/login',async(req,res)=>{
    // const userdata = service.emailChecking(req.body.email)
    // console.log(userdata)
    const userDetails = await Users.query().findOne({
        email:req.body.email
    })
    console.log(userDetails);
    if(userDetails){
    //     console.log(userdata);
        const passcheck = await bcyrpt.compare(req.body.password,userDetails.password)
        console.log(passcheck,'gd');
        if(passcheck){
    //         // const token = generateAccessToken(userdata)
    //         console.log('dsf')
            const token = jwt.sign({email:userDetails.email}, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
            res.cookie('key',token)
            // console.log(token)
            res.send({"massage":"login sucessfully"});
        }else{
            res.send({"sorry":"wrong password"})
        }
    }else{
        res.send({'sorry': 'This email not exist !'})
    }
})

module.exports = router;
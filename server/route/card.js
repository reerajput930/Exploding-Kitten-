const express = require("express");
const router = express.Router();
const userModel = require("../model/card");

// fetch  operation 
router.get("/allusers", async (req, res) => {
  
    try {
      const users = await userModel.find({});
      // console.log(tasks);
      res.status(200).json({ status: "success",users:users});
    } catch (error) {
      console.log(error.message);
      res.status(404).json({ status: "failed" });
    }
  });

  // fetch single data
  router.get("/singleuser/:email", async (req, res) => {
 
      const email = req.params.email
      console.log(email)
    try {
      const user = await userModel.findOne({email});
      console.log(user);
      res.status(200).json({ status: "success",user:user});
    } catch (error) {
      console.log(error.message);
      res.status(404).json({ status: "failed" });
    }
  });

  
  
 // add user 
  router.post("/adduser", async (req, res) => {
    // const { todo, mark } = req.body;
    try {
      const user = await userModel.create(req.body);
      console.log(user);
      res.status(200).json({ status: "success" });
    } catch (error) {
      console.log(error.message); 
      res.status(404).json({ status: "failed" });
    }
  }); 

//  update the data
router.put("/updatescore/:email", async(req,res)=>{
    console.log(req.params.email)
    console.log( req.body.score)
    const email = req.params.email
     
    try {
        const   user = await userModel.findOneAndUpdate({email},{score: req.body.score})  
        res.status(200).json({status:"success"})
        
    } catch (error) {
        console.log("problem in update")
        console.log(error.message)
        res.status(404).json({status:"failed"})
    }
  })

  

  module.exports = router


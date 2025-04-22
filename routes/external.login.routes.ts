import { Router } from "express";
import passport from "passport";

const router = Router();

// google
router.get('/google', passport.authenticate('google',{scope:['email','profile']}));
router.get('/google/callback',passport.authenticate('google',{session:false},(req,res)=>{
    res.json({user:req.user});
}));


// github

router.get('/github',passport.authenticate('github',{scope:['user.email']}));
router.get('/github/callback',passport.authenticate('github',{session:false}),(req,res)=>{
    res.json({user:req.user})
})

export default router;
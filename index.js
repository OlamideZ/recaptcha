const express = require("express");
const dotenv = require('dotenv').config()
const router = express.Router();
const app = express();
const cors = require('cors');
const axios = require('axios')
const createAssessment = require("./recaptcha");


const PORT = process.env.PORT || 2000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use("/", router);


router.post('/check', async (req, res)=>{
    const {token} = req.body;
    try {
        // const data = await createAssessment({
        //     projectID: 2,
        //     recaptchaSiteKey: process.env.SITEKEY,
        //     token,
        //     recaptchaAction: 'login'
        // })
        const data = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${token}`
            );
        console.log(data.data)
        res.status(200).json({message: 'Yea'})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Error Occured'})
    }
})
app.listen(PORT, () =>{
    console.log(`server on ${PORT}`);
});
import  {User} from '../models/user.js';

import bodyParser from 'body-parser'

import jwt from 'jsonwebtoken'

import bcrypt from 'bcrypt';

export const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        let hashPassword= await bcrypt.hash(password,10)

        let dataexits =await User.findOne({email})

        if(!dataexits)
        {
            // Save to DB
            const result = await User.create({ name, email, password:hashPassword });

                if (result) {
                    return res.status(201).json({
                        message: "Data saved successfully",
                        data: result,
                    });
                } else {
                    return res.status(500).json({
                        message: "Data not saved",
                        data: {},
                    });
                }
            
        }
        else{
            return res.status(500).json({
                message: "User Already Register",
                data: {},
            });

        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }

}

export const login =async (req,res) =>{

    const {email,password}=req.body;

    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        let dataexits =await User.findOne({email})
        //console.log(dataexits)
        if(dataexits)
        {    
            
            let validpass= await bcrypt.compare(password,dataexits.password)

            var token = jwt.sign({ dataexits:dataexits.id }, process.env.JWT);   
            
            // jwt.sign({ dataexits:dataexits.id }, privateKey, { algorithm: 'RS256' }, function(err, token) {
            //     console.log(token);
            //   });

               if (validpass) {                    
                    return res.status(201).json({
                        message: "User Login successfully",
                        token:token,
                        data:true,
                        
                    });
                } else {
                    return res.status(500).json({
                        message: "Invalid Password",
                        data: false,
                    });
                }
            
        }
        else{
            return res.status(500).json({
                message: "User Not Found",
                data: false,
            });

        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }



}

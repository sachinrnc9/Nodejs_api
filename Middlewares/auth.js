
import jwt from 'jsonwebtoken'

import { User } from '../models/user.js';

export const isAuthenticated = async (req, res, next)=>{

    const token = req.header('Auth');
    //console.log("token",token);
    try {

        if(token)
        {
            const decoded=  jwt.verify(token,"shhhhh")

            //console.log("verify=",decoded);

            const reqid= decoded.dataexits;

            //console.log("id=",reqid);

            let userdata = await User.findById(reqid);

            if(userdata)
            {
                // return res.json({
                //     message:"user found",
                //     status:200,
                //     data:true
                // })

                req.userdata=userdata;
                next();
            }
            else
            {

                return res.json({
                    message:"user not found",
                    status:400,
                    data:false
                })

            }           

        }
        else
        {
            return res.json({
                message:"First Login yourself",
                status:500,
                data:false
            })
        }
        
    } catch (error) {

        return res.json({
            message:"Server error",
            status:500,
            data:false
        })
        
    }

}

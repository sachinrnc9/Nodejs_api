
import { Contact } from "../models/contact.js";

import bodyParser from "body-parser";

import bcrypt from 'bcrypt'

//new contact entry
export const newContact =async (req,res)=>{
    try {
        const { name, email, phone , type } = req.body;

        //console.log(req.body);

        // Validate required fields
        if (!name || !email || !phone || !type ) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }        

        let dataexits =await Contact.findOne({email})

        if(!dataexits)
        {
            // Save to DB
            const result = await Contact.create({ name, email, phone, type,user:req.userdata });

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


//fetch all contact list

export const fetchContact =async (req,res)=>{

    try {

        const result= await Contact.find();

        if(result)
        {
            res.json({
                message:"Data found",
                status:200,
                data:result
            })
        }
        else{

            res.json({
                message:"Data Not found",
                status:400,
                data:false
            })

        }
        
    } catch (error) {


        res.json({
            message:"Server error",
            status:500,
            data:false
        })

        
    }
    



}

//fetch data from cotact table by id

export const fetchDatabyId= async (req, res)=>{

    try {

        const reqid= req.params.id;

        if(reqid)
        {
            const result= await Contact.findById(reqid);

            if(result)
            {
                res.json({
                    message:"Data Found",
                    status:200,
                    data:result,
                })
            }

        }
        else
        {
            res.json({
                message:"ID required",
                status:500,
                data:false
            })
        }


        
    } catch (error) {

        res.json({
            message:"server error",
            status:500,
            data:false
        })
        
    }

}

//update contact by id

export const updateConatctById= async (req, res)=>{

    try {

        const reqid= req.params.id;

        const {name , type , email , phone}= req.body;

        if(reqid)
        {
            const result= await Contact.findByIdAndUpdate(reqid,{
                name,email,phone,type
            },{new:true});

            if(result)
            {
                res.json({
                    message:"Data UDpated",
                    status:200,
                    data:result,
                })
            }
            else
            {
                res.json({
                    message:"Data not Updated",
                    status:500,
                    data:false
                })
            }

        }
        else
        {
            res.json({
                message:"ID required",
                status:500,
                data:false
            })
        }


        
    } catch (error) {

        res.json({
            message:"server error",
            status:500,
            data:false
        })
        
    }

}

//delete contact by id

export const DeleteConatctById= async (req, res)=>{

    try {

        const reqid= req.params.id;      

        if(reqid)
        {
            const result= await Contact.findByIdAndDelete(reqid);             

            if(result)
            {
                res.json({
                    message:"Data Deleted",
                    status:200,
                    data:true,
                })
            }
            else
            {
                res.json({
                    message:"Data not Deleted",
                    status:500,
                    data:false
                })
            }

        }
        else
        {
            res.json({
                message:"ID required",
                status:500,
                data:false
            })
        }


        
    } catch (error) {

        res.json({
            message:"server error",
            status:500,
            data:false
        })
        
    }

}


//get contact by userid

export const getDatabyUserId= async (req, res)=>{

    try {

        const reqid= req.params.id;

        if(reqid)
        {
            const result= await Contact.find({user:reqid});

            if(result)
            {
                res.status(201).json({
                    message:"Data Found",
                    status:200,
                    data:result,
                })
            }

        }
        else
        {
            res.status(400).json({
                message:"ID required",
                status:500,
                data:false
            })
        }


        
    } catch (error) {

        res.json({
            message:"server error",
            status:500,
            data:false
        })
        
    }

}






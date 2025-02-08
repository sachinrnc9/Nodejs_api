import express from "express";

import {
  newContact,
  fetchContact,
  fetchDatabyId,
  updateConatctById,
  DeleteConatctById,
  getDatabyUserId,
} from "../controllers/contact.js";

import { isAuthenticated } from "../Middlewares/Auth.js";

const router = express.Router();

router.post("/new", isAuthenticated,newContact);

router.get("/fetchdata", fetchContact);

router.get("/fetchbyid/:id", fetchDatabyId);

router.put("/updatebyid/:id", isAuthenticated,updateConatctById);

router.delete("/deletebyid/:id", isAuthenticated,DeleteConatctById);

router.get("/getcontact_byuserid/:id", getDatabyUserId);

export default router;

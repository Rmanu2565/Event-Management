import express from "express"
import { createEventController, deleteEventController, getEventController, getSingleEventController, updateEventController, updateStatusController } from "./event.controller.js";
import upload from "../../../middleware/multer.js";
import { validateAdmin, validateAdminOrganizer, validateAny, validateOrganizer } from "../../../middleware/token.js";

const router = express.Router()


router.post("/createEvent", upload.single("banner"), validateOrganizer, createEventController)
router.get("/getEvent", validateAny, getEventController)
router.get("/getSingleEvent/:id", validateAny, getSingleEventController)
router.put("/updateEvent/:id", validateOrganizer, updateEventController)
router.delete("/deleteEvent/:id", validateAdminOrganizer, deleteEventController)
router.put("/updateStatus/:id/:status", validateAdmin, updateStatusController)



export default router;
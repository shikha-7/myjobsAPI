const express = require("express");
const router = express.Router();


const { createJob, viewAllJob, viewSingleJob, updateJob, deleteJob } = require("../controller/jobcontroller")



router.route("/").get(viewAllJob).post(createJob);
router.route("/:id").get(viewSingleJob).patch(updateJob).delete(deleteJob);



module.exports = router;
const jobSchema = require("../models/jobschema");
const { StatusCodes } = require("http-status-codes");

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const jobs = await jobSchema.create(req.body);
    res.status(StatusCodes.CREATED).json({ jobs });

}

const viewAllJob = async (req, res) => {

    const jobs = await jobSchema.find({ createdBy: req.user.userId }).sort('createdAt');
    res.status(StatusCodes.OK).json({ count: jobs.length, jobs });
}

const viewSingleJob = async (req, res) => {
    const {
        user: { userId },
        params: { id: jobId }
    } = req;

    const jobs = await jobSchema.findOne({
        _id: jobId,
        createdBy: userId
    });

    if (!jobs) {
        res.status(StatusCodes.NOT_FOUND).json({ msg: `No job with Id ${jobId}` })
    }
    res.status(StatusCodes.OK).json({ jobs })

}

const updateJob = async (req, res) => {


    const {
        body: { company, postion },
        user: { userId },
        params: { id: jobId }
    } = req;

    if (company === '' || postion === '') {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: `company and position fileds can not be empty` })
    }
    const job = await jobSchema.findByIdAndUpdate({ _id: jobId, createdBy: userId }, req.body, { new: true })
    if (!job) {
        res.status(StatusCodes.NOT_FOUND).json({ msg: `no job with id ${jobId}` })
    }
    res.status(StatusCodes.OK).json({ job })
}

const deleteJob = async (req, res) => {
    const {
        user: { userId },
        params: { id: jobId }
    } = req;

    const job = await jobSchema.findByIdAndRemove({ _id: jobId, createdBy: userId });
    if (!job) {
        res.status(StatusCodes.NOT_FOUND).json({ msg: `No job with Id ${jobId}` })
    }
    res.status(StatusCodes.OK).send();

}

module.exports = { createJob, viewAllJob, viewSingleJob, updateJob, deleteJob };
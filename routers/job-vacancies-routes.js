const express = require("express");

// const jobVacanciesControllers = require("../controllers/job-vacancies-controllers");
const jobVacanciesControllers = require("../controllers/job-vacancies-controllers");
const router = express.Router();

router.get("/", jobVacanciesControllers.getJobVacanciesDashboard);
router.get("/vacancies", jobVacanciesControllers.getJobVacancies);
router.get("/vacancies/:jid", jobVacanciesControllers.getJobVacanciesBySource);

module.exports = router;

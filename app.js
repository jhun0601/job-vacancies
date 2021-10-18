const PORT = process.env.PORT || 8000;

const jobVacanciesRoutes = require("./routers/job-vacancies-routes");

const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.json({ title: "Welcome to Job vacancies" });
});

app.use("/api/jobs/", jobVacanciesRoutes);

app.listen(PORT, () => console.log(`Running on PORT ${PORT}`));

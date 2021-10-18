const PORT = process.env.PORT || 8000;

const jobVacanciesRoutes = require("./routers/job-vacancies-routes");

const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.json({ title: "Welcome to Job vacancies" });
});

app.use("/api/jobs/", jobVacanciesRoutes);
process.once("SIGUSR2", function () {
  process.kill(process.pid, "SIGUSR2");
});

process.on("SIGINT", function () {
  // this is only called on ctrl+c, not restart
  process.kill(process.pid, "SIGINT");
});
app.listen(PORT, () => console.log(`Running on PORT ${PORT}`));

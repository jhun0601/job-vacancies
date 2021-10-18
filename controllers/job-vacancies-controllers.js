const axios = require("axios");
const cheerio = require("cheerio");

const { response } = require("express");

let vacancies = [
  {
    source: "jobs180",
    href: "https://www.jobs180.com/search",
    title: "Jobs180.com Incorporated",
    base_url: "",
    class: ".results-position",
  },
  {
    source: "jora",
    href: "https://ph.jora.com/j?sp=search&q=&l=",
    title: "Jora",
    base_url: "https://ph.jora.com",
    class: ".job-title",
  },
];
const jobVacancies = [];
vacancies.forEach((vacancy) => {
  axios.get(vacancy.href).then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);

    $(vacancy.class, html).each(function () {
      const title = $(this).find("a").text();
      const url = $(this).find("a").attr("href");

      jobVacancies.push({
        title,
        url: vacancy.base_url + url,
      });
    });
  });
});
const getJobVacancies = (req, res) => {
  res.json(jobVacancies);
};
const getJobVacanciesDashboard = (req, res) => {
  res.status(200).json({ title_page: "Job Vacancies Dashboard" });
};
const getJobVacanciesBySource = (req, res) => {
  const vacancyId = req.params.jid;

  const vacancy = vacancies.filter(
    (vacancy) => vacancy.source === vacancyId
  )[0];

  axios
    .get(vacancy.href)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);

      const specificArticles = [];

      $(vacancy.class, html).each(function () {
        const title = $(this).find("a").text();
        const url = $(this).find("a").attr("href");

        specificArticles.push({
          title,
          url,
        });
      });
      res.json(specificArticles);
    })
    .catch((err) => console.log(err));
};

exports.getJobVacancies = getJobVacancies;
exports.getJobVacanciesDashboard = getJobVacanciesDashboard;
exports.getJobVacanciesBySource = getJobVacanciesBySource;

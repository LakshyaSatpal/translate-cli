const axios = require("axios");

const axiosInstance = axios.create({
  baseURL: process.env.TRANSLATE_BASE_URL,
  headers: {
    "content-type": "application/x-www-form-urlencoded",
    "Accept-Encoding": "application/gzip",
    "X-RapidAPI-Key": process.env.GOOGLE_TRANSLATE_API_KEY,
    "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
  },
});

const detectLanguage = (sentence) => {
  const data = new URLSearchParams();
  data.append("q", sentence);
  const response = axiosInstance.post("/detect", data);
  return response;
};

const translateLanguage = async (sentence, target, source) => {
  const data = new URLSearchParams();
  data.append("q", sentence);
  data.append("target", target);
  data.append("source", source);
  const response = axiosInstance.post("", data);
	return response;
};

module.exports = {
  axiosInstance,
  detectLanguage,
  translateLanguage,
};

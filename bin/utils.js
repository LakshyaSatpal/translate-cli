const languages = require("../lib/languages.js");
const chalk = require("chalk");

const parseSentence = (words) => {
  let sentence = "";
  words.forEach((word) => {
    sentence += word + " ";
  });
  return sentence;
};

const showHelp = () => {
  const usage = "\nUsage: tran <lang_name> sentence to be translated";
  console.log(usage);
  console.log("\nOptions:\r");
  console.log(
    "\t--version\t      " + "Show version number." + "\t\t" + "[boolean]\r"
  );
  console.log(
    "    -l, --languages\t" +
      "      " +
      "List all languages." +
      "\t\t" +
      "[boolean]\r"
  );
  console.log("\t--help\t\t      " + "Show help." + "\t\t\t" + "[boolean]\n");
};

const showAll = () => {
  console.log(chalk.magenta.bold("\nLanguage Name\tISO-639-1 Code\n"));
  for (let [key, value] of languages) {
    console.log(key + "\t\t" + value + "\n");
  }
};

const parseLanguage = (language) => {
  if (language.length == 2) return language;
  else if (languages.has(language)) return languages.get(language);
  else console.error("Sorry! Language not supported");
};

module.exports = {
  parseSentence,
  parseLanguage,
  showHelp,
  showAll,
};

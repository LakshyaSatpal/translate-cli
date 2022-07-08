#!/usr/bin/env node
require("dotenv").config();
const chalk = require("chalk");
const boxen = require("boxen");
const yargs = require("yargs");
const { translateLanguage } = require("./api.js");

const {
  parseSentence,
  showHelp,
  showAll,
  parseLanguage,
} = require("./utils.js");

const usage = chalk.hex("#83aaff")(
  "\nUsage: tran <lang_name> <sentence_to_be_translated>"
);
const options = yargs
  .usage(usage)
  .option("l", {
    alias: "languages",
    describe: "List all supported languages",
    type: "boolean",
    demandOption: false,
  })
  .help(true).argv;

if (yargs.argv._[0] == null) {
  showHelp();
}

if (yargs.argv._[0]) {
  let language = yargs.argv._[0].toLowerCase();
  language = parseLanguage(language);
  const sentence = parseSentence(yargs.argv._.slice(1));
  if (sentence === "") {
    console.error(
      chalk.red("\nThe entered sentence is like John Cena, I can't see it!\n")
    );
    console.log("Enter tran --help to get started.\n");
  } else {
    translateLanguage(sentence, language, "en")
      .then((response) => {
        console.log(
          "\n" +
            boxen(
              chalk.green(
                "\n" + response.data.data.translations[0].translatedText + "\n"
              ),
              {
                padding: 2,
                borderColor: "green",
                dimBorder: true,
              }
            )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

if (yargs.argv.l == true || yargs.argv.languages == true) {
  showAll();
}

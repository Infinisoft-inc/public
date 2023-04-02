require('dotenv').config();
const SpecificationAnalysisSkill = require("./SpecificationAnalysisSkill");
const { ConsoleMessageSource } = require("./ConsoleMessageSource");
const APIKEY = process.env.OPENAI;

// Instantiate the ConsoleMessageSource
const consoleMessageSource = new ConsoleMessageSource();

// Create the SpecificationAnalysisSkill with the ConsoleMessageSource
const specificationAnalysisSkill = new SpecificationAnalysisSkill(APIKEY, consoleMessageSource);
specificationAnalysisSkill.run();

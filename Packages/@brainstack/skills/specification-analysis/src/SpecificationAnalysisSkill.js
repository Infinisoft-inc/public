const { Skill } = require("@brainstack/framework");
const InformationGatheringTask = require("./InformationGatheringTask");

class SpecificationAnalysisSkill extends Skill {
  constructor(apiKey, messageSource, scenario) {
    super();
    this.informationGatheringTask = new InformationGatheringTask(apiKey, scenario);
    this.tasks = [this.informationGatheringTask]
    this.messageSource = messageSource;
  }

  async run() {
    // Start the conversation
    await this.messageSource.sendMessage("Starting conversation...");

    // Execute the InformationGatheringTask
    let userMessage = await this.messageSource.receiveMessage();
    while (userMessage !== "quit") {
      const output = await this.informationGatheringTask.run(userMessage);
      await this.messageSource.sendMessage("AI response: " + output.response);
      userMessage = await this.messageSource.receiveMessage();
    }

    // End the conversation
    await this.messageSource.sendMessage("Ending conversation...");
  }
}

module.exports = SpecificationAnalysisSkill;

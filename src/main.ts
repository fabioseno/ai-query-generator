import { OllamaProvider } from "./ollama-provider";

export enum LogMode {
  LogAll,
  None
}

class Test {
  private ollamaProvider;

  constructor() {
    this.ollamaProvider = new OllamaProvider(LogMode.None);
  }

  async execute() {
    await this.ollamaProvider.generateQuery('How many drivers are in the table?');
    await this.ollamaProvider.generateQuery('Return drivers from location "New York" that have 100% success rate and more than 50 completed jobs');
    await this.ollamaProvider.generateQuery('Return drivers from location "Seattle" that have 0 completed jobs');
    await this.ollamaProvider.generateQuery('Return drivers with less than 5 orders per week');
  }
}


const test = new Test();
test.execute();
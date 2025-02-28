import axios from "axios";
import chalk from 'chalk';
import { LogMode } from "./main";
import { Prompt } from "./prompt";

export class OllamaProvider {
    private readonly ollamaEndpoint = 'http://localhost:11434/api';
    private promptModel = 'deepseek-coder:1.3b';
    // private promptModel = 'sqlcoder:7b';

    constructor(public readonly logMode: LogMode = LogMode.None) { }

    async generateQuery(question: string): Promise<string> {
        const prompt = {
            "model": this.promptModel,
            "stream": false,
            "prompt": await Prompt.getQueryConverterPromptTemplate(question)
        };

        console.log(chalk.green('\nPrompt:', chalk.bgGreen(question)));

        const query = await axios.post(`${this.ollamaEndpoint}/generate`, prompt)
            .then((response: any) => {
                return response.data.response as string;
            })
            .catch((error: any) => {
                console.error('Error making the HTTP request:', error.response.data.error);
                return '';
            });

        console.log(chalk.yellow(query));

        return query;
    }
}
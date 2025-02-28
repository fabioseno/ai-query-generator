import { readFile } from 'node:fs/promises';

export class Prompt {
    private static readonly promptsFolder = './prompts'
    private static files = {
        queryConverter: `${this.promptsFolder}/query-converter.md`
    }

    static async getQueryConverterPromptTemplate(prompt: string) {
        const template = await readFile(this.files.queryConverter, 'utf-8');
        return template.replaceAll('{prompt}', prompt);
    }
}
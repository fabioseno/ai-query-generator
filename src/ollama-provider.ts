import axios from "axios";
import chalk from 'chalk';
import { LogMode } from "./main";

export class OllamaProvider {
    private readonly ollamaEndpoint = 'http://localhost:11434/api';
    private promptModel = 'deepseek-coder:1.3b';
    // private promptModel = 'sqlcoder:7b';

    constructor(public readonly logMode: LogMode = LogMode.None) { }


    async generateQuery(question: string): Promise<string> {
        const prompt = {
            "model": this.promptModel,
            "stream": false,
            "prompt": `
        ### System:
        You are an assistant that will generate dynamic PostgreSQL queries based on user input. 
        

        ### Instructions:
        Your task is to convert a question into a SQL query, given a Postgres database schema.
        Adhere to these rules:
        - do not add any extra comments or formatting, just spit out the plain SQL queries.
        - **Deliberately go through the question and database schema word by word** to appropriately answer the question
        - **Use Table Aliases** to prevent ambiguity. For example, \`SELECT table1.col1, table2.col1 FROM table1 JOIN table2 ON table1.id = table2.id\`.
        - When creating a ratio, always cast the numerator as float
        
        
        ### Input:
        Generate a SQL query that answers the question ${question}.
        This query will run on a database whose schema is represented in this string:

        \`\`\`
        CREATE TABLE driver (
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            location VARCHAR(255) NOT NULL,
            onboard_date timestamp NOT NULL,
            total_jobs smallint NOT NULL,
            success_rate decimal NULL,
            acceptance_rate decimal NULL,
            cancellation_rate decimal NULL,
            ontime_rate decimal NULL,
            late_delivery_coun smallint NULL,
            average_order_cost decimal NULL,
            order_rejection_count smallint NULL,
            orders_per_week smallint NULL,
            response_time_to_offer_seconds int NULL
        );
        \`\`\`
        
        ### Response:
        
        `
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
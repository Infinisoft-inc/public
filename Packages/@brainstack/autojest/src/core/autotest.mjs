import dotenv from 'dotenv';
dotenv.config();
import j from 'jest';
import { Configuration, OpenAIApi } from 'openai';
import fs from 'fs';
import path from 'path';
const runCLI = j.runCLI
const openai = new OpenAIApi(new Configuration({ apiKey: "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" }));

export const run = async () => {
    const config = {
        // preset: 'jest',
        testEnvironment: 'node',
        roots: ['<rootDir>/src'],
        testMatch: ['**/__tests__/**/*.+(mjs|js)', '**/?(*.)+(spec|test).+(js|mjs)'],
        // transform: {
        //     '^.+\\.(ts|tsx)$': 'ts-jest',
        // },
        moduleFileExtensions: ['mjs','js', 'jsx', 'json', 'node'],
    };

    const jestConfig = {
        _: [],
        $0: '',
        config: JSON.stringify(config),
    };

    try {
        const result = await runCLI(jestConfig, [process.cwd()]);
        if (result.results.numFailedTests > 0 || result.results.numFailedTestSuites > 0) {
            console.error('Tests failed');
            const failedTests = getFailedTests(result.results.testResults);
            console.error(JSON.stringify(failedTests));

            // New code: Iterate through failed tests and call GPT-4 for help
            for (const failedTest of failedTests) {
                const scenario = []; // Define the initial conversation scenario if needed
                const gpt4Response = await askGpt4ToFixTest(scenario, failedTest);
                console.log('GPT-4 response:', gpt4Response.response);
            }
        } else {
            console.log('All tests passed');
        }
    } catch (error) {
        console.error('Error running Jest:', error);
    }

    function getFailedTests(testFiles, index = 0, failedTests = []) {
        if (index >= testFiles.length) {
            return failedTests;
        }

        if (testFiles[index].numFailingTests > 0) {
            const decodedMessage = Buffer.from(testFiles[index].failureMessage).toString('utf8');
            testFiles[index].failureMessage = decodedMessage.replace(/\u001b\[\d+m/g, '');

            testFiles[index].testResults.forEach((testResult) => {
                if (testResult.failureMessages && testResult.failureMessages.length > 0) {
                    testResult.failureMessages = testResult.failureMessages.map((message) => {
                        return message.replace(/\u001b\[\d+m/g, '');
                    });

                    const fullErrorMessage = testResult.failureMessages[0];
                    const testFilePath = testFiles[index].testFilePath;

                    failedTests.push({
                        testFilePath,
                        fullErrorMessage,
                    });
                }
            });
        }

        return getFailedTests(testFiles, index + 1, failedTests);
    }

    function countTokens(text) {
        const tokens = text.split(/\s+/);
        return tokens.length;
    }

    function truncateTokens(text, maxTokens) {
        const tokens = text.split(/\s+/);
        if (tokens.length <= maxTokens) {
            return text;
        }

        const truncatedTokens = tokens.slice(0, maxTokens);
        const truncatedText = truncatedTokens.join(' ');
        return truncatedText;
    }

    function extractFixedCode(response) {
        const fixedCodeRegex = /BEGIN_FIXED_CODE([\s\S]*?)END_FIXED_CODE/;

        const match = response.match(fixedCodeRegex);
        if (match && match[1]) {
            return match[1].trim();
        } else {
            return null;
        }
    }

    async function askGpt4ToFixTest(scenario, failedTest) {
        const testFilePath = failedTest.testFilePath;
        let testFileContent;

        try {
            testFileContent = await fs.promises.readFile(testFilePath, { encoding: 'utf-8' });
        } catch (error) {
            console.error(`Error reading test file: ${testFilePath}`, error);
            return { response: 'Error occurred while reading the test file.' };
        }

        // Truncate the test file content if it exceeds the token limit (e.g., 4096 tokens for GPT-3)
        // You may need to adjust the limit for GPT-4.
        const maxTokens = 4096;
        if (countTokens(testFileContent) > maxTokens) {
            testFileContent = truncateTokens(testFileContent, maxTokens);
        }

        const input = `I have a failing unit test with the following error message and source code:

        Error message:
        ${failedTest.fullErrorMessage}
    
        Test file path:
        ${failedTest.testFilePath}
    
        Test file content:
        ${testFileContent}
    
        Please provide a fixed version of the code, starting with "BEGIN_FIXED_CODE" and ending with "END_FIXED_CODE".`;

        const result = await askBrain(scenario, input);
        const fixedCode = extractFixedCode(result.response);

        if (fixedCode) {
            try {
                await fs.promises.writeFile(testFilePath, fixedCode, { encoding: 'utf-8' });
                console.log(`Fixed code saved to ${testFilePath}`);
            } catch (error) {
                console.error(`Error writing fixed code to file: ${testFilePath}`, error);
                return { response: 'Error occurred while writing the fixed code to the file.' };
            }
        } else {
            console.log('GPT-4 did not provide a fixed code');
        }

        return result;
    }

    async function askBrain(scenario, input) {
        let messages = scenario;
        try {
            const response = await openai.createChatCompletion({
                model: 'gpt-4',
                messages: messages.concat([{ role: 'user', content: input }]),
            });

            console.log(response);
            const aiResponse = (response.data.choices?.[0]?.message?.content ?? '').trim();
            messages.push({ role: 'assistant', content: aiResponse });

            return { response: aiResponse };
        } catch (error) {
            console.error('Error:', error);
            return { response: 'Error occurred while processing your request.' };
        }
    }
};

run()
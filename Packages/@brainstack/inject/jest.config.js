// jest.config.js
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/__tests__/',
    ],
    testMatch: ['**/__tests__/index.test.ts'],
    transform: {
        // '^.+\\.[tj]sx?$' to process ts,js,tsx,jsx with `ts-jest`
        // '^.+\\.m?[tj]sx?$' to process ts,js,tsx,jsx,mts,mjs,mtsx,mjsx with `ts-jest`
        '^.+\\.tsx?$': [
            'ts-jest',
            {
                babelConfig: true,
            },
        ],
    },
}
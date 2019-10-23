module.exports = {
    setupFilesAfterEnv: ['jest-enzyme'],
    testEnvironment: 'enzyme',
    testEnvironmentOptions: {
        enzymeAdapter: 'react16',
    },
    moduleNameMapper: {
        '\\.(css|scss)$': '<rootDir>/node_modules/jest-css-modules',
    },
    transformIgnorePatterns: ['/node_modules/(?!itas-ui).+\\.js$'],
    globals: {
        PUBLIC_URL: '',
    },
    coverageThreshold: {
        global: {
            // Set coverage threshold defined for a project
            // statements: 90,
            // branches: 90,
            // functions: 90,
            // lines: 90,
        },
    },
    reporters: [
        'default',
        ['jest-junit', { outputName: 'reports/UnitTestReport.xml' }],
    ],
};

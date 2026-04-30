/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/e2e/', '<rootDir>/__tests__/mocks/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/app/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
    '!app/**/*.d.ts',
    '!app/**/layout.{js,jsx,ts,tsx}',
    '!app/**/page.{js,jsx,ts,tsx}',
  ],
  transform: {
    '^.+\\.(tsx|ts|js|jsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
};

module.exports = config;

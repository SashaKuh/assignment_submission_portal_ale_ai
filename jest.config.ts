import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',  // шляхи до вашого проекту Next.js
});

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // закоментуйте або видаліть цей рядок, якщо не використовуєте файл setup
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',  // додайте це для підтримки TypeScript
  },
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],  // додаємо, щоб ігнорувати певні каталоги
};

export default createJestConfig(config);

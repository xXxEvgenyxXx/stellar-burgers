module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@ui/(.*)$': '<rootDir>/src/components/ui/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@utils-types/(.*)$': '<rootDir>/src/utils/types/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@ui-pages/(.*)$': '<rootDir>/src/components/ui/pages/$1',
  },
  moduleFileExtensions: [
    'js',
    'jsx',
    'ts',
    'tsx',
  ],
  // Убираем setupFilesAfterEnv если файл jest.setup.ts не создан
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/cypress/',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};

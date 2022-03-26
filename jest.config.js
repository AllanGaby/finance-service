module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**',
    '!**/data/**/protocols/**',
    '!**/config/**',
    '!**/main/application/**',
    '!**/index.ts',
    '!**/server.ts',
    '!**/**type.ts',
    '!**/memory/**.ts',
    '!**/**migration.ts',
    '!**/**.d.ts',
    '!**/**.constants.ts',
    '!**/**.dto.ts',
    '!**/**.entity.ts',
    '!**/**.error.ts',
    '!**/**.filter.ts',
    '!**/**.factory.ts',
    '!**/**.mock.ts',
    '!**/**.schema.ts',
    '!**/**.path.ts',
    '!**/**.seeds.ts',
    '!**/**.setup.ts',
    '!**/connection.ts',
    '!**/create-token.ts'
  ],
  testResultsProcessor: 'jest-sonar-reporter',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  }
}

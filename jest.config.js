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
    '!**/infrastructure/**/memory/**.ts',
    '!**/**migration.ts',
    '!**/**.constants.ts',
    '!**/**.d.ts',
    '!**/**.dto.ts',
    '!**/**.entity.ts',
    '!**/**.error.ts',
    '!**/**.filter.ts',
    '!**/**.factory.ts',
    '!**/**.helper.ts',
    '!**/**.mock.ts',
    '!**/**.order.ts',
    '!**/**.path.ts',
    '!**/**.schema.ts',
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

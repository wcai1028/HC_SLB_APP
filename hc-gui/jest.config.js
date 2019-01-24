module.exports = {
  bail: false,
  testEnvironment: 'jsdom',
  testURL: 'http://localhost/',
  roots: ['./src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  setupTestFrameworkScriptFile: '<rootDir>/config/jest/jestSetupScript.ts',
  setupFiles: ['./config/jest/test-shim.tsx'],
  testRegex: '.*__tests__.*test\\.(tsx|ts)$',
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    'rc-animate': '<rootDir>/config/jest/fileMock.js',
    '\\.svg$': '<rootDir>/config/jest/fileMock.js',
    'src/(.*)$': '<rootDir>/src/$1',
    '^public/(.*)$': '<rootDir>/public/$1',
    // 'a10-gui-widgets': '<rootDir>/config/jest/a10GuiWidgets.tsx',
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/hc-gui-target/',

    // FIXME
    '/src/containers/Launchers/ADC/Common/VPortList/',
    '/src/containers/Launchers/ADC/Common/DeployedServerList/',
    '/src/containers/Launchers/ADC/ObjectExplorer/AppServiceGroup/AppServiceGroupForm/',
    '/src/containers/Launchers/ADC/Common/DeployedServiceGroupList/',
    '/src/containers/Launchers/ADC/Common/ServerList/',
    '/src/containers/Launchers/ADC/ObjectExplorer/AppServiceForm/',
    '/src/containers/Launchers/ADC/Common/DeployedVIPList',
    '/src/containers/Controller/Controller/Controller.tsx',
    '/src/containers/Controller/Dashboard/Common/ProviderGaugeBar/',
    '/src/containers/Controller/Dashboard/Common/PullUpViewer',
    '/src/containers/Controller/Services/AppServices/',
    '/src/containers/Controller/Organization/Users/',
    '/src/containers/Controller/Apps/',
    '/src/containers/Controller/__tests__/',
    '/src/containers/Controller/Organization/Tenants/',
    '/src/containers/Controller/Infrastructure/Clusters/Cluster/Devices/Device/Partitions/Partition/Forms/PartitionAddForm/',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  verbose: true,
  globals: {
    'ts-jest': {
      // skipBabel: true,
    },
  },
  reporters: [
    'default',
    [
      'jest-junit',
      {
        usePathForSuiteName: 'true',
        output: './reports/testcase/unit/junit.xml',
        classNameTemplate: vars => {
          let packageName = vars.filepath
            .replace(/\//g, '.')
            .replace(/\\/g, '.')
          packageName = packageName.substring(
            0,
            packageName.indexOf('__tests__'),
          )
          return `UnitTest${packageName}${vars.filename.substring(
            0,
            vars.filename.indexOf('.'),
          )}`
        },
      },
    ],
  ],
  collectCoverage: true,
  coverageDirectory: './reports/coverage',
  coverageReporters: ['text-summary', 'html', 'cobertura'],
  collectCoverageFrom: ['!**/*.d.ts', '**/*.{js,jsx,ts,tsx}'],
  coveragePathIgnorePatterns: ['/node_modules/', '/__tests__/', '/__mocks__/'],
}

module.exports = {
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['<rootDir>/src/test/setupTests.ts'],
	moduleNameMapper: {
		'^@ionic/react$': '<rootDir>/src/test/mocks/ionicReactMock.tsx',
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy',
	},
	transform: {
		'^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
	},
	testMatch: ['**/?(*.)+(test).[tj]s?(x)'],
};

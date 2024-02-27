module.exports = {
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.svg$': 'react-svg-transformer',
    '^.+\\.css$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: [
    "/node_modules/(?!.*\\.(js|jsx|ts|tsx|css|json)$)",
    "^.+\\.svg$"
  ],
};

module.exports = {
  'front/*.{js,jsx,ts,tsx}': ['eslint --fix', 'eslint'],
  'front/**/*.ts?(x)': () => 'npm run build-types',
  'front/*.json': ['prettier --write'],
};

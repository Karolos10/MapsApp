
const {writeFileSync, mkdirSync} = require('fs');

require('dotenv').config();

const targetPath = './src/environments/environment.ts';
const targetPathDev = './src/environments/environment.development.ts';

const mapboxkey = process.env['MAPBOX_KEY']

if(!mapboxkey) {
  throw new Error('MAPBOX_KEY is not set in .env file');
}

const envFileContent = `
export const environment = {
  mapboxKey: "${mapboxkey}",
};
`;

mkdirSync('./src/environments', { recursive: true });

writeFileSync(targetPath, envFileContent);
writeFileSync(targetPathDev, envFileContent);

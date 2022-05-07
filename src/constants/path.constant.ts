import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const myPath = path.resolve(__dirname, '.');
const boilerplatePath = path.resolve(myPath, '../../boilerplate');
const wspPath = path.resolve(process.cwd(), '.');

export const MY_PATH = myPath;
export const BOILERPLATE_PATH = boilerplatePath;
export const WSP_PATH = wspPath;

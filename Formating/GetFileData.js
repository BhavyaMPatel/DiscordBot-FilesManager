import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { readFileSync } from 'fs'

const modulePath = dirname(fileURLToPath(import.meta.url))

function GetFileData(filename){
    return readFileSync(filename);
}

export default GetFileData;
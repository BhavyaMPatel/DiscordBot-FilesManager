import { readFileSync } from "fs";

function GetFileData(filepath){
    return readFileSync(filepath);
}

export default GetFileData;
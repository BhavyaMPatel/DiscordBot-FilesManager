
/*
 index.js
 Created On 10/12/2023
*/
import {client,initialLogin} from "./client.js"
import UploadFile from "./DiscordAPI/UploadFile.js";
initialLogin();
UploadFile("hi.txt")
























// client.on("messageCreate", async (message)=>{
//     console.log(message.content);
//     console.log(message.channel);
//     message.channel.send("hi to u also");
// })
// fetchMessage();
// client.on("ready",(message)=>{
//     message.channels.cache.clear();
//     // message.send("h")
// })  




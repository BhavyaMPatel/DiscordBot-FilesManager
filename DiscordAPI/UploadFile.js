import {client} from "../client.js"
import FilenameConvert from "../Formating/FilenameConvert.js";
import GetFileData from "../Formating/GetFileData.js";
import DataToDiscordFormat from "../Formating/DataToDiscordFormat.js";
import 'dotenv/config'
import { Message } from "discord.js";

function UploadFile(FileName){
    console.log("Uploading file........");
	client.on("ready",async ()=>{
        /*ENV*/
        const guild = client.guilds.cache.get(process.env.GUILD_ID);
		const category = guild.channels.cache.get(process.env.CAT_ID);
        console.log("ENV Verifty........");
        
        /*Data Collection And Conversion*/
		const FileData=GetFileData(`${FileName}`)
        const stringData = FileData.toString("hex");
        const discordFormat = DataToDiscordFormat(stringData);

        /*File Name*/
        const FileAName=FileName.split("/").pop();
        const FileChannelName=FilenameConvert(FileAName);
        console.log("Data Collection And Conversion Done ........");

        /*Check Compatibility*/
        const sameNameFiles = guild.channels.cache.find((channel) => channel.name === FilenameConvert(FileAName));
        if (sameNameFiles) {
            console.error(`File: ${FileName} already exists.`);
            return client.destroy();
        }

        console.log("Compatibility Done........");
		const channel = await category.children.create({
            name: FileChannelName,
        });

        console.log("File Begin Upload ........");

        const promises = discordFormat.map(async (message) => {
            await channel.send(message);
        });
        
        await Promise.all(promises);
        
        console.log(`File: ${FileName} has been uploaded.`);
        client.destroy();
        
	})
}

export default UploadFile;
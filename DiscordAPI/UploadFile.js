import {client} from "../client.js"
import FilenameConvert from "../Formating/FilenameConvert.js";
import GetFileData from "../Formating/GetFileData.js";
import DataToDiscordFormat from "../Formating/DataToDiscordFormat.js";
import 'dotenv/config'

function UploadFile(FileName){
    console.log("Uploading file........");
	client.on("ready",async ()=>{
        console.log("IB");
        /*Data Collection And Conversion*/
		const FileData=GetFileData(`./${FileName}`)
        const stringData = FileData.toString("hex");
        const discordFormat = DataToDiscordFormat(stringData);
        const FileChannelName=FilenameConvert(FileName);
        console.log("Data Collection And Conversion Done ........");
        /*ENV*/
        const guild = client.guilds.cache.get(process.env.GUILD_ID);
		const category = guild.channels.cache.get(process.env.CAT_ID);
        console.log("ENV  ........");
        /*Check Compatibility*/
        const sameNameFiles = guild.channels.cache.find((channel) => channel.name === FilenameConvert(FileName));
        if (sameNameFiles) {
            console.error(`File: ${FileName} already exists.`);
            return client.destroy();
        }
        console.log("Compatibility Done........");
		const channel = await category.children.create({
            name: FileChannelName,
        });

        const promises = discordFormat.map(async (message) => {
            await channel.send(message);
        });

        await Promise.all(promises);

        console.log(`File: ${FileName} has been uploaded.`);
        client.destroy();
        console.log("Fuck Bro");
	})
}

export default UploadFile;
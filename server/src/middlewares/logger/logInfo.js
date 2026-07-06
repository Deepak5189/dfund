const Log = require("../../models/log.model")
const getCurrentContextData = require("../../utils/contextData")

const saveLogInfo = async (req, message, type, level) =>{
    try{
        let context = null;

        if(req){
            const{ip, country, city, device, deviceType} = getCurrentContextData(req);

            context = `IP: ${ip}, Country: ${country}, City: ${city}, Device Type: ${deviceType}, Device: ${device}`;

        }

        const log = new Log({
            email: req ? req.body.email : null,
            context,
            message, 
            type,
            level,
        });

        await log.save();
    }catch(error){
        console.error(`Error saving the log: ${error.stack}`);
    };
};

module.exports = {
    saveLogInfo,
};
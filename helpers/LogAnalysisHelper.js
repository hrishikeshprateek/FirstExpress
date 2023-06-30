function processSmsLog(res, arrangeBy, path) {

}

const fs = require('fs');
const time = require('../helpers/TimeHelper')

function processLog(res,arrangeBy,logFilePath) {
    console.log('started...')

    // Read the log file
    fs.readFile(logFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading log file:', err);
        }

        // Parse the JSON data
        let logEntries;

        try {
            logEntries = JSON.parse(data);
            console.log(logEntries)
        } catch (err) {
            console.error('Error parsing log file:', err);
        }

        // Process the log data
        const contactDetails = [];

        for (const entry of logEntries) {
            const { NUMBER , DURATION, NAME } = entry;

            if (NUMBER && DURATION) {
                const existingContact = contactDetails.find((contact) => contact.NUMBER === NUMBER);

                if (existingContact) {
                    existingContact.callCount++;
                    existingContact.DURATION += parseInt(DURATION);
                } else {
                    contactDetails.push({
                        NUMBER,
                        callCount: 1,
                        DURATION : parseInt(DURATION),
                        NAME : NAME
                    });
                }
            }
        }

        if (arrangeBy) {
            if (arrangeBy.toString().toLowerCase() === 'duration')
                contactDetails.sort((a, b) => b.DURATION - a.DURATION);
            else if (arrangeBy.toString().toLowerCase() === 'count')
                contactDetails.sort((a, b) => b.callCount - a.callCount);
        }


        // Find the most contacted number and calculate total talk time
        let mostContactedNumber = null;
        let maxCount = 0;
        let totalTalkTime = 0;

        for (const contact of contactDetails) {
            const { NUMBER, callCount, DURATION } = contact;

            if (callCount > maxCount) {
                mostContactedNumber = NUMBER;
                maxCount = callCount;
            }

            totalTalkTime += parseInt(DURATION);
        }

        contactDetails.forEach((contact) => {
            contact.DURATION = time.formatTime(contact.DURATION);
        });

        // Send the response
        res.json({
            mostContactedNumber,
            contactDetails,
            totalTalkTime : time.formatTime(totalTalkTime)
        });

    });

}

function processLogPhoneSpecific(res, phoneNo, logFilePath) {
    console.log('started to analyze the log for the number'+ phoneNo+' ....')

    // Read the log file
    fs.readFile(logFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading log file:', err);
        }

        // Parse the JSON data
        let logEntries;
        try {
            logEntries = JSON.parse(data);
            //console.log(logEntries)
        } catch (err) {
            console.error('Error parsing log file:', err);
        }

        // Process the log data
        const contactDetails = [];
        let name = '';
        let totalTalkTime = 0;
        let OutgoingCount = 0;
        let IncomingCount = 0;
        let MissedCallCount = 0;


        for (const entry of logEntries) {
            const { NUMBER ,CALL_DATE, CALL_TYPE, DURATION, NAME } = entry;
            if (NUMBER && DURATION && NUMBER.toString().replace(/(\+91|91)/g,'').trim() ===
                phoneNo.replace(/(\+91|91)/g,'').trim() ) {
                name = NAME;
                totalTalkTime += parseInt(DURATION)
                if (CALL_TYPE){
                    if (CALL_TYPE.toString().toLowerCase() ==='incoming') IncomingCount++;
                    else if (CALL_TYPE.toString().toLowerCase() === 'outgoing') OutgoingCount ++;
                    else if (CALL_TYPE.toString().toLowerCase() === 'missed')MissedCallCount ++;
                }
                const existingContact = contactDetails.find((contact) => contact.CALL_DATE === time.convertDateStringToDDMMYYYY(CALL_DATE));

                if (existingContact){
                    existingContact.CALL_COUNT ++
                    existingContact.DURATION += parseInt(DURATION)
                }else contactDetails.push({
                    CALL_DATE : time.convertDateStringToDDMMYYYY(CALL_DATE),
                    CALL_COUNT : 1,
                    DURATION : parseInt(DURATION)
                })
            }
        }

        contactDetails.forEach((contact) => {
            contact.DURATION = time.formatTime(contact.DURATION);
        });

        // Send the response
        res.json([{
            QueryNumber : phoneNo,
            NameSaved : name,
            TotalTalkTime : time.formatTime(totalTalkTime),
            OutgoingCount : OutgoingCount,
            IncomingCount : IncomingCount,
            MissedCount : MissedCallCount,
            TotalRecordDays : contactDetails.length
        },
            contactDetails,
        ]);

    });
}

module.exports = {
    processLog,
    processLogPhoneSpecific,
    processSmsLog
}
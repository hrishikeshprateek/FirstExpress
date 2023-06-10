const express = require('express');
const multer = require('multer');
const Users = require("../../schema/user");
const fs = require('fs');
const time = require('../../helpers/TimeHelper')

const publicDataHelper = require('../../helpers/PublicDataHelper')
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.get('/menu/getAll', (req, res) => {
    publicDataHelper.getAllMenuItems(req.query.size,res)
})

router.get('/post',(req, res) =>{
    res.send('hi rom post')
})

router.get('/menu/categories',(req, res) =>{
    publicDataHelper.getAllCategories(res)
})

router.get('/menu/dealOfTheDay', (req, res) =>{
    publicDataHelper.getDealOfTheDay(res)
})

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
            //console.log(logEntries)
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

router.post('/logs/analyze', upload.single('logFile'), (req, res) => {
    // Access the uploaded file using req.file
    const file = req.file
    console.log(req.file)
    if (file){
        if (!file.originalname.toString().endsWith('.json')) res.json({error : 'not a valid supported log file type, try uploading a valid .json log file.'})
        else processLog(res, req.query.arrangeBy, file.path)
    }else res.json({error : 'failed to get a valid log file'})
});

module.exports = router;
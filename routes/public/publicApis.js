const express = require('express');
const multer = require('multer');
const logAnalyser = require('../../helpers/LogAnalysisHelper')
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
    publicDataHelper.getAllCategories(res);
})

router.get('/menu/dealOfTheDay', (req, res) =>{
    publicDataHelper.getDealOfTheDay(res)
})

router.post('/logs/analyze', upload.single('logFile'), (req, res) => {
    // Access the uploaded file using req.file hi
    const file = req.file
    console.log(req.file)
    if (file){
        if (!file.originalname.toString().endsWith('.json')) res.json({error : 'not a valid supported log file type, try uploading a valid .json log file.'})
        else logAnalyser.processLog(res, req.query.arrangeBy, file.path)
    }else res.json({error : 'failed to get a valid log file'})
});

router.post('/logs/analyze/queryPhone', upload.single('logFile'), (req, res) => {
    // Access the uploaded file using req.file
    const file = req.file
    console.log(req.file)
    if (file){
        if (!file.originalname.toString().endsWith('.json')) res.json({error : 'not a valid supported log file type, try uploading a valid .json log file.'})
        else logAnalyser.processLogPhoneSpecific(res, req.query.phoneNo, file.path)
    }else res.json({error : 'failed to get a valid log file'})
});

module.exports = router;
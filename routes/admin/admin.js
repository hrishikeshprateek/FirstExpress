let express = require('express');
let router = express.Router();
const csv = require('csv-parser');
const fs = require('fs');
const json2csv = require('json2csv').parse;
const multer = require('multer');


router.delete('/category/delete/:catID',function (req, res) {
    res.send(req.params)
})


// Configure multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the directory to save the uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Use the original filename for the uploaded file
    }
});

const upload = multer({ storage });

router.post('/jsonToCSV',upload.single('file'), (req, res) =>{
    const {CSVname} = req.query
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    // Read the uploaded JSON file
    fs.readFile(req.file.path, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading uploaded file:', err);
            return res.status(500).json({ error: 'An error occurred' });
        }

        // Parse the JSON data
        let jsonData;
        try {
            jsonData = JSON.parse(data);
        } catch (err) {
            console.error('Error parsing JSON data:', err);
            return res.status(400).json({ error: 'Invalid JSON file' });
        }

        // Convert JSON to CSV
        const csvData = json2csv(jsonData);

        // Generate a unique filename
        const filename = `output_${CSVname}.csv`;

        // Write CSV data to a file
        fs.writeFile(filename, csvData, (err) => {
            if (err) {
                console.error('Error writing CSV file:', err);
                return res.status(500).json({ error: 'An error occurred' });
            }

            console.log('CSV file saved successfully');

            // Set the appropriate headers for file download
            res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
            res.setHeader('Content-Type', 'text/csv');

            // Stream the file as the response
            fs.createReadStream(filename).pipe(res);
        });
    });
})

module.exports = router;
const express = require('express')
const router = express.Router()
const fs = require('fs')
const { createWorker } = require('tesseract.js')

router.get('/', (req,res) => {
    res.render('index')
})

router.post('/api',async (req,res) =>{
    const url = req.param('url')
    try {
        await tesseractWorkerFunction(req,res)
    }
    catch {
        res.send("Something went wrong! Please try again in some time!")
        process.exit() // Using forever to restart the server
    }
    

})

async function tesseractWorkerFunction(req,res) {

    const worker = createWorker({
        logger: m => console.log(m)
    })
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize(req.query['url']);
    await worker.terminate();
    //console.log(req.query)
    if (req.query['json']==='true'){
        res.send({"text":text})
    } else {
        res.send(text)
    }
    
}

module.exports = router
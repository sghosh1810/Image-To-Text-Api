const express = require('express')
const router = express.Router()
const yup = require('yup')
const { createWorker, createScheduler } = require('tesseract.js')

const schema = yup.string().matches(yup.string().url())


//Redirect root to /gui
router.get('/', (req,res) => {
    res.redirect(`gui`)
})


//Render gui/gui view
router.get('/gui', (req,res) => {
    res.render('gui/gui')
})


//Redirect /api to /gui as /api is only for post
router.get('/api', (req,res) => {
    res.redirect(`gui`)
})


//Handles form submit from gui/gui.ejs and sends results to ans/ans.ejs view
router.post('/gui',async (req,res) =>{
    try {
        if (await schema.isValid(req.body.url)){
            await tesseractWorkerFunctionGUI(req,res);
        } else {
            res.send("Invalid image format or bad url!")
        }
    } catch {
        res.send("Something went wrong! Please try again in some time!")
        process.exit() // Using forever to restart the server
    }
    

})


//Handles api request and sends either text or json output
router.post('/api',async (req,res) =>{
    try {
        if (schema.isValid(req.param["url"])){
            await tesseractWorkerFunctionAPI(req,res);
        } else {
            res.send("Invalid image format or bad url!")
        }
    }
    catch {
        res.send("Something went wrong! Please try again in some time!")
        process.exit() // Using forever to restart the server
    }
    

})


//Worker Function for API
async function tesseractWorkerFunctionAPI(req,res) {
    
    const scheduler = createScheduler()
    const worker = createWorker()
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    scheduler.addWorker(worker)
    const { data: { text } } = await scheduler.addJob('recognize',req.query['url']);
    //await worker.terminate();
    await scheduler.terminate()
    if (req.query['json']==='true'){
        var dateObject = new Date()
        var date = dateObject.getHours() + "-" + dateObject.getMinutes() + "-" + dateObject.getSeconds()
        res.send({"text":text, 'length':text.length, 'time':date})
    } else {
        res.send(text)
    }
    
}


//Worker Function for GUI
async function tesseractWorkerFunctionGUI(req,res) {

    const scheduler = createScheduler()
    const worker = createWorker()
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    scheduler.addWorker(worker)
    const { data: { text } } = await scheduler.addJob('recognize',req.body.url);
    await scheduler.terminate();
    //console.log(req.query)
    if (req.body.json=='true'){
        var dateObject = new Date()
        var date = dateObject.getHours() + "-" + dateObject.getMinutes() + "-" + dateObject.getSeconds()

        //req.body.mode if false is user mode and if true is dev mode
        if(req.body.mode==='false'){
            res.render('gui/ans',{text:JSON.stringify({"text":text, 'length':text.length, 'time':date}),mode:"user"})
        } else {
            res.render('gui/ans',{text:JSON.stringify({"text":text, 'length':text.length, 'time':date}),mode:"dev",request:JSON.stringify(req.body)})
        }
        
    } else {
        if(req.body.mode==='false'){
            res.render('gui/ans',{text:text,mode:"user"})
        } else {
            res.render('gui/ans',{text:text,mode:"dev",request:JSON.stringify(req.body)})
        }
    }
    
}



module.exports = router
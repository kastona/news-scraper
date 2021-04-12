const express = require('express')
let Datastore = require('nedb')
const generator = require('../util/generator')

let db = new Datastore({ filename: `${process.cwd()}/src/db/database.db`, autoload: true });
const router = express.Router()

router.get('/news', async (req, res) => {



    try {


        

        let vanguardArray = await generator.scrapeSite('Vanguard')
        let punchArray = await generator.scrapeSite('Punch')
        let premiumArray = await generator.scrapeSite('Premium')
        let saharaArray = await generator.scrapeSite('Sahara')
        let thisDayArray = await generator.scrapeSite('This Day')



        res.send({vanguardArray, punchArray, premiumArray, saharaArray, thisDayArray})


    } catch (error) {
        console.log(error.message)
        res.status(500).send()
    }
})
module.exports = router

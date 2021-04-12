const request = require('request-promise')
const cheerio = require('cheerio')


module.exports.scrapeSite = async (media) => {


    let array = []

    let result
    let $
    if (media == 'Vanguard') {




        result = await request.get('https://vanguardngr.com')

        $ = cheerio.load(result)
        $('#rt-home-slider > ul > li.rtp-slide').each((index, element) => {


            let foundElement = $(element).find('div.rtp-slide-content > h2 > a')
            let title = foundElement.text()
            let url = foundElement.attr('href')



            let foundThumb = $(element).find('div.rtp-slide-thumb > a > img')
            let img = foundThumb.attr('src')

            array.push({
                source: 'Vanguard',
                title,
                url,
                img
            })
        })

        return array

    } else if (media == 'Punch') {

        result = await request.get('https://punchng.com')

        $ = cheerio.load(result)



        $('div.row.group-type-featured.group-type-lines > aside > ul > li > article > h3 > a').each((index, element) => {
            let title = $(element).text()
            let url = $(element).attr('href')
            let obj = {
                source: 'Punch',
                title,
                url
            }

            array.push(obj)
        })

        let featuredTitle = $('div.row.group-type-featured.group-type-lines > div.column.group-column-main > article.entry-item-featured > h3 > a').text()
        let featuredUrl = $('div.row.group-type-featured.group-type-lines > div.column.group-column-main > article.entry-item-featured > h3 > a').attr('href')



        array.push({
            source: 'Punch',
            title: featuredTitle,
            url: featuredUrl
        })

        return array
    } else if (media == 'This Day') {

        result = await request.get('https://www.thisdaylive.com/')

        $ = cheerio.load(result)

        $('div.td-block-row > div.td-block-span6 > div.td_module_6').each((index, element) => {
            let img = $(element).find('div.td-module-thumb > a > img').attr('src')
            let title = $(element).find('div.item-details > h3 > a').text()
            let url = $(element).find('div.item-details > h3 > a').attr('href')

            array.push({ source: 'This Day', title, url, img })
        })

    } else if (media == 'Premium') {
        result = await request.get('https://premiumtimesng.com')

        $ = cheerio.load(result)




        $('div.jeg_postblock_21 > div.jeg_block_container > div.jeg_posts > article.jeg_post').each((index, article) => {
            let obj = {
                source: 'Premium Times',
                title: $(article).find('a').text(),
                url: $(article).find('a').attr('href'),
                img: $(article).find('div.thumbnail-container > img').attr('data-src')
            }

            array.push(obj)
        })


        return array.slice(0, 10)

    } else if (media == 'Sahara') {

        result = await request.get('http://saharareporters.com')

        $ = cheerio.load(result)




        $('#page-home-top-stories > div > div > div > div > div.views-row').each((index, element) => {
            let imageUrl = $(element).find('div > div.block-module-image > div > a > span > img').attr('src')
            let storyHeadline = $(element).find('div > div.block-module-content > div.block-module-content-header > span > a').text()
            let storyUrl = $(element).find('div > div.block-module-content > div.block-module-content-header > span > a').attr('href')
            array.push({
                source: 'Sahara Reporters',
                img: imageUrl, title: storyHeadline, url: storyUrl
            })
        })

        return array


    }

}
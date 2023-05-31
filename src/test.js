const puppeteer = require('puppeteer')

exports.getImgurLink = functions.https.onCall(async (data, context) => {
    let url = "https://imgur.com/gallery/kgfDi"

    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)

    const el = await page.$x('//*[@id="root"]/div/div[1]/div[1]/div[3]/div/div[1]/div[2]/div/div/div[2]/div/div/div/div/div/img')

    el.forEach(async function(element){
        const src = await element.getProperty('src')
        const scrText = await src.jsonValue()

        console.log({ scrText })
    })
});
const express = require('express')
const app = express()
const port = process.env.PORT || 1000

const {remote} = require('webdriverio')

let browser



app.get('/', (req, res) => {
    const automate = async () => {
        browser = await remote({
            capabilities: {browserName: 'chrome'}
        })

        await browser.navigateTo('https://app.resemble.ai/')

        const emailInput = await browser.$('#user_email')
        await emailInput.setValue('rohitkm40021@gmail.com')

        const passInput = await browser.$('#user_password')
        await passInput.setValue('*i*love*Naaz*#1')

        const searchBtn = await browser.$('input[type="submit"]')
        await searchBtn.click()

        res.send(await browser.getTitle())

        await browser.deleteSession()
    }




    automate().catch((err) => {
        console.log(err)
        return browser.deleteSession()
    })
})

app.listen(port, () => {
    console.log(`Listening at port : ${port}`)
})

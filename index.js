
const chromeLauncher = require('chrome-launcher');
const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');
const config = require('lighthouse/lighthouse-core/config/lr-desktop-config.js');
const reportGenerator = require('lighthouse/lighthouse-core/report/report-generator');
const request = require('request');
const util = require('util');
const excelGenerator = require('node-excel-export');
const { makeReportMass } = require('./lib/report-mass');
const { generateExcelRaport } = require('./lib/report-excel');
const { writeToFile } = require('./lib/raportUtils');
const configLogin = require('./config/login.json');

(async () => {

    const loginURL = 'https://github.com/login';
    const logoutURL = 'https://idp.nature.com/logout/natureuser?redirect_uri=https%3A%2F%2Fwww.nature.com';
    const limit = 2;
    const opts = {
        //chromeFlags: ['--headless'],
        logLevel: 'info',
        output: 'json',
        disableDeviceEmulation: true,
        defaultViewport: {
            width: 1200,
            height: 900
        },
        chromeFlags: ['--disable-mobile-emulation']
    };

    // Launch chrome using chrome-launcher
    const chrome = await chromeLauncher.launch(opts);
    opts.port = chrome.port;

    // Connect to it using puppeteer.connect().
    const resp = await util.promisify(request)(`http://localhost:${opts.port}/json/version`);
    const { webSocketDebuggerUrl } = JSON.parse(resp.body);
    const browser = await puppeteer.connect({ browserWSEndpoint: webSocketDebuggerUrl });


    //Puppeteer
    page = (await browser.pages())[0];
    await page.setViewport({ width: 1200, height: 900 });
    await page.goto(loginURL, { waitUntil: 'networkidle2' });

    await page.type(configLogin.login.inputName, configLogin.login.loginValue);
    await page.type(configLogin.password.inputName, configLogin.password.passwordValue);
    await page.click(configLogin.submit.inputName);

    let links = await page.evaluate(
        () => [...document.querySelectorAll('a')].map(elem => elem.href)
    )
    links = links.filter(link => link.includes('https://'))
    links = [...new Set(links)];
    links.length = Math.min(limit, links.length);
    console.log(page.url(), links);

    // Run Lighthouse.

    const reports = [];

    for (let link of links) {
        console.log(link)
        await page.goto(link, { waitUntil: 'networkidle2' });
        const report = await lighthouse(page.url(), opts, config).then(results => {
            return results;
        });
        // console.log(`Lighthouse score: ${report.lhr.score}`, report);
        reports.push(report);
    }

    let counter = 0;
    for (let report of reports) {
        const reportLhr = report.lhr;
        
        const html = reportGenerator.generateReport(reportLhr, 'html');
        const json = reportGenerator.generateReport(reportLhr, 'json');

        writeToFile('report' + counter + '.html', html)
        writeToFile('report' + counter + '.json', json)
        counter++;
    }

    const reportArr = reports.map(report => report.lhr)

    const geneteredAverageLhrReport = makeReportMass(reportArr);
    const generatedExcelRaport = generateExcelRaport(reportArr);

    const htmlM = reportGenerator.generateReport(geneteredAverageLhrReport, 'html');
    const jsonM = reportGenerator.generateReport(geneteredAverageLhrReport, 'json');

    writeToFile('report-mass.html', htmlM)
    writeToFile('report-mass.json', jsonM)

    const reportXLSX = excelGenerator.buildExport(generatedExcelRaport);

    writeToFile('report' + Date.now() +'.xlsx', reportXLSX)

    await browser.disconnect();
    await chrome.kill();
})();

// const reportArr = [json, json, json, json, json];

// const geneteredAverageLhrReport = makeReportMass(reportArr);
// const generatedExcelRaport = generateExcelRaport(reportArr);
// console.log(geneteredAverageLhrReport, generatedExcelRaport)

// const htmlM = reportGenerator.generateReport(geneteredAverageLhrReport, 'html');
// const jsonM = reportGenerator.generateReport(geneteredAverageLhrReport, 'json');

// const reportXLSX = excelGenerator.buildExport(generatedExcelRaport);

// writeToFile('report-mass.html', htmlM)
// writeToFile('report-mass.json', jsonM)
// writeToFile('report.xlsx', reportXLSX)

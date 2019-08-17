
const chromeLauncher = require('chrome-launcher');
const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');
const config = require('lighthouse/lighthouse-core/config/lr-desktop-config.js');
const reportGenerator = require('lighthouse/lighthouse-core/report/report-generator');
const request = require('request');
const util = require('util');
const fs = require('fs');
const excelGenerator = require('node-excel-export');
const { makeReportMass } = require('./report-mass');
const { generateExcelRaport } = require('./report-excel');
const json = require('./results/report100.json');

(async () => {

    const loginURL = 'https://www.google.pl/maps';
    const logoutURL = 'https://idp.nature.com/logout/natureuser?redirect_uri=https%3A%2F%2Fwww.nature.com';

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

    console.log(page.url());

    // Run Lighthouse.

    const reports = [];

    for (let i = 0; i <= 2; i++) {
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


const writeToFile = (nameFile, item) => {
    fs.writeFile('./results/' + nameFile, item, (err) => {
        if (err) {
            console.error(err);
        }
    });
}

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

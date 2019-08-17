
const chromeLauncher = require('chrome-launcher');
const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');
const config = require('lighthouse/lighthouse-core/config/lr-desktop-config.js');
const reportGenerator = require('lighthouse/lighthouse-core/report/report-generator');
const request = require('request');
const util = require('util');
const fs = require('fs');
const json = require('./report1.json');
const { numberJson } = require('./numberItems');

// (async () => {

//     const loginURL = 'https://www.google.pl/maps';
//     const logoutURL = 'https://idp.nature.com/logout/natureuser?redirect_uri=https%3A%2F%2Fwww.nature.com';

//     const opts = {
//         //chromeFlags: ['--headless'],
//         logLevel: 'info',
//         output: 'json',
//         disableDeviceEmulation: true,
//         defaultViewport: {
//             width: 1200,
//             height: 900
//         },
//         chromeFlags: ['--disable-mobile-emulation']
//     };

//     // Launch chrome using chrome-launcher
//     const chrome = await chromeLauncher.launch(opts);
//     opts.port = chrome.port;

//     // Connect to it using puppeteer.connect().
//     const resp = await util.promisify(request)(`http://localhost:${opts.port}/json/version`);
//     const { webSocketDebuggerUrl } = JSON.parse(resp.body);
//     const browser = await puppeteer.connect({ browserWSEndpoint: webSocketDebuggerUrl });


//     //Puppeteer
//     page = (await browser.pages())[0];
//     await page.setViewport({ width: 1200, height: 900 });
//     await page.goto(loginURL, { waitUntil: 'networkidle2' });

//     console.log(page.url());

//     // Run Lighthouse.

//     const reports = [];

//     for (let i = 0; i <= 0; i++) {
//         const report = await lighthouse(page.url(), opts, config).then(results => {
//             return results;
//         });
//         // console.log(`Lighthouse score: ${report.lhr.score}`, report);
//         reports.push(report);
//     }

//     let counter = 0;
//     for (let report of reports) {
//         const reportLhr = report.lhr;
        
//         const html = reportGenerator.generateReport(reportLhr, 'html');
//         const json = reportGenerator.generateReport(reportLhr, 'json');

//         writeToFile('report' + counter + '.html', html)
//         writeToFile('report' + counter + '.json', json)
//         counter++;
//     }

//     await browser.disconnect();
//     await chrome.kill();
// })();


const writeToFile = (nameFile, item) => {
    fs.writeFile(nameFile, item, (err) => {
        if (err) {
            console.error(err);
        }
    });
}


// const stringifyJsonKeys = (j) => {
//     const obj = {}
//     let lastString = "";
//     let jsonEntries = objToString(j);
//     for(let key in jsonEntries) {
//         let jsonS = {};
//         if(jsonEntries[key] instanceof Object) {
//             jsonS[key] = itereteOverEntries(jsonEntries[key])
//         }
//         obj[key] = jsonS;
//     }
//     lastString = objToEntries(j)
//     console.log(obj)
//     return lastString
// }

// const itereteOverEntries = (obj) => {
//     for(let key in obj) {
//         let jsonS = {};
//         if(obj[key] instanceof Object) {
//             jsonS[key] = itereteOverEntries(objToEntries(obj[key]));
//         } else {
//             jsonS[key] = obj[key];
//         }
//     }
// }

// console.log(Object.keys(json.audits))
// console.log(stringifyJsonKeys(json.audits))


// const stringifyJsonKeys = (json) => {
//     console.log(numberJson)
//     const obj = {}
//     for(let ent in numberJson) {
//         const temp = null
//         if(numberJson[ent] instanceof Object) {
//             stringifyJsonKeys(numberJson[ent])
//         } else {
//             console.log(json[ent])
//         }
//     }
// }

// stringifyJsonKeys(json)

let elems = {}

const startStringify = (json) => {
    for(let key in json) {
        stringifyKeys(json[key], key)
    }
}

const stringifyKeys = (jsonKeys, string) => { 
    for(let key in jsonKeys) {
        if(jsonKeys[key] instanceof Object) {
            stringifyKeys(jsonKeys[key], string + ";" + key)
        } else {
            elems[string + ";" + key] = true;
        }
    }
}

const startStringify2 = (json) => {
    for(let key in json) {
        stringifyKeysVal(json[key], key)
    }
}

const stringifyKeysVal = (jsonKeys, string) => { 
    for(let key in jsonKeys) {
        if(jsonKeys[key] instanceof Object) {
            stringifyKeysVal(jsonKeys[key], string + ";" + key)
        } else {
            elems[string + ";" + key] = jsonKeys[key];
        }
    }
}

startStringify(numberJson);
console.log(Object.keys(elems))
const neededKeys = Object.keys(elems);
const keys = elems;
elems = {}

startStringify2(json);
console.log(Object.keys(elems))
const allKeys = Object.keys(elems);

const jsonEntries2 = Object.entries(elems);
console.log(jsonEntries2)


const trueElements = {};

for(let i in elems) {
    for(let j in keys) {
        if (i === j) {
            trueElements[j] = elems[i];
        }
    }
}


console.log(trueElements)


const rebuildJson = () => {
    const jsonek = {}
    const entries = Object.entries(trueElements);
    for(let entr in entries) {
        makeArray(entries[entr][0], entries[entr][1], jsonek)
    }
    return jsonek;
}


const makeArray = (string, value, j) => {
    const stringArr = string.split(';');
    const [ a, b, c, d, e, f ] = stringArr;
    const stringArrLength = stringArr.length;
    console.log(stringArr, stringArr.length);
    j = buildArr(...stringArr, j)
    if(stringArrLength === 1) {
        j[a] = value;
    } else if(stringArrLength === 2) {
        j[a][b] = value;
    } else if(stringArrLength === 3) {
        j[a][b][c] = value;
    } else if(stringArrLength === 4) {
        j[a][b][c][d] = value;
    } else if(stringArrLength === 5) {
        j[a][b][c][d][e] = value;
    } else {
        j[a][b][c][d][e][f] = value;
    }
}

const buildArr = ([a, b, c, d, e, f], json) => {
    json = {
        a: {
            b: {
                c: {
                    d: {
                        e: {
                            f: {

                            }
                        }
                    }
                }
            }
        }
    }
    return json;
}


const abc = rebuildJson(trueElements)
console.log(abc);

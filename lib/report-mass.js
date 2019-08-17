const { reportKeys } = require('./numberItems');
const { 
    reportObjToStringsArr,    
    generateArrayofValues,
    generateValueFromCollback,
    calculateAverage,
} = require('./raportUtils');

const filterMathKeys = (jsonArr, mathKeysArr) => {
    const filtredElements = {};
    for (let i in jsonArr) {
        for (let j in mathKeysArr) {
            if (i === j) {
                filtredElements[j] = jsonArr[i];
            }
        }
    }
    return filtredElements;
}

const rebuildArray = (averageJson, lhr) => {
    const rebuildedArr = lhr;
    for (let key in averageJson) {
        setValueInArray(rebuildedArr, key, averageJson[key]);
    }
    return rebuildedArr;
}

const setValueInArray = (lhr, key, value) => {
    const keyValues = key.split('|');
    const keysArrLength = keyValues.length;
    const [a, b, c, d, e, f] = keyValues;
    if (keysArrLength === 1) {
        lhr[a] = value;
    } else if (keysArrLength === 2) {
        lhr[a][b] = value;
    } else if (keysArrLength === 3) {
        lhr[a][b][c] = value;
    } else if (keysArrLength === 4) {
        lhr[a][b][c][d] = value;
    } else if (keysArrLength === 5) {
        lhr[a][b][c][d][e] = value;
    } else {
        lhr[a][b][c][d][e][f] = value;
    }
}

const generateMetricsDetailsItems = (jsonArr) => {
    const jsonMetricsArray = [];
    for (let i in jsonArr) {
        jsonMetricsArray.push(jsonArr[i]['audits']['metrics']['details']['items'][0])
    }
    return jsonMetricsArray;
}

const recalculateMetrics = (lhr, jsonArr) => {
    const metrics = lhr;
    const metricsItemsArray = generateMetricsDetailsItems(jsonArr);
    const arrValues = generateArrayofValues(metricsItemsArray);
    const averageValues = generateValueFromCollback(arrValues, calculateAverage);
    metrics['audits']['metrics']['details']['items'][0] = averageValues;
    return metrics;
}

const makeReportMass = (reportArr) => {
    const lhr = reportArr[0];
    const mathKeysArr = reportObjToStringsArr(reportKeys);
    const reportArrayKeys = reportArr.map(report => reportObjToStringsArr(report));
    const filtredArrayKeys = reportArrayKeys.map(report => filterMathKeys(report, mathKeysArr))
    const jsonValueArr = generateArrayofValues(filtredArrayKeys);
    const generatedAverageJson = generateValueFromCollback(jsonValueArr, calculateAverage);
    const rebuildedAverageResults = rebuildArray(generatedAverageJson, lhr);
    const lhrOverideMetrics = recalculateMetrics(rebuildedAverageResults, reportArr);
    return lhrOverideMetrics;
}

module.exports = {
    makeReportMass
} 

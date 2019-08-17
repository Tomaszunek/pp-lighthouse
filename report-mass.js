const { reportKeys } = require('./numberItems');

const reportObjToStringsArr = (json) => {
    const keysObj = {};
    for (let key in json) {
        nodeToStringArr(json[key], key, keysObj)
    }
    return keysObj;
}

const nodeToStringArr = (jsonKeys, string, keysObj) => {
    for (let key in jsonKeys) {
        if (jsonKeys[key] instanceof Object) {
            nodeToStringArr(jsonKeys[key], string + ";" + key, keysObj)
        } else {
            keysObj[string + ";" + key] = jsonKeys[key];
        }
    }
}

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

const generateArrayofValues = (jsonArr) => {
    const jsonArrayValues = {};
    const singleArr = jsonArr[0];
    for (let i in singleArr) {
        const valueArr = [];
        for (let j of jsonArr) {
            valueArr.push(j[i])
        }
        jsonArrayValues[i] = valueArr;
    }
    return jsonArrayValues;
}

const calculateAverage = (numberArr) => 
    numberArr.reduce((p,c) => p + c, 0) / numberArr.length
    
const generateAverageArr = (jsonArr) => {
    const averageJson = {};
    for (let i in jsonArr) {
        averageJson[i] = calculateAverage(jsonArr[i]);
    }
    return averageJson;
}

const rebuildArray = (averageJson, lhr) => {
    const rebuildedArr = lhr;
    for(let key in averageJson) {
        setValueInArray(rebuildedArr, key, averageJson[key])
    }
    return rebuildedArr;
}

const setValueInArray = (lhr, key, value) => {
    const keyValues = key.split(';');
    const keysArrLength = keyValues.length;
    const [ a, b, c, d, e, f ] = keyValues;
    if(keysArrLength === 1) {
        lhr[a] = value;
    } else if(keysArrLength === 2) {
        lhr[a][b] = value;
    } else if(keysArrLength === 3) {
        lhr[a][b][c] = value;
    } else if(keysArrLength === 4) {
        lhr[a][b][c][d] = value;
    } else if(keysArrLength === 5) {
        lhr[a][b][c][d][e] = value;
    } else {
        lhr[a][b][c][d][e][f] = value;
    }
}

const makeReportMass = (reportArr) => {
    const lhr = reportArr[0];
    // const reportKeysArr = reportObjToStringsArr(lhr);
    const mathKeysArr = reportObjToStringsArr(reportKeys);
    const reportArrayKeys = reportArr.map(report => reportObjToStringsArr(report));
    const filtredArrayKeys = reportArrayKeys.map(report => filterMathKeys(report, mathKeysArr))
    const jsonValueArr = generateArrayofValues(filtredArrayKeys);
    const generatedAverageJson = generateAverageArr(jsonValueArr);
    const rebuildedAverageResults = rebuildArray(generatedAverageJson, lhr);
    return rebuildedAverageResults;
}

module.exports = {
    makeReportMass
} 

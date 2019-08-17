const fs = require('fs');

const reportObjToStringsArr = (json) => {
    const keysObj = {};
    for (let key in json) {
        if (json[key] instanceof Object) {
            nodeToStringArr(json[key], key, keysObj);
        } else {
            keysObj[key] = json[key];
        }
    }
    return keysObj;
}

const nodeToStringArr = (jsonKeys, string, keysObj) => {
    for (let key in jsonKeys) {
        if (jsonKeys[key] instanceof Object) {
            nodeToStringArr(jsonKeys[key], string + "|" + key, keysObj);
        } else {
            keysObj[string + "|" + key] = jsonKeys[key];
        }
    }
}

const generateArrayofValues = (jsonArr) => {
    const jsonArrayValues = {};
    const singleArr = jsonArr[0];
    for (let i in singleArr) {
        const valueArr = [];
        for (let j of jsonArr) {
            valueArr.push(j[i]);
        }
        jsonArrayValues[i] = valueArr;
    }
    return jsonArrayValues;
}

const calculateAverage = (numberArr) =>
    numberArr.reduce((p, c) => p + c, 0) / numberArr.length;

const calculateMin = (numberArr) =>
    Math.min(...numberArr)

const calculateMax = (numberArr) =>
    Math.max(...numberArr)

const generateValueFromCallback = (jsonArr, callback) => {
    const averageJson = {};
    for (let i in jsonArr) {
        averageJson[i] = callback(jsonArr[i]);
    }
    return averageJson;
}

const writeToFile = (nameFile, item) => {
    fs.writeFile('./results/' + nameFile, item, (err) => {
        if (err) {
            console.error(err);
        }
    });
}

module.exports = {
    reportObjToStringsArr,
    calculateAverage,
    calculateMin,
    calculateMax,
    generateArrayofValues,
    generateValueFromCallback,
    writeToFile,
}
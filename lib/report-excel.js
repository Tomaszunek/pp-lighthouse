const { reportKeys, excelElements } = require('./numberItems');
const { heading, merges, generateSpecification } = require('./excelCellDefine');
const {
    reportObjToStringsArr,
    generateArrayofValues,
    generateValueFromCallback,
    calculateAverage,
    calculateMin,
    calculateMax,
} = require('./raportUtils');

const filterKeys = (jsonArr, mathKeysArr) => {
    const filtredElements = {};
    for (let i in jsonArr) {
        const finalUrl = jsonArr['finalUrl'];
        for (let j in mathKeysArr) {
            if (i === j) {
                filtredElements[j] = jsonArr[i];
            }
        }
        filtredElements['url'] = finalUrl;
    }
    return filtredElements;
}

const generateExcelRaport = (reportArr) => {
    let excelRaports = [];
    const selectedKeys = reportObjToStringsArr(excelElements ? excelElements : reportKeys);
    const reportArrayKeys = reportArr.map(report => reportObjToStringsArr(report));
    const filtredArrayKeys = reportArrayKeys.map(report => filterKeys(report, selectedKeys))
    const jsonValueArr = generateArrayofValues(filtredArrayKeys);
    const averageValues = generateValueFromCallback(jsonValueArr, calculateAverage);
    const maxValues = generateValueFromCallback(jsonValueArr, calculateMin);
    const minValues = generateValueFromCallback(jsonValueArr, calculateMax);
    // console.log(selectedKeys, reportArrayKeys, filtredArrayKeys, jsonValueArr, averageValues);
    // console.log(maxValues, minValues)

    excelRaports = [
        {
            name: 'Urls raports',
            heading,
            merges,
            specification: generateSpecification({url: "url", ...selectedKeys}), // <- Report specification
            data: filtredArrayKeys
        },
        {
            name: 'Mass raport',
            heading,
            merges,
            specification: generateSpecification({url: "url", ...selectedKeys}), // <- Report specification
            data: filtredArrayKeys
        }
    ]
    return excelRaports;
}

module.exports = {
    generateExcelRaport
}
const { reportKeys, excelElements } = require('./numberItems');
const { heading, merges, generateSpecification } = require('./exceCellDefine');
const {
    reportObjToStringsArr,
    generateArrayofValues,
    generateValueFromCollback,
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
    const averageValues = generateValueFromCollback(jsonValueArr, calculateAverage);
    const maxValues = generateValueFromCollback(jsonValueArr, calculateMin);
    const minValues = generateValueFromCollback(jsonValueArr, calculateMax);
    // console.log(selectedKeys, reportArrayKeys, filtredArrayKeys, jsonValueArr, averageValues);
    // console.log(maxValues, minValues)

    excelRaports = [
        {
            name: 'Urls raports', // <- Specify sheet name (optional)
            heading: heading, // <- Raw heading array (optional)
            merges: merges, // <- Merge cell ranges
            specification: generateSpecification({url: "url", ...selectedKeys}), // <- Report specification
            data: filtredArrayKeys // <-- Report data
        },
        {
            name: 'Mass raport', // <- Specify sheet name (optional)
            heading: heading, // <- Raw heading array (optional)
            merges: merges, // <- Merge cell ranges
            specification: generateSpecification({url: "url", ...selectedKeys}), // <- Report specification
            data: filtredArrayKeys // <-- Report data
        }
    ]
    return excelRaports;
}

module.exports = {
    generateExcelRaport
}
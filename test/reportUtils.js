const {
    calculateMax,
    calculateMin,
    calculateAverage,
    generateValueFromCallback,
    reportObjToStringsArr,
    generateArrayofValues,
} = require('../lib/raportUtils');

describe('Report Utils', function () {
    const arrValues = [1, 2, 3, 4, 5];
    const objectOfArrays = {
        "test": arrValues,
        "test1": arrValues,
        "test2": arrValues
    };
    const object = {
        a: {
            b: {
                c: {
                    d: 1
                }
            }
        },
        f: {
            g: {
                i: 4
            }
        }
    };
    const jsonArr = [object, object, object, object]
    it('Calculate Max', function () {
        expect(calculateMax(arrValues)).toBe(5);
    });
    it('Calculate Min', function () {
        expect(calculateMin(arrValues)).toBe(1);
    });
    it('Calculate Average', function () {
        expect(calculateAverage(arrValues)).toBe(3);
    });
    it('Generate value from Callback', function () {
        const generateAverage = generateValueFromCallback(objectOfArrays, calculateAverage)
        const generateMax = generateValueFromCallback(objectOfArrays, calculateMax)
        const generateMin = generateValueFromCallback(objectOfArrays, calculateMin)
        expect(generateAverage).toStrictEqual({
            "test": 3,
            "test1": 3,
            "test2": 3
        });
        expect(generateMax).toStrictEqual({
            "test": 5,
            "test1": 5,
            "test2": 5
        });
        expect(generateMin).toStrictEqual({
            "test": 1,
            "test1": 1,
            "test2": 1
        });
    });
    it('Calculate Average', function () {
        const keyObj = reportObjToStringsArr(object);
        expect(keyObj).toStrictEqual({
            "a|b|c|d": 1,
            "f|g|i": 4,
        });
    });
    it('Generate Array of Values', function () {
        const keyObj = generateArrayofValues(jsonArr.map(report => reportObjToStringsArr(report)));
        expect(keyObj).toStrictEqual({
            "a|b|c|d": [1, 1, 1, 1],
            "f|g|i": [4, 4, 4, 4]
        });
    });
});
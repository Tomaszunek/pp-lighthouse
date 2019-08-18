const {
    filterMathKeys,
    rebuildArray,
    recalculateMetrics,
    makeReportMass,
} = require('../lib/report-mass');

describe('Report Mass', function () {
    const arrValues = {
        "abc": 1,
        "abcd": 1,
        "abce": 1,
        "abcf": 1,
        "abcg": 1,
        "abch": 1,
        a: {
            b: 2
        },
        b: {
            b: {
                c: 2
            }
        },
        c: {
            b: {
                c: {
                    d: 2
                }
            }
        },
        d: {
            b: {
                c: {
                    d: {
                        e: 2
                    }
                }
            }
        },
        e: {
            b: {
                c: {
                    d: {
                        e: {
                            g: 2
                        }
                    }
                }
            }
        }
    }
    const mathKeys = {
        "abc": "abc",
        "abcd": "abc",
        "abce": "abc",
        "ddd": "abc"
    }
    const object = {
        "abcf": 2,
        "abcg": 2,
        "abch": 2,
        "abcfg": 1,
        "abcgg": 1,
        "abchg": 1,
        'a|b': 1,
        'b|b|c': 1,
        'c|b|c|d': 1,
        'd|b|c|d|e': 1,
        'e|b|c|d|e|g': 1,
    }
    const metrics = {
        "audits": {
            "metrics": {
                "id": "metrics",
                "title": "Metrics",
                "description": "Collects all available metrics.",
                "score": null,
                "scoreDisplayMode": "informative",
                "rawValue": 1753.7158,
                "details": {
                    "items": [
                        {
                            "firstContentfulPaint": 617,
                            "firstMeaningfulPaint": 617,
                            "firstCPUIdle": 1531,
                            "interactive": 1754,
                            "speedIndex": 2173,
                            "estimatedInputLatency": 56,
                            "observedNavigationStart": 0,
                            "observedNavigationStartTs": 16416659005,
                            "observedFirstPaint": 747,
                            "observedFirstPaintTs": 16417406111,
                            "observedFirstContentfulPaint": 747,
                            "observedFirstContentfulPaintTs": 16417406113,
                            "observedFirstMeaningfulPaint": 747,
                            "observedFirstMeaningfulPaintTs": 16417406113,
                            "observedTraceEnd": 5048,
                            "observedTraceEndTs": 16421707185,
                            "observedLoad": 1245,
                            "observedLoadTs": 16417904460,
                            "observedDomContentLoaded": 710,
                            "observedDomContentLoadedTs": 16417368794,
                            "observedFirstVisualChange": 762,
                            "observedFirstVisualChangeTs": 16417421005,
                            "observedLastVisualChange": 4612,
                            "observedLastVisualChangeTs": 16421271005,
                            "observedSpeedIndex": 1091,
                            "observedSpeedIndexTs": 16417750228
                        }
                    ]
                }
            }
        },
    }

    const metricsArr = [metrics, metrics, metrics]
    it('Filter Math Keys', function () {
        expect(filterMathKeys(arrValues, mathKeys)).toStrictEqual({
            "abc": 1,
            "abcd": 1,
            "abce": 1
        });
    });
    it('Rebuild Array', function () {
        expect(rebuildArray(object, arrValues)).toStrictEqual({
            "abc": 1,
            "abcd": 1,
            "abce": 1,
            "abcf": 2,
            "abcg": 2,
            "abch": 2,
            "abcfg": 1,
            "abcgg": 1,
            "abchg": 1,
            "a": {
                "b": 1
            },
            "b": {
                "b": {
                    "c": 1,
                },
            },
            "c": {
                "b": {
                    "c": {
                        "d": 1,
                    },
                },
            },
            "d": {
                "b": {
                    "c": {
                        "d": {
                            "e": 1,
                        },
                    },
                },
            },
            "e": {
                "b": {
                    "c": {
                        "d": {
                            "e": {
                                "g": 1,
                            },
                        },
                    },
                },
            },
        });
    });
    it('recalculateMatrics', function () {
        expect(recalculateMetrics(metricsArr[0], metricsArr)).toStrictEqual(
            {
                "audits": {
                    "metrics": {
                        "id": "metrics",
                        "rawValue": 1753.7158,
                        "score": null,
                        "scoreDisplayMode": "informative",
                        "title": "Metrics",
                        "description": "Collects all available metrics.",
                        "details": {
                            "items": [
                                {
                                    "estimatedInputLatency": 56,
                                    "firstCPUIdle": 1531,
                                    "firstContentfulPaint": 617,
                                    "firstMeaningfulPaint": 617,
                                    "interactive": 1754,
                                    "observedDomContentLoaded": 710,
                                    "observedDomContentLoadedTs": 16417368794,
                                    "observedFirstContentfulPaint": 747,
                                    "observedFirstContentfulPaintTs": 16417406113,
                                    "observedFirstMeaningfulPaint": 747,
                                    "observedFirstMeaningfulPaintTs": 16417406113,
                                    "observedFirstPaint": 747,
                                    "observedFirstPaintTs": 16417406111,
                                    "observedFirstVisualChange": 762,
                                    "observedFirstVisualChangeTs": 16417421005,
                                    "observedLastVisualChange": 4612,
                                    "observedLastVisualChangeTs": 16421271005,
                                    "observedLoad": 1245,
                                    "observedLoadTs": 16417904460,
                                    "observedNavigationStart": 0,
                                    "observedNavigationStartTs": 16416659005,
                                    "observedSpeedIndex": 1091,
                                    "observedSpeedIndexTs": 16417750228,
                                    "observedTraceEnd": 5048,
                                    "observedTraceEndTs": 16421707185,
                                    "speedIndex": 2173,
                                },
                            ],
                        },
                    },
                },
            });
    });
    it('Generate Raport Mass', function () {
        expect(makeReportMass(metricsArr)).toStrictEqual({
            "audits": {
                "metrics": {
                    "description": "Collects all available metrics.",
                    "details": {
                        "items": [
                            {
                                "estimatedInputLatency": 56,
                                "firstCPUIdle": 1531,
                                "firstContentfulPaint": 617,
                                "firstMeaningfulPaint": 617,
                                "interactive": 1754,
                                "observedDomContentLoaded": 710,
                                "observedDomContentLoadedTs": 16417368794,
                                "observedFirstContentfulPaint": 747,
                                "observedFirstContentfulPaintTs": 16417406113,
                                "observedFirstMeaningfulPaint": 747,
                                "observedFirstMeaningfulPaintTs": 16417406113,
                                "observedFirstPaint": 747,
                                "observedFirstPaintTs": 16417406111,
                                "observedFirstVisualChange": 762,
                                "observedFirstVisualChangeTs": 16417421005,
                                "observedLastVisualChange": 4612,
                                "observedLastVisualChangeTs": 16421271005,
                                "observedLoad": 1245,
                                "observedLoadTs": 16417904460,
                                "observedNavigationStart": 0,
                                "observedNavigationStartTs": 16416659005,
                                "observedSpeedIndex": 1091,
                                "observedSpeedIndexTs": 16417750228,
                                "observedTraceEnd": 5048,
                                "observedTraceEndTs": 16421707185,
                                "speedIndex": 2173,
                            },
                        ],
                    },
                    "id": "metrics",
                    "rawValue": 1753.7158,
                    "score": null,
                    "scoreDisplayMode": "informative",
                    "title": "Metrics",
                },
            },
        });

    });



});
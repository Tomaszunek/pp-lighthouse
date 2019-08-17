const reportKeys = {
    "environment": {
        "benchmarkIndex": "benchmarkIndex"
    },
    "audits": {
        "is-on-https": {
            "score": "score"
        },
        "redirects-http": {
            "score": "score"
        },
        "service-worker": {
            "score": "score"
        },
        "works-offline": {
            "score": "score"
        },
        "viewport": {
            "score": "score"
        },
        "without-javascript": {
            "score": "score"
        },
        "first-contentful-paint": {
            "score": "score",
            "rawValue": "rawValue"
        },
        "first-meaningful-paint": {
            "score": "score",
            "rawValue": "rawValue"
        },
        "load-fast-enough-for-pwa": {
            "score": "score",
            "rawValue": "rawValue",
        },
        "speed-index": {
            "score": "score",
            "rawValue": "rawValue"
        },
        "screenshot-thumbnails": {
            "details": {
                "scale": "scale"
            }
        },        
        "estimated-input-latency": {
            "score": "score",
            "rawValue": "rawValue"
        },
        "errors-in-console": {
            "score": "score",
            "rawValue": "rawValue"
        },
        "time-to-first-byte": {
            "score": "score",
            "rawValue": "rawValue",
            "details": {
                "overallSavingsMs": "overallSavingsMs"
            }
        },
        "first-cpu-idle": {
            "score": "score",
            "rawValue": "rawValue"
        },
        "interactive": {
            "score": "score",
            "rawValue": "rawValue"
        },
        "image-aspect-ratio": {
            "score": "score",
        },
        "deprecations": {
            "score": "score",
        },
        "bootup-time": {
            "score": "score",
            "rawValue": "rawValue"
        },
        "uses-rel-preload": {
            "score": "score",
            "rawValue": "rawValue"
        },
        "uses-rel-preconnect": {
            "score": "score",
            "rawValue": "rawValue"
        },
        "font-display": {
            "score": "score",
        },
        "network-requests": {
            "rawValue": "rawValue"
        },
        "metrics": {
            "rawValue": "rawValue"
        },
        "offline-start-url": {
            "score": "score",
        },
        "aria-allowed-attr": {
            "score": "score",
        },
        "aria-required-attr": {
            "score": "score",
        },
        "aria-required-children": {
            "score": "score",
        },
        "aria-required-parent": {
            "score": "score",
        },
        "aria-roles": {
            "score": "score",
        },
        "aria-valid-attr-value": {
            "score": "score",
        },
        "aria-valid-attr": {
            "score": "score",
        },
        "button-name": {
            "score": "score",
        },
        "bypass": {
            "score": "score",
        },
        "color-contrast": {
            "score": "score",
        },
        "document-title": {
            "score": "score",
        },
        "duplicate-id": {
            "score": "score",
        },
        "html-has-lang": {
            "score": "score",
        },
        "html-lang-valid": {
            "score": "score",
        },
        "image-alt": {
            "score": "score",
        },
        "label": {
            "score": "score",
        },
        "link-name": {
            "score": "score",
        },
        "meta-viewport": {
            "score": "score",
        },
        "tabindex": {
            "score": "score",
        },
        "uses-long-cache-ttl": {
            "score": "score",
            "rawValue": "rawValue"
        },
        "total-byte-weight": {
            "score": "score",
            "rawValue": "rawValue"
        },
        "offscreen-images": {
            "score": "score",
            "rawValue": "rawValue",
            "details": {
                "overallSavingsMs": 0,
                "overallSavingsBytes": 13242
            }
        },
        "render-blocking-resources": {
            "score": "score",
            "rawValue": "rawValue",
            "details": {
                "overallSavingsMs": 0
            }
        },
        "unminified-css": {
            "score": "score",
            "rawValue": "rawValue",
            "details": {
                "overallSavingsMs": 0,
                "overallSavingsBytes": 0
            }
        },
        "unminified-javascript": {
            "score": "score",
            "rawValue": 0,
            "details": {
                "overallSavingsMs": 0,
                "overallSavingsBytes": 0
            }
        },
        "unused-css-rules": {
            "score": "score",
            "rawValue": "rawValue",
            "details": {
                "overallSavingsMs": 0,
                "overallSavingsBytes": 138390
            }
        },
        "uses-webp-images": {
            "score": "score",
            "rawValue": "rawValue",
        },
        "uses-optimized-images": {
            "score": "score",
            "rawValue": "rawValue",
            "details": {
                "overallSavingsMs": 0,
                "overallSavingsBytes": 0
            }
        },
        "uses-text-compression": {
            "score": "score",
            "rawValue": "rawValue",
            "details": {
                "overallSavingsMs": 0,
                "overallSavingsBytes": 0
            }
        },
        "uses-responsive-images": {
            "score": "score",
            "rawValue": "rawValue",
            "details": {
                "overallSavingsMs": 0,
                "overallSavingsBytes": 0
            }
        },
        "efficient-animated-content": {
            "score": "score",
            "rawValue": "rawValue",
            "details": {
                "overallSavingsMs": 0,
                "overallSavingsBytes": 0
            }
        },
        "appcache-manifest": {
            "score": "score",
        },
        "doctype": {
            "score": "score",
        },
        "dom-size": {
            "score": "score",
            "rawValue": "rawValue",
        },
        "geolocation-on-start": {
            "score": "score",
        },
        "no-document-write": {
            "score": "score",
        },
        "no-vulnerable-libraries": {
            "score": "score",
        },
        "js-libraries": {
            "score": "score",
        },
        "notification-on-start": {
            "score": "score",
        },
        "password-inputs-can-be-pasted-into": {
            "score": "score",
        },
        "uses-passive-event-listeners": {
            "score": "score",
        },
        "meta-description": {
            "score": "score",
        },
        "http-status-code": {
            "score": "score",
        },
        "link-text": {
            "score": "score",
        }
    },
    "categories": {
        "performance": {
            "score": "score",
        },
        "pwa": {
            "score": "score",
        },
        "accessibility": {
            "score": "score",
        },
        "best-practices": {
            "score": "score",
        },
        "seo": {
            "score": "score",
        }
    }
}

module.exports = {
    reportKeys
}
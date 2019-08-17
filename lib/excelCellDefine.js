const styles = {
    headerDark: {
        fill: {
            fgColor: {
                rgb: 'FF000000'
            }
        },
        font: {
            color: {
                rgb: 'FFFFFFFF'
            },
            sz: 14,
            bold: true,
            underline: true
        },
        alignment: {
            wrapText: true
        }
    },
    cellPink: {
        fill: {
            fgColor: {
                rgb: 'FFFFCCFF'
            }
        }
    },
    cellGreen: {
        fill: {
            fgColor: {
                rgb: 'FF00FF00'
            }
        }
    }
};

const heading = [];

const merges = []


const generateSpecification = (colummNames) => {
    const specification = {};
    for (let i in colummNames) {
        specification[i] = {
            displayName: i.split('|').join('|\n'),
            headerStyle: styles.headerDark,
            width: 120
        }
    }
    return specification;
}


module.exports = {
    heading,
    generateSpecification,
    merges,
}
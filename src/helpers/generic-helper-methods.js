const upperFirstChar = string => string.charAt(0).toUpperCase() + string.slice(1);

const flattenObject = (obj, prefix = '') =>
    Object.keys(obj).reduce((acc, k) => {
        const pre = prefix.length ? prefix + '.' : '';
        if (typeof obj[k] === 'object') {
            Object.assign(acc, flattenObject(obj[k], pre + k));
        }
        else {acc[pre + k] = obj[k];}
        return acc;
    }, {});

const createUnionsOfArrays = arr => {
    const arrCopy = arr.slice();
    const combo = arrCopy.reduce((a, e) => [...a, ...e], []);
    return [...new Set(combo)];
};

const getLastElementFromPattern = (string, symbol) => string.split(symbol).slice(-1)[0];

const getDisplayItemFromPath = pathName => getLastElementFromPattern(pathName, '/');

const parseKeyname = keyPath => getLastElementFromPattern(keyPath, '.');

const formatTitleNames = inputString => inputString
    .replace(/(submission)/g, '')
    .split('-')
    .map(word => upperFirstChar(word))
    .join(' ');

module.exports = {
    upperFirstChar,
    flattenObject,
    createUnionsOfArrays,
    getDisplayItemFromPath,
    parseKeyname,
    formatTitleNames
};

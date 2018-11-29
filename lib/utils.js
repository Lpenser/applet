

'use strict';

const fs = require('fs');
const JSON5 = require('json5');
exports.readJSON = function readJSON(file) {
    let data = fs.readFileSync(file, 'utf8');
    return JSON.parse(data);
};

/**
 * 读取JSON5文件
 * @param file
 */
exports.readJSON5 = function readJSON5(file) {
    let data = fs.readFileSync(file, 'utf8');
    return JSON5.parse(data);
};

exports.writeJson = function writeJson(file, data) {
    return fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

exports.readDir = function readDir (path, callBack) {
    fs.readdir(path, function (err, menu) {
        if (!menu)
            return;
        menu.forEach(function (ele) {
            fs.stat(path + "/" + ele, function (err, info) {
                if (info.isDirectory()) {
                    readDir(path + "/" + ele, callBack);
                } else {
                    callBack(path + "/" + ele)
                }
            })
        })
    })
}  

exports.mkdir = function(path, callBack) {
    if (fs.existsSync(path)) {
        return false;   
    }
    fs.mkdirSync(path);
    return true;
}
 

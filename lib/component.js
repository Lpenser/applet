
const tool = require('./utils');
const chalk = require('chalk');
const path = require("path");

const fs = require('fs-extra');
function page(name) {
    const pathname = path.join(process.cwd(), name);
    const exit = tool.mkdir(pathname);
    if (!exit) {
        console.log(chalk.red('文件已经存在'))
        return false;
    }
    const rootDir = path.join(__dirname, '../template/comT');
    fs.copy(rootDir, pathname)
    .then(() => {
        tool.readDir(pathname, (filePath) => {
            let newPath = filePath.replace(/comT/g, name);
            fs.rename(filePath, newPath);
            fs.remove(filePath);
        })
    })
    .catch(err => console.error(err))

}

module.exports = page
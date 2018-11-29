
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
    const rootDir = path.join(__dirname, '../template/pageT');
    fs.copy(rootDir, pathname)
    .then(() => {
        tool.readDir(pathname, (filePath) => {
           /* 根据项目名称，替换文件项目的名称 */
            let readMetxt = fs.readFileSync(filePath);
            const $name = name.substring(0,1).toUpperCase( ) + name.substring(1); 
            let readMetxtStr = readMetxt.toString().replace(/PageT/g, $name).replace(/pageT/g, name);
            fs.writeFile(filePath, (new Buffer(readMetxtStr)), function (err) {if (err) throw err})
            let newPath = filePath.replace(/pageT/g, name);
            fs.rename(filePath, newPath);
            fs.remove(filePath);
        })
    })
    .catch(err => console.error(err))

}

module.exports = page
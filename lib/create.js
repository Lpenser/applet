'use strict'
const chalk = require('chalk');
const path = require("path");
const exec = require('child_process').exec;
const tool = require('./utils');
const gitClone = require('download-git-repo');
const ora  = require("ora");


function create(name) {
    const rootDir = path.join(process.cwd(), name);
    const template = 'lpenser/applet-template';
    getTemplate(template, rootDir)
    .then(res => {
        console.log(chalk.green('初始化环境配置...'));
        const pkg = tool.readJSON(rootDir + '/project.config.json');
        pkg.projectname = name;
        tool.writeJson(rootDir + '/project.config.json', pkg);
        console.log(chalk.green('生成项目成功'));
        console.log(chalk.green('请用微信小程序打开,并配置'));
    })
   
}


function getTemplate(template, templateDir) {
    const spinner = ora('正在下载模板').start();
    return new Promise((resolve, reject) => {
        gitClone(template, templateDir, function (err) {
            spinner.stop();
            resolve();
            if (err) {
                console.log('Failed to download repo ' + template + ': ' + err.message.trim());
                reject();
            }
          })
    })
}

module.exports = create
#!/usr/bin/env node
'use strict'
// 定义脚手架的文件路径
process.env.NODE_PATH = __dirname + '/../node_modules/'
const program = require('commander');
const updateNotifier = require('update-notifier');
const pkg = require('../package.json');

updateNotifier({pkg}).notify();
// 定义当前版本
program
    .version(require('../package').version)
    .option('-p, --page [name]', 'Add page')
    .option('-c, --component [name]', 'Add component')

// 定义使用方法
// program
//     .usage('<command>')

program
    .command('new <name>')
    .description('创建项目')
    .action((name) => {
        require('../lib/create')(name)
    });
    

program.parse(process.argv)

if (program.page) {
    require('../lib/page')(program.page)
}
if (program.component) {
    require('../lib/component')(program.component)
}
const defalutConfig = {
    page:1,
    args:1,
    component: 1
};
const resule = Object.keys(defalutConfig).some(item =>{
    if (program[item] instanceof Array) {
        return program[item].length 
    }else {
        return program[item]
    }
})

if (!resule) {
    program.help()
}
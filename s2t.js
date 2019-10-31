
const fs =require('fs');
const cn = require('chinese-s2t');
const chalk = require('chalk')
const log = console.log

const excludes = [`${__dirname}/node_modules`, `${__dirname}/.git`]

const isDir = arg => fs.statSync(arg).isDirectory()

const getFileList = (path) => {
  let arr = fs.readdirSync(path).map(i => `${path}/${i}`).filter(i => !excludes.includes(i))
  
  arr.forEach(i => {
    if(isDir(i)){
      arr = arr.filter(j => j!==i )
      
      let newArr = getFileList(i)
      if(newArr&&newArr.length>0){
        arr.push(...newArr)
      }
    }
  })
  return arr
}

const main = () => {
  let fileList = getFileList(__dirname);
  let length = fileList.length;
  log(chalk.green(`共找到${length}個文件`));
  fileList.forEach((i,index) => {
    let str = fs.readFileSync(i,'utf8')
    fs.writeFileSync(i,cn.s2t(str))
    log(chalk.green(`完成${index+1}/${length}`))
  })
  log(chalk.green('全部完成'))
}

main()

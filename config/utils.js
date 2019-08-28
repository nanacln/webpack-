const glob = require('glob')
// const path = require('path')
exports.getEntry = function () {
  const entry = {}
  // 读取src目录所有page入口
  glob.sync('../src/pages/*/*.js').forEach((name) => {
    const start = name.indexOf('src/') + 4;
    const end = name.length - 3;
    const eArr = [];
    const n = name.slice(start, end).split('/')[1];
    eArr.push(name);
    // eArr.push('@babel/polyfill'); // 引入这个，是为了用async await，一些IE不支持的属性能够受支持，兼容IE浏览器用的
    entry[n] = eArr;
  })
  return entry;
}
exports.getEntry2 = function (globPath) {
    var entries = {}, tmp, pathname
  
    glob.sync(globPath).forEach(function (entry) {
      tmp = entry.split('/').splice(-3)
      pathname = tmp.splice(1, 1).toString().toLowerCase()
      entries[pathname] = entry
    })
    return entries
  }
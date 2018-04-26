const electron = require('electron')
const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const {ipcMain} = require('electron')

const {dialog} = require('electron')


var yourfileDirPath="D:\\tinypngDist"


app.setName("tinyPng压缩")
  
  function createWindow () {
    // 创建一个窗口.
    win = new BrowserWindow({width: 800, height: 600})
    win.setMenu(null)
  
    // 然后加载应用的 index.html。
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    }))




  }
  
  app.on('ready', createWindow)



  ipcMain.on('asynchronous-message', (event, arg) => {
    //console.log(arg)  // prints "ping"

    dialog.showOpenDialog({properties: ['openDirectory']},function(filePaths){
        event.sender.send('asynchronous-reply', filePaths)
    })
    
  })



  ipcMain.on('asynchronous-message-openFolder', (event, arg) => {
    //console.log(arg)  // prints "ping"

    dialog.showOpenDialog({properties: ['openFile,multiSelections'],defaultPath:yourfileDirPath},function(filePaths){
        // event.sender.send('asynchronous-reply', filePaths)
    })
    
  })
  
  // ipcMain.on('synchronous-message', (event, arg) => {
  //   console.log(arg)  // prints "ping"
  //   event.returnValue = 'pong2'
  // })
import {
  app,
  BrowserWindow,
  ipcMain
} from 'electron'
import { debug } from 'util';


/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
	mainWindow = new BrowserWindow({
		height: 670,
		width: 1002,
		useContentSize: true,
		webPreferences: { webSecurity: false }, // 可实现跨域
		frame: false // 去掉浏览器头
	})

	mainWindow.loadURL(winURL)

	mainWindow.on('closed', () => {
		mainWindow = null
	})
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})


ipcMain.on('window-all-closed', () => {
	app.quit()
})
// 最小化
ipcMain.on('hide-window', () => {
	mainWindow.minimize()
})
// 最大化
ipcMain.on('show-window', () => {
	mainWindow.maximize()
})
// 还原
ipcMain.on('orignal-window', () => {
	mainWindow.unmaximize()
})


// 打开登录界面
var loginWindow = null;
var loginURL = 'http://localhost:9080/#/login'
ipcMain.on('open-login-window', () => {
	if (loginWindow) {
		return
	}

	loginWindow = new BrowserWindow({
		width: 350,
		height: 500,
		frame: false, 	// 去掉浏览器头
		useContentSize: true,
	})
	console.log(loginWindow);

	loginWindow.loadURL(loginURL);

	loginWindow.on('closed', function () {
		loginWindow = null;
	});
})

// 关闭登录界面
ipcMain.on('close-login-window', () => {
	if (loginWindow) {
		loginWindow.close()
	}
})



// ipcRenderer.on('close-main-window', function () {
//     app.quit();
// });

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */

import _ from 'lodash'
import XLSX from 'xlsx'
import templates from './temp.json'

async function importXlsxToJson (file, beforeCb) {
  if (beforeCb !== undefined && typeof beforeCb === 'function') {
    beforeCb()
  }

  let fileReader = new window.FileReader()

  return new Promise((resolve, reject) => {
    fileReader.onload = (ev) => {
      try {
        var data = ev.target.result
        // 以二进制流方式读取得到整份excel表格对象
        let workbook = XLSX.read(data, {
          type: 'binary'
        })

        let sheetName = workbook.SheetNames[0]
        let json = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {header: 1})
        resolve(json)
      } catch (e) {
        reject(e)
      }
    }

    fileReader.readAsBinaryString(file)
  })
}

async function exportJsonToXlsx (fileName, json, sheetName = 'default') {
  let sheet = XLSX.utils.json_to_sheet(json)
  let workbook = {
    SheetNames: [sheetName],
    Sheets: {
      [sheetName]: sheet
    }
  }
  let wbout = XLSX.write(workbook, {
    bookType: 'xlsx', // 要生成的文件类型
    bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
    type: 'binary'
  })
  let blob = new window.Blob([stringToBuffer(wbout)], {type: 'application/octet-stream'})

  openDownloadDialog(blob, `${fileName}.xlsx`)
}

// @workbook 为 XlsxToJson 后的 json 格式的 sheet
// @headers 类型为 json，如 {'仓库名称': '广州仓', '货位号': 'L-01-01-01'}
function checkXlsxTemplate (sheet, template) {
  let templateHeaders = _.keys(template)
  // 取第一行分析“表头”即可
  let headers = sheet[0]
  // 模板表头的每一项，在所导入 sheet 中，都必须存在
  let invalid = _.some(templateHeaders, h => !_.includes(headers, h))
  return !invalid
}

function getTemplate (templateName) {
  let data = _.find(templates, ['key', templateName])
  return (data === undefined) ? null : data
}

function getTemplateList () {
  return templates
}

// 字符串转ArrayBuffer
function stringToBuffer (s) {
  var buf = new ArrayBuffer(s.length)
  var view = new Uint8Array(buf)
  for (var i = 0; i !== s.length; ++i) {
    view[i] = s.charCodeAt(i) & 0xFF
  }
  return buf
}

function openDownloadDialog (url, saveName) {
  if (typeof url === 'object' && url instanceof window.Blob) {
    // 创建blob地址
    url = window.URL.createObjectURL(url)
  }
  let aLink = document.createElement('a')
  aLink.href = url
  // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
  aLink.download = saveName || ''
  let event
  if (window.MouseEvent) {
    event = new window.MouseEvent('click')
  } else {
    event = document.createEvent('MouseEvents')
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
  }
  aLink.dispatchEvent(event)
}

export default {
  importXlsxToJson,
  exportJsonToXlsx,
  checkXlsxTemplate,
  getTemplate,
  getTemplateList
}
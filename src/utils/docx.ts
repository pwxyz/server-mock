

//提供docx文件

import officegen from 'officegen';
import fs from 'fs'
import get from 'lodash/get'
import path from 'path'


interface ApiArg {
  router: string
  method: string,
  req: object
  res: object
}

const getDocx = async (data: any, name: string) => {
  let docx = officegen('docx')

  // Officegen calling this function after finishing to generate the docx document:
  docx.on('finalize', function (written) {
    console.log(
      'Finish to create a Microsoft Word document.'
    )
  })

  // Officegen calling this function to report errors:
  docx.on('error', function (err) {
    console.log(err)
  })
  let pObj = docx.createP()
  pObj.addText(name, { font_size: 30, align: 'center' })
  pObj = docx.createP()
  pObj.addText('注意:  acces-token位于headers中，为默认情况，不在下方进行展示；同时get、delete请求参数位于url上面，post、put请求参数位于body上；req中出现?时表示为非必要参数。')

  const setP = (obj?: ApiArg) => {
    pObj = docx.createP()
    pObj.addText(`路由: ${get(obj, 'router')}`, { font_size: 20 })
    pObj = docx.createP()

    pObj.addText(`方法: ${get(obj, 'method')}`)
    pObj = docx.createP()
    pObj.addText(`请求参数: ${JSON.stringify(get(obj, 'req'), null, 2)}`)
    pObj = docx.createP()
    pObj.addText(`返回参数: ${JSON.stringify(get(obj, 'res'), null, 2)}`)
  }

  data.map(i => setP(i))

  let url = path.join(__dirname, `../../file/${name}.docx`)
  let out = fs.createWriteStream(url)
  out.on('error', function (err) {
    console.log(err)
  })

  // Async call to generate the output file:
  await docx.generate(out)

  return url
}

export default getDocx


//护网蜜罐 ids 态势  项目所用加解密文件
import CryptoJS from "crypto-js"




//加密的密鑰
const getSecretKey = () => {
  return "1234567812345678"
}
//加密的IV
const getIV = () => {
  return "1234567812345678"
}

const getFinalKey = () => CryptoJS.enc.Latin1.parse(getSecretKey())

const getOption = () => (
  {
    mode: CryptoJS.mode.CBC,
    iv: CryptoJS.enc.Latin1.parse(getIV()),
    padding: CryptoJS.pad.ZeroPadding
  }
)
//將輸入的字符串內容進行加密
export const encrypt = (message: string) => {

  if (typeof message !== 'string') {
    console.error('encrypt argument should typeof string!!!')
    return ''
  }

  return CryptoJS.AES.encrypt(
    message,
    getFinalKey(),
    getOption()
  ).toString()

}
//將輸入的字符串進行解密
export const decrypt = (message: string) => {

  if (typeof message !== 'string') {
    console.error('decrypt argument should typeof string!!!')
    return ''
  }


  return CryptoJS.AES.decrypt(
    message,
    getFinalKey(),
    getOption()
  ).toString(CryptoJS.enc.Utf8)
}
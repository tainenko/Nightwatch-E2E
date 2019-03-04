var tesseract = require('node-tesseract')
var webdriver = require('selenium-webdriver')

var loginCommands = {
  getOCRwithTess: function(filepath) {
    //implement here,TODO:圖片優化,tesseract辨識
      const tesseract = require('node-tesseract');
      const gm=require('gm')
      const image = fs.readFileSync("temp.png").toString("base64");

  }
  saveValidcodeImg: function(){
      const image=this.imgValidCode.takeScreenshot();
      fs.writeFileSync('temp.png',image,'base64');
      return image;
  }
  getOCRwithbaiduApi: function(filepath){
      /*
        帳號：etmall_sdet
        密碼:okmwsx12345E
        手機:0966440268
        DOC:https://cloud.baidu.com/doc/OCR/OCR-Python-SDK.html#.E9.85.8D.E7.BD.AEAipOcr
        APP_ID = '你的 App ID'
        API_KEY = '你的 Api Key'
        SECRET_KEY = '你的 Secret Key'
        client = AipOcr(APP_ID, API_KEY, SECRET_KEY)
        返回格式範例：
        {
        "log_id": 2471272194,
        "words_result_num": 2,
        "words_result":
            [
            {"words": " TSINGTAO"},
            {"words": "青島睥酒"}
            ]
        }
      */
      const APP_ID = "15428109";
      const API_KEY = "11L9VfvOweGpVgs8omxorLTK";
      const SECRET_KEY = "6eNlH8yNuFGC4n7q2kNFgp04hqlrwgnr";
      // 新建一個baidu-aip的對象
      const client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);
      const image = fs.readFileSync("temp.png").toString("base64");
      client.generalBasic(image);
      console.log(result.words_result[0].words);
      //回傳驗証碼OCR結果
      return result.words_result[0].words;
  }
};

module.exports = {
    url: function(){
        return this.api.launchurl+'/Login?url=%2F'
    }
    commands: [loginCommands],
    elements: {
        inputLoginId: '#loginID',
        inputPassward: '#password',
        inputValidCode: '#validCode',
        imgValidCode: '#CheckPWDIMG',
        loginButton: '#login'
    }
};

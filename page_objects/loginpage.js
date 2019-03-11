var fs=require('fs');
const AipOcrClient = require("baidu-aip-sdk").ocr;

var loginCommands = {
    getOCRwithbaiduApi: function (imgPath) {
        /**
         * 帳號:etmall_sdet
         * 密碼:okmwsx12345E
         * 手機:0966440268
         * DOC:https://cloud.baidu.com/doc/OCR/OCR-Python-SDK.html#.E9.85.8D.E7.BD.AEAipOc
         * APP_ID = '你的 App ID'
         * API_KEY = '你的 Api Key'
         * SECRET_KEY = '你的 Secret Key'
         * client = AipOcr(APP_ID, API_KEY, SECRET_KEY)
         * 返回格式範例：
         * {
         * "log_id": 2471272194,
         * "words_result_num": 2,
         * "words_result":
         * [
         * {"
         * {"words": "青島睥酒"}
         * ]
         * }
         */
        const APP_ID = '15428109';
        const API_KEY = '11L9VfvOweGpVgs8omxorLTK';
        const SECRET_KEY = '6eNlH8yNuFGC4n7q2kNFgp04hqlrwgnr';
        // 新建一個baidu-aip的對象
        const client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);
        const image = fs.readFileSync(imgPath).toString('base64');
        client.generalBasic(image).then(function(result) {
            //回傳驗証碼OCR結果
            var res = result.words_result[0].words;
            return res;
        }).catch(function(err) {
            // 如果發生網路錯誤
            console.log(err);
        });
    },
    setValidCode: function(imgPath) {
        var res=this.getOCRwithbaiduApi(imgPath);
        return this.setValue('@inputValidCode',res);
    }
};
module.exports = {
    url: function(){
        return this.api.launchUrl+'/Login?url=%2F';
    },
    elements: {
        inputLoginId: '#loginID',
        inputPassward: '#password',
        inputValidCode: '#validCode',
        imgValidCode: '#CheckPWDIMG',
        loginButton: '#login'
    },
    commands: [loginCommands]
};

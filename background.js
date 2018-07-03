(() => {
  chrome.contextMenus.create({
    "type": "normal",
    "title": "日本語に翻訳",
    "contexts" : ["selection"],
    "onclick": function(info) {
        let url = encodeURI(`https://script.google.com/macros/s/AKfycbzGc0s6NxcvV3CctOFxluVXYhiQJX_Wfuwo9OYn369BYyBSZltq/exec?text=${info.selectionText}&source=auto&target=ja`);
        console.log(url);
        console.log(info.selectionText);
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
               let data = xhr.responseText;
               if (xhr.status == 200) {
                let u8 = new Uint8Array(data);
                let isSJIS = Encoding.detect(u8, 'SJIS');  

                if (isSJIS) {
                    let du8 = Encoding.detect(u8); // (A)
                    let cu8 = Encoding.convert(u8, "UTF8", du8); 
                    let su8 = Encoding.codeToSting(cu8); // (B) 
                    console.log(su8);
                    alert(su8);
                } else {
                    console.log(data);
                    alert(data);
                }
               } else {
                alert("通信に失敗しました");
               }
          }
        }
        xhr.send();
    }
  });
})();
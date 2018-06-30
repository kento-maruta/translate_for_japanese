(function() {
  chrome.contextMenus.create({
    "type": "normal",
    "title": "日本語に翻訳",
    "contexts" : ["selection"],
    "onclick": function(info, tab) {
        var url = "https://script.google.com/macros/s/AKfycbzGc0s6NxcvV3CctOFxluVXYhiQJX_Wfuwo9OYn369BYyBSZltq/exec?text=" + info.selectionText + "&source=auto&target=ja";
        console.log(url);
        console.log(info.selectionText);
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
               var data = xhr.responseText;
               if (xhr.status == 200) {
                var u8 = new Uint8Array(data);
                var isSJIS = Encoding.detect(u8, 'SJIS');  

                if (isSJIS) {
                    var du8 = Encoding.detect(u8); // (A)
                    var cu8 = Encoding.convert(u8, "UTF8", du8); 
                    var su8 = Encoding.codeToSting(cu8); // (B) 
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
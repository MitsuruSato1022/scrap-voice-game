async function createTag(res) {
  const sheet = await SpreadsheetApp.getActiveSheet();
  // タグを代入する変数
  var dataTag = String();
  var explainTag = String();
  var memoryTag = String();
  // 基本データをタグ用文字列に変換
  for(let i = res.dataStR;i<parseInt(res.dataStR)+parseInt(res.dataEndR);i++){
    // 項目（名前、性別など）
    var sec = sheet.getRange(i,1).getValues();
    // 項目の値（ジュン、男など）
    var value =sheet.getRange(i,2).getDisplayValues();
    // 値が日付型の場合、表記を定める。(残念ながら型判定がobject arrayとなって無効)
    if(Object.prototype.toString.call(value) === "[object Date]")
    {
      value = Utilities.formatDate(value,"JST", "yyyy年MM月dd");
    }
    dataTag = dataTag +"【"+ sec +"】"+ value + '&lt;br /&gt;\n';
  }
  // 説明文をタグ用文字列に変換
  var explainRange=sheet.getRange(res.explainStR, 1, res.explainEndR, 1).getValues();
for await (row of explainRange){
    explainTag = explainTag + row + '&lt;br /&gt;\n';
  };
    // 記憶の景色をタグ用文字列に変換
      var memoryRange=sheet.getRange(res.memoryStR, 1, res.memoryEndR, 1).getValues();
      // 一つ目の値を<p>として
  memoryTag= memoryTag + '<p>&lt;p&gt;'+memoryRange[0]+'&lt;/p&gt;</p>';
  // 二つ目以降の値を<img>として
  for(let i=1 ;i<memoryRange.length;i++){
    memoryTag= memoryTag + '&lt;img src="'+memoryRange[i] + '"/&gt;';
  }
  // ３つのタグ用文字列を結合
  var html=`<p>&lt;p&gt;${dataTag}&lt;/p&gt;</p>`;
  html = html + `<p>&lt;p&gt;${explainTag}&lt;/p&gt;</p>`;
  html = html + memoryTag;
  var htmlOutput = await HtmlService.createHtmlOutput(html);
  await SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'タグ生成');
}

function charTagForm() {
  const html = "<form><p>基本データ</p><input type='number' name='dataStR' placeholder='最初の行'><input type='number' name='dataEndR' placeholder='何行分'><p>説明文</p><input type='number' name='explainStR' placeholder='最初の行'><input type='number' name='explainEndR' placeholder='何行分'><p>記憶に残っている風景</p><input type='number' name='memoryStR' placeholder='最初の行'><input type='number' name='memoryEndR' placeholder='何行分'><input type='submit' onclick='google.script.run.createTag(this.parentNode);'></form>";
  var htmlOutput = HtmlService.createHtmlOutput(html);
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'pタグ生成');
}


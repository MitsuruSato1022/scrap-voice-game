async function createPTag(res) {
  const sheet = await SpreadsheetApp.getActiveSheet();
  const rows = sheet.getRange(res.start, 1, res.end, 1).getValues();
  var p = String();
  for await (row of rows){
    p = p + row + '&lt;br /&gt;\n';
    console.log(row);
  };
  var htmlOutput = await HtmlService.createHtmlOutput(`<p>&lt;p&gt;${p}&lt;/p&gt;</p>`);
  await SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'pタグ生成');
}

function pTagForm() {
  const html = "<form><input type='number' name='start' placeholder='最初の行'><input type='number' name='end' placeholder='何行分'><input type='submit' onclick='google.script.run.createPTag(this.parentNode);'></form>";
  var htmlOutput = HtmlService.createHtmlOutput(html);
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'pタグ生成');
}


function onOpen() {
	SpreadsheetApp.getUi()
		.createMenu("開発")
		.addItem("pタグ作成(性格・生い立ち)", "pTagForm")
    .addItem("プロフィール出力", "charTagForm")
		.addToUi();
}
/*
一気にシンボル変換.jsx
Copyright (c) 2015 Toshiyuki Takahashi
Released under the MIT license
http://opensource.org/licenses/mit-license.php
http://www.graphicartsunit.com/
ver. 0.2.0
*/
(function() {

	var SCRIPT_TITLE = '一気にシンボル変換';
	var SCRIPT_VERSION = '0.2.0';

	// Settings
	var settings = {
		'registrationPoint' : SymbolRegistrationPoint.SYMBOLCENTERPOINT
	};
	// 登録するシンボルの原点を変えたいときは「registrationPoint」の値を変更する
	// SymbolRegistrationPoint.SYMBOLTOPLEFTPOINT
	// SymbolRegistrationPoint.SYMBOLTOPMIDDLEPOINT
	// SymbolRegistrationPoint.SYMBOLTOPRIGHTPOINT
	// SymbolRegistrationPoint.SYMBOLMIDDLELEFTPOINT
	// SymbolRegistrationPoint.SYMBOLCENTERPOINT
	// SymbolRegistrationPoint.SYMBOLMIDDLERIGHTPOINT
	// SymbolRegistrationPoint.SYMBOLBOTTOMLEFTPOINT
	// SymbolRegistrationPoint.SYMBOLBOTTOMMIDDLEPOINT
	// SymbolRegistrationPoint.SYMBOLBOTTOMRIGHTPOINT

	var doc = app.activeDocument;
	var lay = doc.activeLayer;
	var sel = doc.selection;
	var errorFlag = false;

	// Prototype of target symbol
	function SymbolItem(targetObj) {
		this.target = targetObj;
		this.init();
		return this;
	}
	SymbolItem.prototype.init = function() {
		if(this.target.name) {
			this.setProperties({name:this.target.name});
		}
	}
	SymbolItem.prototype.setProperties = function(obj) {
		for(var key in obj) {
			this[key] = obj[key];
		}
	}
	SymbolItem.prototype.replaceSymbol = function(obj) {
		if(this.symbol) {
			var addedSymbol = lay.symbolItems.add(this.symbol);
			var tb = this.target.geometricBounds;
			var sb = addedSymbol.geometricBounds;
			addedSymbol.top = this.target.top;
			addedSymbol.left = this.target.left;
			addedSymbol.selected = true;
			this.target.remove();
		} else {
			throw('シンボルを配置できませんでした');
		}

	}
	SymbolItem.prototype.addSymbol = function() {
		try {

		} catch(e) {

		}
		var symbolRef = app.activeDocument.symbols.add(this.target, settings.registrationPoint);
		var count = 2;
		var fixedName = this.name;
		if(this.name) {
			while(searchSymbolName(fixedName)) {
				fixedName = this.name + '_' + String(count);
				count++;
			}
			symbolRef.name = fixedName;
		}
		this.setProperties({symbol:symbolRef});
		this.replaceSymbol();
	}

	if (!doc || sel.length < 1) {
		alert('オブジェクトが選択されていません\n少なくとも1つ以上のオブジェクトを選択してください');
	} else {
		try {
			mainProcess();
		} catch(e) {
			alert('エラーが発生して処理を実行できませんでした\nエラー内容：' + e);
		}
	}

	// Main Process
	function mainProcess() {
		var targetitems = getGroupItems(sel);
		if (errorFlag) {
			if(!confirm('シンボルに登録できないアイテム（リンク画像、メッシュオブジェクト）が含まれている可能性があります。続行しますか？')) return
		}
		for (var i = 0; i < targetitems.length; i++) {
			targetitems[i].addSymbol();
		}
	}

	// Get group items
	function getGroupItems(items) {
		var enableItems = [];
		for (var i = 0; i < items.length; i++) {
			if (items[i].typename == 'GroupItem' && items[i].placedItems.length == 0 && items[i].pluginItems.length == 0) {
				var tmpItem = new SymbolItem(items[i]);
				enableItems.push(tmpItem);
			} else if (items[i].typename == 'GroupItem' && (items[i].placedItems.length > 0 || items[i].pluginItems.length > 0)) {
			 	errorFlag = true;
			}
		}
		return enableItems;
	}

	// Search symbol name
	function searchSymbolName(Str) {
		var symbols = app.activeDocument.symbols;
		var names = [];
		var flag = false;
		for (var i = 0; i < symbols.length; i++) {
			names.push(symbols[i].name);
		}
		for(var key in names) {
			if(names[key] == Str) {
				flag = true;
				break;
			}
		}
		return flag;
	}

}());

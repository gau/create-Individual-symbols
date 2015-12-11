# README

Illustratorのグループを一気にシンボルへ変換するスクリプトです。（[図入りの解説](http://graphicartsunit.tumblr.com/post/134977388379/create-Individual-symbols)）

-----

### 更新履歴

* 0.2.0：内部的な処理を改善（公開）
* 0.1.0：新規作成

-----

### 対応バージョン

* Illustrator CS5／CS6／CC／CC 2014／CC 2015（19.2.0は未検証）

-----

### インストール方法

1. 以下の場所に、「一気にシンボル変換.jsx」をコピーします。Windows版ではお使いのIllustratorのモードによって保存する場所が異なりますのでご注意ください。
	【Mac】/Applications/Adobe Illustrator {バージョン}/Presets/ja_JP/スクリプト/
	【Win32】C:\Program Files\Adobe\Adobe Illustrator {バージョン}\Presets\ja_JP\スクリプト\
	【Win64】C:\Program Files\Adobe\Adobe Illustrator {バージョン} (64 Bit)\Presets\ja_JP\スクリプト\　または　C:\Program Files (x86)\Adobe\Adobe Illustrator {バージョン}\Presets\ja_JP\スクリプト\
2. Illustratorを再起動します。
3. `ファイル > スクリプト > 一気にシンボル変換`と表示されていればインストール成功です。

-----

### 使い方

1. シンボルに変換したい**グループ**を選択します。（複数可）
2. `ファイル > スクリプト > 一気にシンボル変換`を選択します。
3. 選択した中からグループだけがシンボルへ登録されます。

-----

### 普通に複数オブジェクトをシンボルに登録すると

<div class="fig center"><img src="http://www.graphicartsunit.com/saucer/images/create-Individual-symbols/fig01.png" alt="標準で複数オブジェクトをシンボルに登録すると" class="noshadow"></div>

複数オブジェクトを選択した状態でシンボル登録すると、当然それらすべてをひとつのシンボルとして登録してしまいます。これらを個別にするときは、ひとつひとつを手作業で登録していく必要があります。2つ、3つくらいならいいですが、数が多くなるととても大変です。

-----

### スクリプトを使うと

<div class="fig center"><img src="http://www.graphicartsunit.com/saucer/images/create-Individual-symbols/fig02.png" alt="スクリプトを使うと" class="noshadow"></div>

選択したものの中からグループだけを抽出し、グループ単位で個別のシンボルに登録します。標準だとシンボルの数だけ繰り返していた作業が一度で終わるので便利です。

-----

### シンボル名について

<div class="fig center"><img src="http://www.graphicartsunit.com/saucer/images/create-Individual-symbols/fig03.png" alt="スクリプトを使うと" class="noshadow"></div>

グループに名称が設定されていないときは、デフォルトと同様に「新規シンボル [連番]」という名前で登録されていきます。［レイヤーパネル］であらかじめグループに名称を設定しているときは、その名称を優先して使用します。同じ名前が複数ある場合は、「_[連番]」が末尾に付加されます。

-----

### シンボルの原点を変更する

標準だと、シンボルの原点はすべてセンターとして登録されます。これを変更したいときは、スクリプトの16行目にある「registrationPoint」の値を変更してください。値は下記の通りです。

| 値 | 原点位置 |
|:-----------|:------------:|
| SymbolRegistrationPoint.SYMBOLTOPLEFTPOINT | 左上 |
| SymbolRegistrationPoint.SYMBOLTOPMIDDLEPOINT | 中央上 |
| SymbolRegistrationPoint.SYMBOLTOPRIGHTPOINT | 右上 |
| SymbolRegistrationPoint.SYMBOLMIDDLELEFTPOINT | 左中 |
| SymbolRegistrationPoint.SYMBOLCENTERPOINT | 天地中央（初期値） |
| SymbolRegistrationPoint.SYMBOLMIDDLERIGHTPOINT | 右中 |
| SymbolRegistrationPoint.SYMBOLBOTTOMLEFTPOINT | 左下 |
| SymbolRegistrationPoint.SYMBOLBOTTOMMIDDLEPOINT | 中央下 |
| SymbolRegistrationPoint.SYMBOLBOTTOMRIGHTPOINT | 右下 |

例：左上基準のとき）`'registrationPoint' : SymbolRegistrationPoint.SYMBOLTOPLEFTPOINT`

-----

### シンボルに変換できないグループ

グループ内にシンボルに登録できない要素（リンク画像やメッシュオブジェクトなど）が含まれるときは、事前に警告を表示します。そのまま継続した場合、それらのグループは無視されます。

-----

### 注意

* グループ以外のオブジェクトは無視します。
* クリッピンググループ（クリッピングマスクのセット）もグループとして判別します。
* 選択オブジェクトの数が多いと、処理に時間がかかることがあります。
* 19.2.0から搭載されたダイナミックシンボル、スタティックシンボルでの検証は行っていません。

-----

### 免責事項

* このスクリプトを使って起こったいかなる現象についても制作者は責任を負えません。すべて自己責任にてお使いください。
* CS5、CS6、CC、CC 2014、CC 2015（19.1.0まで）で動作の確認はしましたが、OSのバージョンやその他の状況によって実行できないことがあるかもしれません。もし動かなかったらごめんなさい。

-----

### ライセンス

* 一気にシンボル変換.jsx
* Copyright © 2015 Toshiyuki Takahashi
* [Released under the MIT license](http://opensource.org/licenses/mit-license.php)
* Created by Toshiyuki Takahashi ([Graphic Arts Unit](http://www.graphicartsunit.com/))
* [Twitter](https://twitter.com/gautt)

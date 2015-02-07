## Install

Gruntのタスクを実行するために必要な物をインストールします。

```sh
npm install
```

## Gruntのタスクを実行する

jQueryなどのライブラリを圧縮してしまうと、ライセンス表記が消えてしまったり、予期せぬことが起きる場合があるので、結合するだけにしています。

`Gruntfile.js`の中にある以下の記述部分ですが、

```
src: [
  'src-js/script-1.js',
  'src-js/script-2.js',
  'src-js/script-3.js'
],
```

この順序でJSが結合されます。もし実行順序がある場合は、その順序で書くようにしてください。

## 圧縮・結合されたJSを生成する

```sh
grunt build_siteA_js
```

## 圧縮・結合されたJSからShift_JIS版JSを生成する

ファイルをコピーする`grunt-contrib-copy`を使い、ファイルをコピーする途中で`iconvLite`を使い、文字コードの変換を行います。

```sh
grunt build_siteA_sjis_js
```

と、UTF-8からShift_JISに文字コードを変換したJSを作成しているのですが...
読み込まれるページと読み込むファイルの文字コードが違う場合、読み込むファイルの文字コードを`script要素`の`charset属性`に指定することで、異なる文字コードのファイルを読み込む事が可能になります。具体的には以下の様なコードになります。

```html
<meta charset="Shift_JIS">
<script src="script-utf-8.js" charset="utf-8"></script>
```

HTMLファイルもUTF-8からShift_JISに変換することは可能ですが、文字コードを変換する際に、変換後の文字コードに存在しない文字がある場合は、エラーが発生します。ご利用は計画的に...

## JSの変更を感知して、Shift_JIS版JSを生成する

```sh
grunt
```

※watchを止める場合は、`Ctrl+C`などで止めることができます

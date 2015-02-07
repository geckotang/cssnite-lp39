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

### サイトA用の圧縮・結合されたJSを生成する

```sh
grunt build_siteA_js
```

### サイトB用の圧縮・結合されたJSを生成する

```sh
grunt build_siteB_js
```

### 両方サイトの圧縮・結合されたJSを生成する

```sh
grunt build_js
```

### JSの変更を感知して、両サイトのJSを生成する

```sh
grunt
```

※watchを止める場合は、`Ctrl+C`などで止めることができます

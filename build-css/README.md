## Install

まず、Sassなどを実行するためにRubyが必要です。また、Sassなどのバージョンを管理するためにBundlerを使用します。それらのインストールについては割愛しますが、便利なので、ぜひこれを機にインストールをしてみてください。

sassとcompassをプロジェクトローカルにインストールします。

```sh
bundle install --without=production --path vendor/bundle
```

次に、Gruntのタスクを実行するために必要な物をインストールします。

```sh
npm install
```

## Gruntのタスクを実行する

### 圧縮されていないCSSを生成する

```sh
grunt build_siteA_css
```

### 圧縮されたCSSを生成する

```sh
grunt build_siteA_mincss
```

### SCSSの変更を感知してCSSを生成する

```sh
grunt
```

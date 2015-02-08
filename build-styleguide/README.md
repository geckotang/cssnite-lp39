## Install

まず、Sassなどを実行するためにRubyが必要です。また、Sassなどのバージョンを管理するためにBundlerを使用します。それらのインストールについては割愛しますが、便利なので、ぜひこれを機にインストールをしてみてください。
sassとcompass、そしてスタイルガイドを作るためのhologramをプロジェクトローカルにインストールします。

```sh
bundle install --without=production --path vendor/bundle
```

Bundlerを使って、プロジェクトローカルにインストールしたものは、`bundle exec`と、先頭に入れることで実行できます。

```sh
bundle exec compass -v
#Compass 1.0.3 (Polaris)
#Copyright (c) 2008-2015 Chris Eppstein
#Released under the MIT License.
#Compass is charityware.
#Please make a tax deductable donation for a worthy cause: http://umdf.org/compass
bundle exec sass -v
#Sass 3.4.0 (Selective Steve)
bundle exec hologram -v
#hologram 1.3.0
```

次に、Gruntのタスクを実行するために必要な物をインストールします。

```sh
npm install
```

## Gruntのタスクを実行する

```
├ htdocs/
│ ├ common/
│ │ └ css/ #生成されたCSS
│ │      ├ style.css
│ │      └ style.min.css
│ └ styleguide/ #生成されたスタイルガイド
│      ├ asset/
│      ├ button.html
│      ├ heading.html
│      └ index.html
├ hologram/ #スタイルガイドのテンプレートや設定ファイル
│ ├ asset/
│ ├ templates/
│ └ config_siteA.yml
└ scss/
     ├ _base.scss
     ├ _button.scss
     ├ _heading.scss
     ├ style.scss
     └ index.md #スタイルガイド用のindex.htmlとなるマークダウンファイル
```

hologramを使う場合は、スタイルガイド用のテンプレートファイルや設定ファイルを設置する必要があります。hologram用の設定ファイルは、`hologram/config_siteA.yml`というファイルになっていて、中にはSCSSへのパスなどを書く必要があります。今回はこのディレクトリ構成で、スタイルガイドが生成されるように記述してありますが、必要に応じて書き換えてください。

### スタイルガイドを生成する

hologramの使い方については、[hologramでカスタムスタイルガイド | 機能概要](https://app.codegrid.net/entry/hologram-1)などを参考にしてみてください。

```sh
grunt build_siteA_guide
```

※スタイルガイドをwatchを利用して変更があるたびに生成することは可能ですが、毎回スタイルガイドの生成があると遅くなるため、必要になったタイミングで生成するのが良い

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

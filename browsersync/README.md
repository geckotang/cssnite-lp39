## Install

Gruntのタスクを実行するために必要な物をインストールします。

```sh
npm install
```

## Gruntのタスクを実行する

このサンプルは、Sassなどは使用しておらず、Gruntでローカルサーバーを立てて、ファイルが更新されたらブラウザをリロードするといったものだけに絞ったものになっています。

### ファイルの変更を感知してブラウザを更新する

```sh
grunt
```

と実行すると`htdocs`をドキュメントルートとしたローカルサーバが`localhost:8888`で立ち上がります。
その`localhost:8888`をChromeやFirefox、IEなどで開くと以下のことが可能になります。

- ファイルが変更された時に、ページの自動更新
- スクロール位置の同期
- ページ遷移した際の同期
- フォームなどで遷移した際の同期

上記コマンドを実行後`localhost:8888`を開かれるので、`htdocs/common/css/style.css`や`htdocs/index.html`を編集し保存すると、ブラウザが自動的に更新されているのが確認できるかと思います。

#### もしすでに別のローカルサーバがあった場合

例えばXAMPPやMAMP、Apacheを使用してローカルサーバーを立てていた場合（仮に`localhost:8082`だとします）、以下のようにすることで、BrowseSyncを使うことができます。

Gruntfileの`server`の部分を

```js
  server: { baseDir: ['htdocs'] },
```

プロキシしたいローカルサーバーに変更します。

```js
  proxy: 'localhost:8082',
```

こうすることで、`localhost:8082`を、BrowserSyncのローカルサーバー`localhost:8888`として見ることができますので、`localhost:8888`をブラウザで開くと、すでに用意された環境でも、自動更新などが有効になります。

#### もしSassなどのビルド後にブラウザを更新した場合

Gruntfileにcompassのタスクなどを追加した場合、watchタスクの部分を変更します。

```js
    watch: {
      siteA: {
        files: [],
        tasks: []
      }
```

```js
    watch: {
      siteA: {
        files: ['scss/*.scss'],
        tasks: ['compass']
      }
```

このようにして、`scss/ディレクトリ`以下の`scssファイル`の変更を感知して、compassタスクが実行されるようにしておくと、BrowserSyncは、そのタスク実行後にブラウザを更新してくれます。

[grunt-contrib-compress](https://github.com/gruntjs/grunt-contrib-compress)はZIPだけでなく、`gzip`、`tar`、`tgz`なども作ることができます。詳しい動作については、[grunt-contrib-compress](https://github.com/gruntjs/grunt-contrib-compress)のREADMEを参照してください。

## Install

Gruntのタスクを実行するために必要な物をインストールします。

```sh
npm install
```

## Gruntのタスクを実行する

## htdocsディレクトリをZIPに固める

```sh
grunt zip_htdocs
```

このコマンドを叩くことで、htdocs以下をZIPに固めます。
`htdocs/_test`ディレクトリは除外されています。またgrunt-contrib-compressは、ドットから始まるファイルは自動的に除外します。もし、htdocsディレクトリ内に`.git`ディレクトリが存在したとしても、それはZIPには含まれません。
Windowsの場合、Thumb.dbなどを除外すると良いかもしれません。

```js
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    compress: {
      htdocs: {
        options: {
          archive: 'dist/<%= pkg.name %>-htdocs-<%= grunt.template.today("yyyy-mm-dd-HHMM") %>.zip'
        },
        files: [
          {
            expand: true,
            cwd: 'htdocs/',
            src: [
              '**',
              '!**/Thumb.db',
              '!_test/**'
            ],
            dest: 'hogehoge/'
          }
        ]
      }
    }
  });
```

Gruntfile.jsの上記の部分の解説をします。

```
archive: 'dist/<%= pkg.name %>-htdocs-<%= grunt.template.today("yyyy-mm-dd-HHMM") %>.zip'
},
```

このGruntfileの中では、同じディレクトリにある`package.json`の内容を取得していて、それをGruntfileの中で使用することができます。
package.jsonの中に`"name": "Build_ZIP",`と記述されているので、`<%= pkg.name %>`とした部分は`Build_ZIP`に置き換えられます。
次に`<%= grunt.template.today("yyyy-mm-dd-HHMM") %>`の部分ですが、もし今の時刻が`2015年2月7日13時30分`であれば、`2015-02-07-1330`に置き換えられます。
なので、この記述をしている場合は、ZIP作成をすると`dist`ディレクトリに、`Build_ZIP-htdocs-2015-02-07-1330.zip`というファイルが作成されます。`dist`ディレクトリがなければ、自動的に作成されます。
もし、Gitを使っていたら、tagをファイル名に含めることも可能です。

```
cwd: 'htdocs/',
```

どのディレクトリを基準にZIPを作成するかを指定します。この場合、`htdocs/`が基準になります。

```
  src: [
    '**',
    '!**/Thumb.db',
    '!_test/**'
  ],
```

次に、この部分は、ZIPに含めるファイル・ディレクトリの指定になります。`**`と書くとすべてのファイル・ディレクトリが対象になります。
また`!_test/**`とかくと、`_test`ディレクトリをZIPの対象から外すことができます。

```
  dest: 'hogehoge/'
```

最後に、この部分は、ZIPを解凍した時にできるディレクトリの名前になります。

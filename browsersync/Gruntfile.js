module.exports = function(grunt){
  var matchdep = require('matchdep');

  // load all grunt-plugin tasks
  matchdep.filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // init config
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserSync: {
      siteA: {
        //変更を監視する対象
        files: {
          src : [
            'htdocs/common/css/*.css',
            'htdocs/**/*.html'
          ]
        },
        //各種設定
        options: {
          //ルートディレクトリ
          server: { baseDir: ['htdocs'] },
          //ローカルサーバのポート番号（デフォルトは3000番）
          port: 8888,
          //localhost:8082をプロキシする場合
          //proxy: 'localhost:8082',
          //実行した際に、ブラウザを開くかどうか
          open: true,
          //watchに登録されたタスクを監視して、完了後にシンク
          watchTask: true,
          //デバッグ用のメッセージを出す
          debugInfo: true,
          //ブラウザの右上に、browsersyncからの通知を出す
          notify: false,
          //スクロールの同期、遷移した時の同期などの設定
          ghostMode: {
            scroll: true,
            links: true,
            forms: true
          },
        }
      }
    },
    watch: {
      siteA: {
        files: [],
        tasks: []
      }
    }
  });

  grunt.registerTask('default', ['browserSync:siteA', 'watch:siteA']);

};

relative_assets = false
# Project用のディレクトリを指定
project_path = "htdocs"
# image-url()で指定する際に、http_path から始まる URL になる
http_path = "/"
# SCSSの場所
sass_dir = "../scss"
# CSSの生成先
css_dir = "common/css"
# SCSSの出力方法
#圧縮するかどうかの設定(:nested, :expanded, :compact, or :compressed)
output_style = ( environment == :production ) ? :compressed : :expanded
#SASS内の行番号の出力(true or false)
line_comments = ( environment == :production ) ? false : true
# CSSで使われるパス
images_dir = "common/img"
# image-urlやスプライト画像の生成先
http_generated_images_path = "common/img"
# Compassによって生成された画像にクエリを付けない
asset_cache_buster :none
# FontAwesomeで使うフォントへのパス
fonts_dir = "common/font"

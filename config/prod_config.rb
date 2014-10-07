require 'susy'
require 'compass'
require 'normalize-scss'
require 'breakpoint'

project_type = :stand_alone
http_path = "/"
sass_dir = "assets/scss"
css_dir = "public/css"
images_dir = "img"
fonts_dir = "fonts"
javascripts_dir = "js"
line_comments = false
preferred_syntax = :scss
relative_assets = true
output_style = :compressed
sourcemap = false
sass_options = {
  "cache" => "false"
}
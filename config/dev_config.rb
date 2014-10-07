require 'susy'
require 'compass'
require 'normalize-scss'
require 'breakpoint'

project_type = :stand_alone
http_path = "/"
sass_dir = "src/scss"
css_dir = "src/assets/css"
images_dir = "img"
fonts_dir = "fonts"
javascripts_dir = "js"
line_comments = false
preferred_syntax = :scss
output_style = :expanded
relative_assets = true
output_style = :expanded
sourcemap = true
sass_options = {
  "cache" => "true"
}
require 'susy'
require 'compass'
require 'normalize-scss'
require 'breakpoint'

project_type = :stand_alone
http_path = "/"
sass_dir = "frontend/scss"
css_dir = ".tmp/css"
line_comments = false
preferred_syntax = :scss
relative_assets = true
output_style = :compressed
sourcemap = false
sass_options = {
  "cache" => "false"
}
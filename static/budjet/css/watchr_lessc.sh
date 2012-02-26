#!/bin/bash
# Requires watchr: https://github.com/mynyml/watchr
watchr -e 'watch(".*\.less$") { |f| system("lessc #{f[0]} > #{f[0]}.css && echo \"#{f[0]} > #{f[0]}.css\" ") }'

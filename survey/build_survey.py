#!/usr/bin/env python3

"""Helper function to build accomoji survey copypaste from HTML and JS."""

import re
import sys

if sys.argv[-1] not in ["fr", "en", "de"]:
    raise Exception("Specify language")
    

html = ""
code = ""
translations = ""

with open("template.html", "r") as f:
    html = ''.join(f.readlines()).replace('\n', '')

with open("code.js", "r") as f:
    code = ''.join(f.readlines()).replace('\n', '')

with open("translations.js", "r") as f:
    translations = ''.join(f.readlines()).replace('\n', '')

rendered = code.replace("{TEMPLATE}", html)
rendered = rendered.replace("{TRANSLATIONS}", translations)
rendered = rendered.replace("{LANGUAGE}", sys.argv[-1])

rendered = re.sub(r' +', ' ', rendered)

with open("survey.js", "w") as f:
    f.write(rendered)

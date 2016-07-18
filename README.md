# globe-test
d3 globe written in d3. Allowed you to create tours based on simple json data.

This cannot be run just by opening the index.html file because it requests a json file which is a cors violation. To run it you need to serve it. There are a million ways to do this. Easiest is to navigate to the directory and run a python file server.

git clone https://github.com/rileymjohnson/globe-test.git globe-test

cd globe-test

python -m SimpleHTTPServer

then open http://localhost:8000 in a web browser

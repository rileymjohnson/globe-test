# globe-test
d3 globe written in d3. Allowed you to create tours based on simple json data.

This cannot be run just by opening the index.html file because it requests a local json file which is a CORs violation. To run it you need to serve it. There are a million ways to do this. Easiest is to navigate to the directory and run a python file server.

<code>
	git clone https://github.com/rileymjohnson/globe-test.git globe-test
</code>

<code>
	cd globe-test
</code>

<code>
	python -m SimpleHTTPServer
</code>

then open http://localhost:8000 in a web browser
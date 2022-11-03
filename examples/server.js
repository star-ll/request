const http = require("http");
const fs = require("fs");
const path = require("path");

http.createServer((req, res) => {
	if (req.url === "/favicon.ico") {
		return;
	}

	if (req.url.indexOf("/api/") > -1) {
		// 测试用的api
		res.end("true");
	} else if (req.url === "/") {
		res.end("true");
	} else {
		// dist and examples
		const isDist = req.url.indexOf("/dist/") > -1;

		const dirPath = isDist
			? path.join(__dirname, "../", req.url)
			: path.join(__dirname, "../examples", req.url);

		if (isDist) {
			res.setHeader("content-type", "text/javascript");
		} else {
			res.setHeader("content-type", "text/html");
		}

		try {
			const content = fs.readFileSync(dirPath);
			res.end(content);
		} catch (err) {
			console.error(err);
		}
	}
}).listen(3000, () => {
	console.log("server start");
});

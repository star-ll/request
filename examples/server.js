const http = require("http");
const fs = require("fs");
const path = require("path");

http.createServer((req, res) => {
	if (req.url === "/favicon.ico") {
		return;
	}

	if (req.url.indexOf("/api/") > -1) {
		// 测试用的api

		if (/json$/.test(req.url)) {
			res.setHeader("content-type", "application/json");
			res.end(
				JSON.stringify({
					data: { name: "张三", age: 18 },
					msg: "成功",
				})
			);
		} else {
			res.end("true");
		}
	} else if (req.url === "/") {
		const examples = [];
		const dirInfos = fs.readdirSync(path.resolve("./examples"));
		dirInfos.forEach((fileName) => {
			const fileStat = fs.statSync(path.resolve("./examples", fileName));
			if (fileStat.isDirectory()) {
				fs.readdirSync(path.resolve("./examples", fileName)).forEach(
					(childFile) => {
						if (/\.html$/.test(childFile)) {
							examples.push(fileName + "/" + childFile);
						}
					}
				);
			} else if (fileStat.isFile()) {
				if (/\.html$/.test(fileName)) {
					examples.push(fileName);
				}
			}
		});

		const content = fs.readFileSync(
			path.resolve("./examples", "index.html")
		);

		const html = content
			.toString()
			.replace("${content}", generateIndexHtml(examples));
		res.setHeader("content-type", "text/html");
		res.end(html);
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
			res.statusCode = 404;
			res.end("资源不存在");
		}
	}
}).listen(3000, () => {
	console.log("server start");
});

function generateIndexHtml(examples) {
	const html =
		"<ul>" +
		examples
			.map((item) => `<li><a target="_blank" href="${item}">${item}</a></li>`)
			.join("\n") +
		"</ul>";

	return html;
}

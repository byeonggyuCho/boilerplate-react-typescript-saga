// template/index.js
// html-webpack-plugin 属于templateContent 属性形式的模板文件
function templateContent(htmlWebpackPlugin) {
  return `
  <!DOCTYPE html>
    <html lang="kr">
    <head>
        <meta charset="UTF-8" />
        <meta
        name="description"
        content="description"
        />
        <meta name="author" content="content" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${htmlWebpackPlugin.options.title}</title>

        <script type="text/javascript" src="${htmlWebpackPlugin.options.url}static/js/axios.min.js"></script>
        <script src="https://code.jquery.com/jquery-3.2.1.min.js" async></script>
    </head>

    <body>
        <div id="root"></div>
    </body>
    </html>
`;
}

module.exports = { templateContent };

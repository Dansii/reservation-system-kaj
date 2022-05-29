const {resolve} = require("path");
const {getWebpackConfig} = require("./webpack-base.config");

const webpackDevServerConfig = getWebpackConfig({
    devServer: {
        host: "0.0.0.0",
        static: {
            directory: resolve(__dirname, "dist"),
            watch: true,
        },
        historyApiFallback: true,
        hot: true,
        client: {
            overlay: true,
            progress: true,
        },
    },
});

module.exports = webpackDevServerConfig;

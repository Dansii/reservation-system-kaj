const {resolve} = require("path");
const {DefinePlugin} = require("webpack");
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const git = require("git-rev-sync");

const getWebpackConfig = (extraConfig = {}) => {
    return (env) => {
        const isProduction = Boolean(env.prod);
        const isRc = Boolean(env.rc);
        const isStage = Boolean(env.stage);
        const isLocal = Boolean(env.local);

        const environment = isProduction
            ? "production"
            : isRc
                ? "rc"
                : isStage
                    ? "stage"
                    : "local";

        return {
            mode: isProduction ? "production" : "development",
            entry: resolve(__dirname, "src", "index.js"),
            output: {
                path: resolve(__dirname, "dist"),
                publicPath: isLocal ? "/" : "/reservation-system-kaj",
                filename: isLocal
                    ? "[name].[hash].js"
                    : "[name].[contenthash].js",
                chunkFilename: isLocal
                    ? "[name].[hash].js"
                    : "[name].[contenthash].js",
                pathinfo: false,
            },
            devtool: isLocal ? "eval-source-map" : "source-map",
            optimization: {
                minimize: isProduction,
                minimizer: [
                    new TerserWebpackPlugin({
                        extractComments: false,
                        terserOptions: {
                            compress: {
                                drop_console: true,
                                ecma: 2015,
                            },
                        },
                    }),
                ],
                splitChunks: {
                    chunks: "all",
                    automaticNameDelimiter: ".",
                    minSize: 0,
                    cacheGroups: {
                        defaultVendors: {
                            test(module) {
                                if (module.resource && module.resource.includes("@semrush/sso")) {
                                    return false;
                                }

                                return /[\\/]node_modules[\\/]/.test(module.resource);
                            },
                            name: "vendors",
                            priority: -20,
                            reuseExistingChunk: true,
                        },
                        default: {
                            minChunks: 1,
                            priority: -30,
                            reuseExistingChunk: true,
                        },
                    },
                },
            },
            resolve: {
                extensions: [".tsx", ".ts", ".js"],
            },
            module: {
                rules: [
                    {
                        test: /\.(tsx|ts|js)$/,
                        use: [
                            {
                                loader: "babel-loader",
                            },
                        ],
                    },
                    {
                        test: /\.(svg|png)$/,
                        type: "asset/resource",
                    },
                    {
                        test: /\.js$/,
                        include: /\/node_modules\/@semcore\//,
                        enforce: "pre",
                        use: [
                            {
                                loader: "babel-loader",
                                options: {
                                    plugins: [
                                        [
                                            "@semcore/babel-plugin-react-semcore",
                                            {
                                                // theme: resolve(process.cwd(), "directory-with-theme"),
                                                theme: "@semcore/theme-redesign",
                                            },
                                        ],
                                    ],
                                },
                            },
                        ],
                    },
                ],
            },
            plugins: [
                new CleanWebpackPlugin(),
                new HtmlWebpackPlugin({
                    template: resolve(__dirname, "src", "assets", "index.html"),
                    scriptLoading: "defer",
                    minify: {
                        collapseWhitespace: true,
                        minifyCSS: true,
                    },
                }),
                new DefinePlugin({
                    __SRM_ENVIRONMENT__: JSON.stringify(environment),
                    __SRM_COMMIT_HASH__: JSON.stringify(git.long()),
                }),
                new BundleAnalyzerPlugin({
                    analyzerMode: "static",
                    reportFilename: resolve(__dirname, "webpack-profile.html"),
                    openAnalyzer: false,
                }),
            ],
            bail: isProduction,
            ...extraConfig,
        };
    };
};

module.exports.getWebpackConfig = getWebpackConfig;

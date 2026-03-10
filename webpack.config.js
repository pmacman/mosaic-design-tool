const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = env => {
    const isProduction = env !== undefined && env.production;
    return {
        entry: {
            site: ["./www/js/app.js"]
            // otherEntryPoint: ["./wwwroot/js/file1.js", "./wwwroot/js/file2.js"]
        },
        output: {
            path: path.resolve(__dirname, "www/dist"),
            filename: "[name].js"
        },
        resolve: {
            alias: {
                vue: "vue/dist/vue.esm-bundler.js"
            }
        },
        watch: !isProduction,
        watchOptions: {
            ignored: ["node_modules", "www/dist"]
        },
        module: {
            rules: [
                {
                    test: /\.s?css$/,
                    use: [
                        // Extracts CSS into separate files, one CSS file per JS file.
                        MiniCssExtractPlugin.loader,
                        "css-loader"
                    ]
                }
            ]
        },
        devtool: "cheap-module-eval-source-map",
        optimization: {
            splitChunks: {
                cacheGroups: {
                    // Puts vendor scripts and styles (from node_modules folder) in separate vendor.js and vendor.css files.
                    vendors: {
                        chunks: "all",
                        test: /[\\/]node_modules[\\/]/,
                        name: "vendor",
                        priority: 1
                    }
                }
            },
            // Minimizes CSS and JavaScript when webpack is run in "production" mode.
            minimizer: [new OptimizeCssAssetsPlugin({}), new TerserPlugin()]
        },
        plugins: [
            // Extracts CSS into separate files, one CSS file per JS file.
            new MiniCssExtractPlugin({
                filename: "[name].css"
            })
        ]
    };
};
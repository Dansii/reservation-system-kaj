const babelConfig = (api) => {
    const isTest = api.env("test");

    return {
        presets: [
            [
                "@babel/preset-env",
                {
                    targets: [
                        "last 0.5 year",
                        "last 2 safari versions",
                        "last 2 iOS versions",
                        "edge > 78",
                    ],
                },
            ],
            "@babel/preset-react",
        ],
        plugins: [
            [
                "babel-plugin-styled-components",
                {
                    displayName: !isTest,
                },
            ],
        ],
    };
};

module.exports = babelConfig;

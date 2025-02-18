module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            "@components": "./src/components",
            "@screens": "./src/components/screens",
            "@utils": "./src/utils",
            "@assets": "./assets",
            "@store": "./src/store",
            "@lib": "./src/lib",
            "@hooks": "./src/hooks",
          },
        }
      ]
    ]
  };
};
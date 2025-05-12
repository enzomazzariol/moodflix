const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

module.exports = withNativeWind(
  (() => {
    const config = getDefaultConfig(__dirname);

    // Añadir carpeta shared como carpeta vigilada
    config.watchFolders = [path.resolve(__dirname, "../shared")];

    // Asegurar que Metro puede resolver módulos desde shared
    config.resolver.nodeModulesPaths = [
      path.resolve(__dirname, "node_modules"),
      path.resolve(__dirname, "../shared"),
    ];

    // Agregar soporte para SVG
    config.transformer.babelTransformerPath = require.resolve(
      "react-native-svg-transformer"
    );
    config.resolver.assetExts = config.resolver.assetExts.filter(
      (ext) => ext !== "svg"
    );
    config.resolver.sourceExts.push("svg");

    return config;
  })(),
  { input: "./global.css" }
);

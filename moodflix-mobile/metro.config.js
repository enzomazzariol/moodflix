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

    return config;
  })(),
  { input: "./global.css" }
);

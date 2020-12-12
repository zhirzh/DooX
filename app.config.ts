import "dotenv/config"
import { ExpoConfig } from "@expo/config-types"

const config: ExpoConfig = {
  name: "Dooex",
  slug: "dooex",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#FFFFFF",
    },
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  extra: {
    ip: process.env.IP!,
    port: parseInt(process.env.PORT!),
  },
}

export default {
  expo: config,
}

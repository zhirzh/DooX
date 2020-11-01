import 'dotenv/config'

export default {
  expo: {
    name: 'dooex',
    slug: 'dooex',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
    },
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      IP: process.env.IP,
      PORT: process.env.PORT,
    },
  },
}

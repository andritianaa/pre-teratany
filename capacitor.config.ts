import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.teratany.org',
  appName: 'Teratany',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
    LocalNotifications: {
      smallIcon: 'src/assets/icon/android/ic_launcher.png',
      iconColor: "#488AFF",

    }
  },
  android: {
    iconPath: 'src/assets/icon/android/ic_launcher.png',
  },
};

export default config;

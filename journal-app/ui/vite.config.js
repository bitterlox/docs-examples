import { loadEnv, defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { urbitPlugin } from '@urbit/vite-plugin-urbit';
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default ({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd()));
  const SHIP_URL = process.env.SHIP_URL || process.env.VITE_SHIP_URL || 'http://localhost:8080';
  console.log(SHIP_URL);
  console.log(process.env);

  return defineConfig({
    root: './',
    build: {
        outDir: 'dist',
    },
    publicDir: './public',
    define: {
      __PUBLIC_URL__: JSON.stringify(process.env.VITE_PUBLIC_URL),
    },
    plugins: [
      urbitPlugin({ base: 'journal', target: SHIP_URL, secure: false }),
      reactRefresh({ include: /\.((t|j)sx?)|(s?css)$|(html?)/ }),
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: 'auto',
        manifest: {
          name: 'journal',
          short_name: 'journal',
          description: 'My journal',
          theme_color: '#ffffff',
          icons: [ ]
        },
        devOptions: {
          enabled: process.env.NODE_ENV === 'development'
        },
      })
    ]
  });
};

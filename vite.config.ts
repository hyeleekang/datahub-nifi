import { defineConfig, loadEnv } from 'vite';

import path from 'path';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    // Load environment variables based on the current mode (development or production)
    const env = loadEnv(mode, process.cwd());

    return {
        plugins: [
            react(),
            {
                name: 'html-transform',
                transformIndexHtml(html) {
                    return html.replace(/<title>(.*?)<\/title>/, `<title>${env.VITE_APP_TITLE}</title>`);
                },
            },
        ],
        resolve: {
            alias: [
                {
                    find: '@app',
                    replacement: path.resolve(__dirname, 'src/app'),
                },
                {
                    find: '@assets',
                    replacement: path.resolve(__dirname, 'src/assets'),
                },
                {
                    find: '@layouts',
                    replacement: path.resolve(__dirname, 'src/layouts'),
                },
                {
                    find: '@pages',
                    replacement: path.resolve(__dirname, 'src/pages'),
                },
                {
                    find: '@routes',
                    replacement: path.resolve(__dirname, 'src/routes'),
                },
                {
                    find: '@shared',
                    replacement: path.resolve(__dirname, 'src/shared'),
                },
            ],
        },
        server: {
            port: 3000,
            proxy: {
                '/v1/nifi': {
                    target: env.VITE_API_BASE_URL,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/v1\/nifi/, ''),
                },
                '/v1/nifi/process-groups/datahub-detail': {
                    target: `${env.VITE_API_BASE_URL}/v1/nifi/process-groups/datahub-detail`,
                    changeOrigin: true,
                },
                '/v1/nifi/processors/{processors_id}/state': {
                    target: `${env.VITE_API_BASE_URL}/v1/nifi/processors/{processors_id}/state`,
                    changeOrigin: true,
                },
            },
        },
        build: {
            minify: 'terser',
            rollupOptions: {
                output: {
                    manualChunks: {
                        vendor: ['react', 'react-dom', 'react-router-dom'],
                    }
                }
            }
        }
    };
});

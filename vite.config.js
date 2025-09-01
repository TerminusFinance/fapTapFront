/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
export default defineConfig({
    base: './',
    plugins: [
        react(),
        nodePolyfills({
            globals: {
                Buffer: true,
            },
        }),
    ],
    build: {
        minify: true,
        sourcemap: false,
        target: 'modules',
    },
    server: {
        headers: {
            'Cache-Control': 'no-store',
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./src/test/setup.ts'],
    },
});

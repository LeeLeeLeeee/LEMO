const path = require('path');

/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
    eslint: {
        dirs: ['.'],
    },
    poweredByHeader: false,
    trailingSlash: true,
    basePath: '',
    // The starter code load resources from `public` folder with `router.basePath` in React components.
    // So, the source code is "basePath-ready".
    // You can remove `basePath` if you don't need it.
    reactStrictMode: true,
    experimental: { esmExternals: true },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    env: {
        API_ENDPOINT: 'http://localhost:3001',
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });
        config.module.rules.push({
            test: /\.ts$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/typescript'],
                },
            },
        });
        return config;
    },
    async rewrites() {
        return process.env.NODE_ENV === 'development'
            ? [
                  {
                      source: '/api/:path',
                      destination: 'http://localhost:3000/api/:path',
                  },
              ]
            : [];
    },
});

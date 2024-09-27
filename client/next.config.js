/** @type {import('next').NextConfig} */

const path = require("path");


const nextConfig = {
    reactStrictMode: false,
    experimental: {
        externalDir: true
    },
    webpack: (config) => {
        config.resolve.alias['@shared'] = path.resolve(__dirname, '../server/src/shared');
        return config;
    },
};

module.exports = nextConfig;

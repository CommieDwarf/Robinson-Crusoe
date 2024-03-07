/** @type {import('next').NextConfig} */

const path = require("path");


const nextConfig = {
    reactStrictMode: false,
    experimental: {
        externalDir: true
    },
    webpack: (config) => {
        config.resolve.alias['@sharedTypes'] = path.join(__dirname, 'types');
        config.resolve.alias['@sharedUtils'] = path.join(__dirname, 'utils');
        config.resolve.alias['@sharedConstants'] = path.join(__dirname, 'constants');
        return config;
    },
};

module.exports = nextConfig;

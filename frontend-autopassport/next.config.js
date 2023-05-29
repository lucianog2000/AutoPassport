require('dotenv').config()
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

nextConfig.publicRuntimeConfig = {
  SMART_CONTRACT_ADDRESS: process.env.SMART_CONTRACT_ADDRESS,
}

module.exports = nextConfig

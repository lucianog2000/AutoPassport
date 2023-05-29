require('dotenv').config()
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

nextConfig.publicRuntimeConfig = {
  SMART_CONTRACT_ADDRESS: process.env.SMART_CONTRACT_ADDRESS,
  PINATA_JWT: process.env.PINATA_JWT,
}

module.exports = nextConfig

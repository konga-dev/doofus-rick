import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	rewrites: async () => [
		{
			source: "/api/auth/:path*",
			destination: `${process.env.CI ? "https://rick.api.konga.dev/" : "http://localhost:3000/"}api/auth/:path*`,
		}
	]
}

export default nextConfig

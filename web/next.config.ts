import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	rewrites: async () => [
		{
			source: "/api/auth/:path*",
			destination: "http://localhost:3001/api/auth/:path*",
		}
	]
}

export default nextConfig

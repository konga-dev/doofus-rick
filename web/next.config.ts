import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	rewrites: async () => [
		{
			source: "/api/auth/:path*",
			destination: `${process.env.NEXT_PUBLIC_BACKEND}api/auth/:path*`,
		}
	]
}

export default nextConfig

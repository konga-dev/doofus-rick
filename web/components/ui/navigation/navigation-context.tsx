'use client'

import type React from 'react'
import { createContext, useContext, useState } from 'react'

const NavigationContext = createContext<{
	extraItems: ReadonlyArray<React.ReactNode>
	setExtraItems: (item: ReadonlyArray<React.ReactNode>) => void
}>({ extraItems: [], setExtraItems: () => {} })

export function NavigationProvider({
	children,
}: {
	children: React.ReactNode
}) {
	const [extraItems, setExtraItems] = useState<
		ReadonlyArray<React.ReactNode>
	>([])

	return (
		<NavigationContext.Provider value={{ extraItems, setExtraItems }}>
			{children}
		</NavigationContext.Provider>
	)
}

export const useNavigation = () => useContext(NavigationContext)

'use client'

import { Sparkles } from 'lucide-react'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useNavigation } from '@/components/ui/navigation/navigation-context'

export function RandomQuoteButtonInjector() {
	const { setExtraItems } = useNavigation()

	useEffect(() => {
		setExtraItems([<RandomQuoteButton key="random" />])
		return () => setExtraItems([])
	}, [setExtraItems])

	return null
}

export function RandomQuoteButton() {
	return (
		<Button
			variant="outline"
			onClick={() => window.location.reload()}
			className="h-fit self-start"
		>
			<Sparkles />
			<span>Another one</span>
		</Button>
	)
}

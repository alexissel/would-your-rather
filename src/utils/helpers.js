function generateUID () {
	return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function formatQuestion({ optionOneTextText, optionTwoTextText, author }) {
	return {
		id: generateUID(),
		timestamp: Date.now(),
		author,
		optionOneText: {
			votes: [],
			text: optionOneTextText
		},
		optionTwoText: {
			votes: [],
			text: optionTwoTextText
		}
	}
}
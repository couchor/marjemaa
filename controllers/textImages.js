const getTextImages = async (req, res) => {
	const resp = await fetch(`https://res.cloudinary.com/marjemaa/image/list/read%20pildil.json`)
	const images = await resp.json()

	res.json({ images: images })
}

module.exports = {
	getTextImages
}



const getCategories = async (req, res, catData) => {
	let { parent_url } = req.params;
	parent_url = parent_url.split("-").join("")

	let data = catData.find(c => c.parent_url === parent_url)

	res.json({categories: data.categories, seo: data.seo})
}

const getCategoryContents = async (req, res, catData) => {
	const { subcat_name } = req.params;

	const resp = await fetch(`https://res.cloudinary.com/marjemaa/image/list/${encodeURI(subcat_name)}.json`)
	const images = await resp.json()

	res.json({ images: images, seo: catData.find(c => c.parent_url === subcat_name)?.seo})
}


const getSubCategories = async (req, res, catData) => {
	const { parent_cat } = req.params;

	let data = catData.find(c => c.parent_url === parent_cat)
	res.json({subCategories: data.categories, seo: data.seo})
}


module.exports = {
	getCategories,
	getCategoryContents,
	getSubCategories
}

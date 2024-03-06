const getVerseList = async (req, res, db) => {
	let {parent_cat} = req.params
	parent_cat = parent_cat.split("-").join(" ")
	
	const verseList = await db('verses')
		.whereRaw('LOWER("parent_cat") = ?', parent_cat.toLowerCase())
		.orderBy('id')


		const seo = await db.select('seo_title', 'seo_description').from('categories').whereRaw('LOWER("cat_name") = ?', parent_cat.toLowerCase())


		res.json({ verseList: verseList, seo: seo[0]})
}

module.exports = {
	getVerseList
}

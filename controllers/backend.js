const signIn = (req, res) => {
	const { username, password } = req.body;

	if ( username === process.env.ADMIN_USER  && password === process.env.ADMIN_PW ) return res.json(true)
	else return res.json(false)
}

// CATEGORIES
const getCategoryList = (req, res, db) => {
	db('categories')
		.orderBy('parent_url')
		.then(data => {
			res.json(data);
		})
		.catch(err => console.log(err))
}

const addCategory = (req, res, db) => {
	const {parent_url, cat_name, seo_title, seo_description} = req.body
	db('categories')
		.insert({
	      parent_url,
	      cat_name,
				seo_title,
				seo_description
	  })
		.returning('*')
		.then(data => res.json(data[0]))
		.catch(err => res.status(400).json('Ei saanud lisada'))
}

const deleteCategory = (req, res, db) => {
	const {id} = req.body
	db('categories')
		.where('id', id)
		.del()
		.then(data => res.json(true))
		.catch(err => res.status(400).json(false))
}

const updateCategory = async (req, res, db) => {
	const {id, parent_url, cat_name, seo_title, seo_description} = req.body
	let parent_cat = await db.select('cat_name').from('categories').where({id: id}).then(data => data[0].cat_name)

	let subCatCount = await db('subcategories').count('id').where('parent_cat', parent_cat).then(data => data[0].count)

	let isVerseParent = await db('verses').count('id').where('parent_cat', parent_cat).then(data => data[0].count)

	if ( subCatCount > 0) {
		db.transaction(trx => {
			trx('subcategories')
			.update('parent_cat', cat_name)
			.where('parent_cat', parent_cat)
			.then(data => {
				return trx('categories')
					.where('id', id)
					.update({
						parent_url,
						cat_name,
						seo_title,
						seo_description
					})
					.then(data => res.json(true))
					.catch(err => res.status(400).json(false))
			})
			.then(trx.commit)
	    .catch(trx.rollback)
		})
		.catch(err => res.status(400).json('unable to change data'))
	} else if ( isVerseParent > 0) {
		db.transaction(trx => {
			trx('verses')
			.update('parent_cat', cat_name)
			.where('parent_cat', parent_cat)
			.then(data => {
				return trx('categories')
					.where('id', id)
					.update({
						parent_url,
						cat_name,
						seo_title,
						seo_description
					})
					.then(data => res.json(true))
					.catch(err => res.status(400).json(false))
			})
			.then(trx.commit)
	    .catch(trx.rollback)
		})
		.catch(err => res.status(400).json('unable to change data'))
	} else {
		db('categories')
			.where('id', id)
			.update({
				parent_url,
				cat_name,
				seo_title,
				seo_description
			})
			.then(data => res.json(true))
			.catch(err => res.status(400).json(false))
	}

}

// SUBCATEGORIES
const getSubCategoryList = (req, res, db) => {
	db('subcategories')
		.orderBy('id')
		.then(data => {
			res.json(data);
		})
		.catch(err => console.log(err))
}

const getSubCategoryParents = (req, res, db) => {
	db.select('cat_name').from('categories')
		.then(data => {
			res.json(data);
		})
}

const addSubCategory = (req, res, db) => {
	const {parent_cat, subcat_name, seo_title, seo_description} = req.body
	db('subcategories')
		.insert({
	      parent_cat,
	      subcat_name,
				seo_title,
				seo_description
	  })
		.returning('*')
		.then(data => res.json(data[0]))
		.catch(err => res.status(400).json('Ei saanud lisada'))
}

const deleteSubCategory = (req, res, db) => {
	const {id} = req.body
	db('subcategories')
		.where('id', id)
		.del()
		.then(data => res.json(true))
		.catch(err => res.status(400).json(false))
}

const updateSubCategory = (req, res, db) => {
	const {id, parent_cat, subcat_name, seo_title, seo_description} = req.body
	db('subcategories')
		.where('id', id)
		.update({
			parent_cat,
			subcat_name,
			seo_title,
			seo_description
		})
		.then(data => res.json(true))
		.catch(err => res.status(400).json(false))
}


// VERSES
const getVerseList = (req, res, db) => {
	db('verses')
		.orderBy('id')
		.then(data => {
			res.json(data);
		})
		.catch(err => console.log(err))
}

const getVerseParents = (req, res, db) => {

	db.select('cat_name').from('categories').where('parent_url', 'salmid')
		.then(data => {
				res.json(data)
		})
		.catch(err => res.json(err))
}

const addVerse = (req, res, db) => {
	const {verse, parent_cat} = req.body
	db('verses')
		.insert({
				verse,
				// title,
				parent_cat
		})
		.returning('*')
		.then(data => res.json(data[0]))
		.catch(err => res.status(400).json(false))
}

const deleteVerse = (req, res, db) => {
	const {id} = req.body
	db('verses')
		.where('id', id)
		.del()
		.then(data => res.json(true))
		.catch(err => res.status(400).json(false))
}

const updateVerse = (req, res, db) => {
	const {id, verse, parent_cat} = req.body
	db('verses')
		.where('id', id)
		.update({
			verse,
			// title,
			parent_cat
		})
		.then(data => res.json(true))
		.catch(err => res.status(400).json(false))
}





module.exports = {
	signIn,
	getCategoryList,
	addCategory,
	deleteCategory,
	updateCategory,
	getVerseList,
	getVerseParents,
	addVerse,
	deleteVerse,
	updateVerse,
	getSubCategoryParents,
	getSubCategoryList,
	addSubCategory,
	deleteSubCategory,
	updateSubCategory
}

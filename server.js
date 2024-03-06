const express = require('express');
const next = require('next');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('isomorphic-unfetch');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const fs = require("fs");

const categories = require('./controllers/categories');
const backend = require('./controllers/backend');
const verses = require('./controllers/verses');
const email = require('./controllers/email');
const textImages = require('./controllers/textImages')
const catData = require('./controllers/categories.json')

const PORT = process.env.PORT || 3030;

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dir: '.', dev })

const handle = app.getRequestHandler()

// const CONNECTION_URL = process.env.DATABASE_URL || 'postgres://postgres:admin@localhost/marjemaa'

// const db = require('knex')({
//   client: 'pg',
//   connection: CONNECTION_URL
// 	// ssl: { rejectUnauthorized: false }
// 	// connection: {
// 	// 	host: process.env.DATABASE_HOST || 'localhost',
// 	// 	port: process.env.DATABASE_PORT || '',
// 	// 	user: process.env.DATABASE_USER || 'postgres',
// 	// 	password: process.env.DATABASE_PW || 'admin',
// 	// 	database: process.env.DATABASE_DB || 'marjemaa',
// 	// 	ssl: true
// 	//  }
// });

app
  .prepare()
  .then(() => {
    const server = express()

		server.use(cors())
		server.use(bodyParser.json());
		if(process.env.NODE_ENV === 'production') {
		  server.use((req, res, next) => {
		    if (req.header('x-forwarded-proto') !== 'https')
		      res.redirect(`https://${req.header('host')}${req.url}`)
		    else
		      next()
		  })
		}

		server.use((err, req, res, next) => {
			if (err instanceof URIError) {
				err.message = "Failed to decode param: " + req.url;
				err.status = err.statusCode = 400;
				console.log(err);
				return res.redirect(`http://${req.get("Host")}${req.url}`);
				// return app.render(req, res, "/_error");
			}
		});

		server.get('/kategooriad/:parent_url', (req, res) => { categories.getCategories(req, res, catData) } );
		server.get('/kategooria/:subcat_name', (req, res) => { categories.getCategoryContents(req, res, catData) } );
		server.get('/alamkategooriad/:parent_cat', (req, res) => { categories.getSubCategories(req, res, catData) } );


		server.get('/readpildil/sisu', (req, res) => { textImages.getTextImages(req, res) } );

		// server.get('/salmidesisu/:parent_cat', (req, res) => { verses.getVerseList(req, res, db) } );


		server.post('/backend/signin', (req, res) => { backend.signIn(req, res) } );

		// server.get('/backend/categories', (req, res) => { backend.getCategoryList(req, res, db) } );
		// server.post('/backend/addcategory', (req, res) => { backend.addCategory(req, res, db) } );
		// server.delete('/backend/deletecategory', (req, res) => { backend.deleteCategory(req, res, db) } );
		// server.put('/backend/updatecategory', (req, res) => { backend.updateCategory(req, res, db) } );


		// server.get('/backend/subcategoryparents', (req, res) => { backend.getSubCategoryParents(req, res, db) } );
		// server.get('/backend/subcategories', (req, res) => { backend.getSubCategoryList(req, res, db) } );
		// server.post('/backend/addsubcategory', (req, res) => { backend.addSubCategory(req, res, db) } );
		// server.delete('/backend/deletesubcategory', (req, res) => { backend.deleteSubCategory(req, res, db) } );
		// server.put('/backend/updatesubcategory', (req, res) => { backend.updateSubCategory(req, res, db) } );

		// server.get('/backend/verses', (req, res) => { backend.getVerseList(req, res, db) } );
		// server.get('/backend/verseparents', (req, res) => { backend.getVerseParents(req, res, db) } );
		// server.post('/backend/addverse', (req, res) => { backend.addVerse(req, res, db) } );
		// server.delete('/backend/deleteverse', (req, res) => { backend.deleteVerse(req, res, db) } );
		// server.put('/backend/updateverse', (req, res) => { backend.updateVerse(req, res, db) } );

		// server.get('/backend/publications', (req, res) => { publications.getPublicationList(req, res, db) } );
		// server.post('/backend/addpublication', (req, res) => { backend.addPublication(req, res, db) } );
		// server.delete('/backend/deletepublication', (req, res) => { backend.deletePublication(req, res, db) } );
		// server.put('/backend/updatepublication', (req, res) => { backend.updatePublication(req, res, db) } );

		// server.get('/email/getInvoice', (req, res) => { email.getInvoice(req, res, db) } );
		server.post('/email/generateInvoice', (req, res) => { email.generateInvoice(req, res, fs) } );
		server.get('/downloadInvoice/:id', (req, res) => res.download('output.pdf', `${req.params.id}`))

		// server.post('/sendemail', (req, res) => { email.sendEmail(req, res, nodemailer, db) } );


    server.get('/fotod/:subcat/:title', (req, res) => {
      const actualPage = '/kategooria'
      const queryParams = { title: encodeURI(req.params.title), itemType: 'photos' }
      app.render(req, res, actualPage, queryParams)
    })

		server.get('/fotod/:title', async (req, res) => {
			let title = req.params.title

			title = title.split("-").join(" ")
			let actualPage, queryParams
			
			const hasSubCategories = catData.find(c => c.parent_url === title)?.categories

			if ( hasSubCategories ) {
				actualPage = '/alamkategooriad'
	      queryParams = { title: encodeURI(title), itemType: 'photos' }
			} else {
				actualPage = '/kategooria'
	      queryParams = { title: encodeURI(title), itemType: 'photos' }
			}

      app.render(req, res, actualPage, queryParams)
    })

		server.get('/read-pildil/:title', async (req, res) => {
			let title = req.params.title

			title = title.split("-").join(" ")
			let actualPage = '/kategooria'
	    let queryParams = { title: encodeURI(title), itemType: 'textImages' }

      app.render(req, res, actualPage, queryParams)
    })

		// server.get('/sutsuke-salme/:title', async (req, res) => {
		// 	title = req.params.title
		// 	actualPage = '/salmidesisu'
		// 	queryParams = { title: encodeURI(title) }
		// 	app.render(req, res, actualPage, queryParams)
		// })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

		

    server.listen(PORT, err => {
      if (err) throw err
      console.log(`> Ready on port: ${PORT}`)

    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })

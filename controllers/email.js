const pdfkit = require('pdfkit')

const sendEmail = async (req, res, nodemailer, db) => {

	const {name, to, body} = req.body
	let products = body.items

	let transporter = nodemailer.createTransport({
		host: "smtp.eu.mailgun.org",
		port: 587,
		// requireTLS: true,
		secure: false, // true for 465, false for other ports
		auth: {
			user: process.env.MAILGUN_USER,
			pass: process.env.MAILGUN_PASS
		}
	});

	let pdf = new pdfkit();

	let invoiceNr = await db.select('nr').from('invoice')
		.then((data) => {
			return data[0].nr + 1
		})
		.catch(err => console.log(err))
	let invoiceName = invoiceNr
	for ( i = invoiceName.toString().length; i < 4; i++ ) {
		invoiceName = "0" + invoiceName
	}
	invoiceName = "PP-" + invoiceName

	let buffers = [];
	pdf.on('data', buffers.push.bind(buffers));
	pdf.on('end', () => {

	    pdfData = Buffer.concat(buffers);

			let htmlBody = `<p>Tere!</p>
			<p>Täname teid tellimuse nr ${invoiceName} edastamise eest. Tellimus täidetakse peale ettemaksuarve tasumist.</p>
			<p>Kui soovite veel tasumata tellimust tühistada, siis tellimust eraldi tühistada pole vaja – arve mittetasumine ongi käsitletav tellimusest loobumisena.</p>
			<p>Kui teil on lisaküsimusi, pöörduge aadressil <a href="mailto:info@marjemaa.ee">info@marjemaa.ee</a>, vastame esimesel võimalusel.</p>
			<p>Kõike kena!</p>`

			const mailOptions = {
				from: '"Marjemaa" <info@marjemaa.ee>', // sender address
				to: to, // list of receivers
				subject: `Marjemaa tellimus ${invoiceName}`, // Subject line
				// text: 'Anname keha ka', // plain text body
				html: htmlBody, // html body
				bcc: 'info@marjemaa.ee',
				attachments: [{
					filename: `Arve ${invoiceName}.pdf`,
					content: pdfData
				}]
			};

	    return transporter.sendMail(mailOptions).then(() => {
				db('invoice').update('nr', invoiceNr).then(data => res.json(true))


	    }).catch(error => {
				console.error('There was an error while sending the email:', error);
				res.json(false)

	    });

	});

	let date = new Date()

	// Locked layout
	pdf.font('Helvetica-Bold').fontSize(18).text('Urmas Krüger', 50, 80);
	// pdf.font('Helvetica').fontSize(14).text('reg.kood 14799936', 50, 105);
	pdf.font('Helvetica').fontSize(14).text('Arvelduskonto:', 50, 105);
	pdf.text('SEB Pank: EE231010902013916004', 50, 125);
	pdf.text('Swedbank: EE682200221016699996', 50, 145);
	pdf.text(`Arve nr: ${invoiceName}`, 340, 84);

	pdf.text(`Esitamise kuupäev: ${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`, 340, 105);
	date.setDate(date.getDate() + 14)
	pdf.text(`Maksetähtaeg: ${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`, 340, 125);

	pdf.moveDown(4);
	pdf.font('Times-Bold').fontSize(16).text(`Maksja: ${name !== '' ? name : to }`, 50);

	pdf.moveDown(1);
	pdf.fontSize(14).text('Kaup', 50, 245);
	pdf.text("Kogus", 330, 245);
	pdf.text("Hind (€)", 470, 245);


	//Cart items
	let sum = 0
	let firstItem = true
	pdf.fontSize(12);
	products.forEach( (item, i) => {
		sum += parseInt(item.price)
		let moveUp = pdf.widthOfString(products[i].title) > 280 ? 2 : 1
		let moveDown = pdf.widthOfString(products[i].title) > 280 ? 1.5 : 0.5
		if ( firstItem ) {
			pdf.font('Times-Roman').text(item.title, 50, 265,{width: 280});
			pdf.text("1", 330, 265);
			pdf.text(item.price, 470, 265);
			firstItem = false
		}
		else {
			pdf.text('',50);
			pdf.text(item.title, {width: 280});
			pdf.moveUp(moveUp).text("1", 330);
			pdf.moveUp().text(item.price, 470);
		}
		pdf.moveDown(moveDown)

		if ( pdf.y > 590 ) {
			// pdf.fontSize(14).font('Times-Roman').text("OÜ Pidepaik ei ole", 50, 640);
			// pdf.text("käibemaksukohuslane");

			// pdf.moveDown();
			pdf.fontSize(14).font('Times-Roman');
			pdf.text("Urmas Krüger", 50, 685);
			pdf.text("(FIE)", 75);
			pdf.addPage()
			pdf.font('Helvetica-Bold').fontSize(18).text('Urmas Krüger', 50, 80);
			// pdf.font('Helvetica').fontSize(14).text('reg.kood 14799936', 50, 105);
			pdf.font('Helvetica').fontSize(14).text('Arvelduskonto:', 50, 105);
			pdf.text('SEB Pank: EE231010902013916004', 50, 125);
			pdf.text('Swedbank: EE682200221016699996', 50, 145);
			pdf.text(`Arve nr: ${invoiceName}`, 340, 84);
			// pdf.text(`Arve nr: ${invoiceName}`, 340, 84);
			date.setDate(date.getDate() - 14)
			pdf.text(`Esitamise kuupäev: ${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`, 340, 105);
			date.setDate(date.getDate() + 14)
			pdf.text(`Maksetähtaeg: ${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`, 340, 125);

			pdf.moveDown(4);
			pdf.font('Times-Bold').fontSize(16).text(`Maksja: ${name}`, 50);

			pdf.moveDown(1);
			pdf.fontSize(14).text('Kaup', 50, 245);
			pdf.text("Kogus", 330, 245);
			pdf.text("Hind (€)", 470, 245);
			pdf.font('Times-Roman').fontSize(12)
			firstItem = true
		}

	})

	pdf.fontSize(14).font('Times-Bold').text(`Summa kokku: ${sum}€`, 374);
	pdf.moveDown(1);
	pdf.text(`Arve tasumisel palume kindlasti selgituseks märkida arve number: ${invoiceName}`, 50)

	// pdf.font('Times-Roman').text("OÜ Pidepaik ei ole", 50, 640);
	// pdf.text("käibemaksukohuslane");

	// pdf.moveDown();
	pdf.fontSize(14).font('Times-Roman');
	pdf.text("Urmas Krüger", 50, 685);
	pdf.text("(FIE)", 75);

	pdf.end()

}

// INVOICES
// const getInvoice = (req, res, db) => {
// 	db.select('nr').from('invoice')
// 		.then(data => {
// 			res.json(data);
// 		})
// 		.catch(err => console.log(err))
// }

const generateInvoice = async (req, res, fs) => {
	let pdf = new pdfkit();

	const {name, products, invoiceNr} = req.body

	let buffers = [];

	let invoiceName = invoiceNr

	for ( i = invoiceName.toString().length; i < 4; i++ ) {
		invoiceName = "0" + invoiceName
	}
	invoiceName = `PP-${invoiceName}`

	pdf.pipe(fs.createWriteStream('output.pdf'));

	pdf.on('data', buffers.push.bind(buffers));
	pdf.on('end', async () => {

			pdfData = Buffer.concat(buffers);

			// db('invoice').update('nr', invoiceNr).then(data => res.json({invoiceName: `Arve ${invoiceName}`, invoiceNr: invoiceNr}))
			res.json({invoiceName: `Arve ${invoiceName}`, invoiceNr: invoiceNr})
	});

	let date = new Date()

	// Locked layout
	pdf.font('Helvetica-Bold').fontSize(18).text('Urmas Krüger', 50, 80);
	// pdf.font('Helvetica').fontSize(14).text('reg.kood 14799936', 50, 105);
	pdf.font('Helvetica').fontSize(14).text('Arvelduskonto:', 50, 105);
	pdf.text('SEB Pank: EE231010902013916004', 50, 125);
	pdf.text('Swedbank: EE682200221016699996', 50, 145);
	pdf.text(`Arve nr: ${invoiceName}`, 340, 84);

	pdf.text(`Esitamise kuupäev: ${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`, 340, 105);
	date.setDate(date.getDate() + 14)
	pdf.text(`Maksetähtaeg: ${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`, 340, 125);

	pdf.moveDown(4);
	pdf.font('Times-Bold').fontSize(16).text(`Maksja: ${name}`, 50);

	pdf.moveDown(1);
	pdf.fontSize(14).text('Kaup', 50, 245);
	pdf.text("Kogus", 330, 245);
	pdf.text("Hind (€)", 470, 245);

	//Cart items
	let sum = 0
	let firstItem = true
	pdf.fontSize(12);
	products.forEach( (item, i) => {
		sum += parseInt(item.price)
		let moveUp = pdf.widthOfString(products[i].productName) > 280 ? 2 : 1
		let moveDown = pdf.widthOfString(products[i].productName) > 280 ? 1.5 : 0.5
		if ( firstItem ) {
			pdf.font('Times-Roman').text(item.productName, 50, 265,{width: 280});
			pdf.text("1", 330, 265);
			pdf.text(item.price, 470, 265);
			firstItem = false
		}
		else {
			pdf.text('',50);
			pdf.text(item.productName, {width: 280});
			pdf.moveUp(moveUp).text("1", 330);
			pdf.moveUp().text(item.price, 470);
		}
		pdf.moveDown(moveDown)

		if ( pdf.y > 590 ) {
			// pdf.fontSize(14).font('Times-Roman')
			// .text("OÜ Pidepaik ei ole", 50, 640);
			// pdf.text("käibemaksukohuslane");

			// pdf.moveDown();
			pdf.fontSize(14).font('Times-Roman');
			pdf.text("Urmas Krüger", 50, 685);
			pdf.text("(FIE)", 75);
			pdf.addPage()
			pdf.font('Helvetica-Bold').fontSize(18).text('Urmas Krüger', 50, 80);
			// pdf.font('Helvetica').fontSize(14).text('reg.kood 14799936', 50, 105);
			pdf.font('Helvetica').fontSize(14).text('Arvelduskonto:', 50, 105);
			pdf.text('SEB Pank: EE231010902013916004', 50, 125);
			pdf.text('Swedbank: EE682200221016699996', 50, 145);
			pdf.text(`Arve nr: ${invoiceName}`, 340, 84);
			date.setDate(date.getDate() - 14)
			pdf.text(`Esitamise kuupäev: ${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`, 340, 105);
			date.setDate(date.getDate() + 14)
			pdf.text(`Maksetähtaeg: ${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`, 340, 125);

			pdf.moveDown(4);
			pdf.font('Times-Bold').fontSize(16).text(`Maksja: ${name}`, 50);

			pdf.moveDown(1);
			pdf.fontSize(14).text('Kaup', 50, 245);
			pdf.text("Kogus", 330, 245);
			pdf.text("Hind (€)", 470, 245);
			pdf.font('Times-Roman').fontSize(12)
			firstItem = true
		}

	})

	pdf.fontSize(14).font('Times-Bold').text(`Summa kokku: ${sum}€`, 374);
	pdf.moveDown(1);
	pdf.text(`Arve tasumisel palume kindlasti selgituseks märkida arve number: ${invoiceName}`, 50)

	// pdf.font('Times-Roman').text("OÜ Pidepaik ei ole", 50, 640);
	// pdf.text("käibemaksukohuslane");

	// pdf.moveDown();
	pdf.fontSize(14).font('Times-Roman');
	pdf.text("Urmas Krüger", 50, 685);
	pdf.text("(FIE)", 75);

	pdf.end()


}

module.exports = {
	sendEmail,
	// getInvoice,
	generateInvoice
}

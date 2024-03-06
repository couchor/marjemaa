import 'isomorphic-unfetch';
import Layout from '../components/MyLayout'

export default class Kontakt extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			alert: false,
			alertType: false,
			alertMessage: 'Email saadetud. Teiega võetakse esimesel võimalusel ühendust',
			name: '',
			email: '',
			subject: '',
			body: ''
		};
	}

	handleInputChange = (event) => {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	sendEmail = (event) => {
		event.preventDefault();
		if ( !document.getElementById('form').reportValidity() ) {
			let name = document.querySelector("[name='name']")
			let email = document.querySelector("[name='email']")
			let body = document.querySelector("[name='body']")

			if (name.value === "") {
				name.setCustomValidity("Palun sisestage nimi")
			} else {
				name.setCustomValidity("")
			}
			if (email.value === "") {
				email.setCustomValidity("Palun sisestage email")
			} else {
				email.setCustomValidity("")
			}
			if (body.value === "") {
				body.setCustomValidity("Palun täitke maili sisu")
			} else {
				body.setCustomValidity("")
			}
		} else {
			fetch(`${window.origin}/sendemail`, {
				method: 'post',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					name: this.state.name,
					to: this.state.email,
					body: this.state.body
				})
			})
			.then(response => response.json())
			.then(data => {
				if ( data ) {
					this.setState(prevState => ({
						alert: !prevState.alert,
						alertType: true,
						alertMessage: 'Email saadetud. Teiega võetakse esimesel võimalusel ühendust',
						name: '',
						email: '',
						body: ''
					}))
					setTimeout(() => this.setState(prevState => ({
						alert: !prevState.alert
					})), 5000)
				} else {
					this.setState(prevState => ({
						alert: !prevState.alert,
						alertType: false,
						alertMessage: 'Viga emaili saatmisel. Palun proovige hiljem uuesti'
					}))
					setTimeout(() => this.setState(prevState => ({
						alert: !prevState.alert
					})), 5000)

				}
			})
			.catch(err => console.log(err))

		}

	}
	render() {

		return (
			<Layout seo_title='Kontakt'>
				<div className="info-wrapper pa3 mb4 fw5">
					<p><u>Autorid:</u></p>
					<p className='mt0'>Marjemaal esitletavate fotode autoriks on Marje Metsaots, piltidel olevate kirjaridade autoriteks on kas Urmas või Marje või siis mõlemad üheskoos.</p>
					<p><u>Õigused:</u></p>
					<p>Marjemaa omab seadusekohaselt registreeritud ja seadusega kaitstud kaubamärgi staatust (reg.nr 56986) ja kaubamärgiomanik on Urmas Krüger. Kaubamärki Marjemaa ei tohi kasutada ilma omaniku loata.</p>
					<p><u>Tooted:</u></p>
					<p>Lehel nähtaval olevate piltide kvaliteet on kasutajasõbralikkuse jaoks vähendatud. Tellimisel toimetatakse teieni originaalfailid, mis on enamjaolt tehtud Nikon D3300 kaameraga. Nende küljemõõdud on kuni 6000x4000 pikslit (või vastupidi) ning resolutsiooniaste on valdavalt 300 dpi.</p>
					{/* <p>Enamus fotodest on tehtud Nikon D3300 kaameraga. Fotode küljemõõdud on kuni 6000x4000 pikslit (või vastupidi) ning nende resolutsiooniaste on valdavalt 300 dpi.</p> */}

					<p><u>Kontaktaadress:</u> <a href='mailto:urmas.kryger@gmail.com'>urmas.kryger@gmail.com</a></p>
				</div>
				{/* <form id='form' className='main-bg w-100 w-90-m w-70-l self-center tc flex flex-column justify-around pa3 mb5 relative'>
					{
						<p
							className={`${this.state.alertType ? 'bg-light-green' : 'bg-light-red'}
							${this.state.alert ? 'o-100' : 'o-0'}
							 w-100 self-center tc f3 mv0 absolute top-0 alert`}>
							{this.state.alertMessage}
						</p>
					}
					<div className='flex flex-column flex-row-ns'>
					<div className='tl w-50-ns'>
						<p className='mb2'>Marjemaa</p>
						<p className='mb2'>Telefon: <a className='link' href='tel:+37255441445'>+372 55441445</a></p>
						<p className='mb2'>Email: <a className='link' href='mailto: info@marjemaa.ee?subject=Tagasiside'>info@marjemaa.ee</a></p>
						<p>Mingi info maili saatmise / huvinäitamise kohta, ei oska öelda </p>
					</div>
					<div className='w-40-ns flex flex-column justify-between'>
						<div className='w-100 flex flex-column tc mb2'>
							<label htmlFor='name'>Nimi</label>
							<input onChange={this.handleInputChange} value={this.state.name} type='text' name='name' id='name' required />
						</div>
						<div className='w-100 flex flex-column tc mb2'>
							<label htmlFor='email'>Email</label>
							<input onChange={this.handleInputChange} value={this.state.email} type='email' name='email' id='email' required />
						</div>
						<div className='w-100 flex flex-column tc mb3'>
							<label htmlFor='body'>Sisu</label>
							<textarea className='h4' onChange={this.handleInputChange} value={this.state.body} name='body' id='body' required />
						</div>
						<button type='submit' onClick={this.sendEmail} className='callButton self-center self-end-ns white pointer pa2'><p className='ma0'>Saada mail</p></button>
					</div>
					</div>

					<style jsx>
						{`
							.alert {
								transition: opacity .6s;
							}
							textarea {
								resize: vertical;
							}
							p {
								transition: transform .25s;
							}
							input, textarea {
								border: 1px solid rgba(0,0,102,0.7);
							}
							button {
								box-shadow: 0px 0px 5px #000;
								border-style: none;
								border-radius: 2px;
								background-color: rgba(0,0,102,0.7);
							}
						`}
					</style>
				</form> */}

			</Layout>
		)
	}
}

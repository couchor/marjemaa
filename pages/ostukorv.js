import 'isomorphic-unfetch';
import Layout from '../components/MyLayout'
import GetCartItems from '../components/Cart/GetCartItems'
import {connect} from "react-redux";

class Ostukorv extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			alert: false,
			alertType: false,
			alertMessage: 'Email saadetud. Teiega võetakse esimesel võimalusel ühendust',
			name: '',
			email: '',
			alertHeight: 0,
			loader: false
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
			let terms = document.querySelector("[name='terms']")

			if (email.value === "") {
				email.setCustomValidity("Palun sisestage email")
			} else {
				email.setCustomValidity("")
			}

			if (!terms.checked) {
				terms.setCustomValidity("Tellimuse esitamiseks peate tingimustega nõustuma")
			} else {
				terms.setCustomValidity("")
			}
		} else {
			this.setState({loader: true})
			fetch(`${window.origin}/sendemail`, {
				method: 'post',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					name: this.state.name,
					to: this.state.email,
					body: this.props.cart
				})
			})
			.then(response => response.json())
			.then(data => {
				if ( data ) {
					document.getElementById("terms").checked = false
					this.setState(prevState => ({
						alert: !prevState.alert,
						alertType: true,
						alertMessage: 'Tellimus esitatud. Tellitud failid edastatakse teile esimesel võimalusel peale teie mailiaadressile saadetud arve tasumist.',
						alertHeight: document.querySelector("header").offsetHeight - window.scrollY,
						name: '',
						email: '',
						body: ''
					}))
					setTimeout(() => {
						this.setState(prevState => ({
							alert: !prevState.alert,
							loader: false
						}))
						this.props.dispatch({type:'CLEARCART'})
					}, 6000)

				} else {
					this.setState(prevState => ({
						alert: !prevState.alert,
						alertType: false,
						loader: false,
						alertMessage: 'Viga emaili saatmisel. Palun prooviga hiljem uuesti'
					}))
					setTimeout(() => this.setState(prevState => ({
						alert: !prevState.alert
					})), 6000)
				}
			})
			.catch(err => console.log(err))
		}
	}
	render() {
		return (
			<Layout seo_title='Ostukorv'>

			{ this.props.cart !== null ?
				<form id='form' className='info-wrapper w-100 w-90-m w-70-l self-center tc flex flex-column justify-around mb5'>
					{
						<p
							className={`${this.state.alertType ? 'bg-light-green' : 'btn-deny'}
							${this.state.alert ? 'o-100' : 'o-0'}
							 w-100 self-center pa3 tc f3 mv0 fixed z-3 alert`}>
							{this.state.alertMessage}
						</p>
					}

						<h4 className='tl tc-ns'>Pärast Teile saadetud arve tasumist edastatakse Teie poolt tellitud foto/de/ fail/id/ Teie poolt kirjapandud meiliaadressile esimesel võimalusel ööpäeva jooksul (väljarvatud nädalavahetustel ja riiklikel pühadel – siis võib juhtuda, et faili edastamine leiab aset vastavalt kas esmaspäevasel päeval või esimesel pühadejärgsel tööpäeval).</h4>
						<GetCartItems />
						<div className='w-100 flex flex-column flex-row-ns justify-between pv2 ph2'>
							<div className='w-100 flex flex-column tc mb2 mr3'>
								<label className='mb1' htmlFor='name'>Nimi (pole kohustuslik)</label>
								<input onChange={this.handleInputChange} value={this.state.name} type='text' name='name' id='name' />
							</div>
							<div className='w-100 flex flex-column tc mb2'>
								<label className='mb1' htmlFor='email'>Email</label>
								<input onChange={this.handleInputChange} value={this.state.email} type='email' name='email' id='email' required />
							</div>
						</div>
						<div className='mb2'>
							<label className='pr2' htmlFor='terms'>Olen tutvunud ja nõustun <span className='underline' onClick={() => this.props.dispatch({type: 'TOGGLETERMS'})}>tellimuse tingimustega</span></label>
							<input required id='terms' type='checkbox' name='terms'/>
						</div>
						{ !this.state.loader ?
							<button type='submit' onClick={this.sendEmail} className='callButton btn btn-confirm self-center white pointer pa2'><p className='ma0'>Esita tellimus</p></button>
							:
							<div className='flex w-100 justify-center'>
								<div className="loader"></div>
							</div>

						}

				</form>
			:
			<div className='info-wrapper w-100 w-90-m w-70-l self-center tc flex flex-column justify-around mb5 relative'>Ostukorv on tühi. Palun lisage ostu sooritamiseks tooteid ostukorvi.</div>
			}
			<style jsx>
				{`
					.alert {
						transition: opacity .6s;
						top: ${this.state.alertHeight}px;
					}
					.loader {
					  border: .5rem solid #b9afaf;
					  border-top: .5rem solid #4c4883;
					  border-radius: 50%;
					  width: 40px;
					  height: 40px;
					  animation: spin 3s linear infinite;
					}

					@keyframes spin {
					  0% { transform: rotate(0deg); }
					  100% { transform: rotate(360deg); }
					}
				`}
			</style>
			</Layout>
		)
	}
}

export default connect(state => state)(Ostukorv)

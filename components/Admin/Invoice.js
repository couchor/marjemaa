import 'tachyons';

export default class Invoice extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			invoiceNr: null,
			products: [],
			alert: false,
			alertType: 'error',
			alertMessage: ''
		};
	}

	handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
		const invoiceNr = target.invoiceNr;

    this.setState({
      [name]: value
    });
	}

	addProduct = (event) => {
		event.preventDefault();

		let data = {productName: this.state.productName, price: parseInt(this.state.price)}

		this.setState(prevState => ({products: prevState.products.concat(data)}))
	}

	generateInvoice = (event) => {
		console.log(this.state)
		event.preventDefault();
		if ( !document.querySelector('form').reportValidity() ) {
			
		} else {
			fetch(`${window.origin}/email/generateInvoice`, {
	      method: 'post',
	      headers: {'Content-Type': 'application/json'},
	      body: JSON.stringify({
					name: this.state.name,
	        products: this.state.products,
					invoiceNr: this.state.invoiceNr
	      })
	    })
			.then(response => response.json())
			.then(data => {
				if ( data ) {
					document.getElementById('link').innerHTML = `<a href="${window.origin}/downloadInvoice/${data.invoiceName}.pdf" > Lae ${data.invoiceName} alla </a>`
					this.setState({invoiceNr: data.invoiceNr})
				}
			})
			.catch(err => console.log(err))
		}

	}

	render() {
		return (
				<form className='w-100 border ba bw1 b--black tc'>
					{ this.state.alert ? <div className={`${this.state.alertType} tc f3`}>{this.state.alertMessage}</div> : "" }
					<div className='flex mr2 mb2 justify-center'>
						<label htmlFor='name'>Genereeritava arve number:</label>
						<input onChange={this.handleInputChange} required type='text' name='invoiceNr' id='invoiceNr' />
					</div>

					<div className='flex justify-center mb3'>
						<div className='flex flex-column mr2'>
							<label htmlFor='name'>Tellija nimi</label>
							<input onChange={this.handleInputChange} required type='text' name='name' id='name' />
						</div>
					</div>

						<button type='submit' onClick={this.addProduct}>Lisa uus rida</button>
						<div className='flex justify-center items-center mb2'>
							<div className='flex flex-column mr2'>
								<label htmlFor='productName'>Toote nimi</label>
								<input onChange={this.handleInputChange} type='text' id='productName' name='productName' />
							</div>
							<div className='flex flex-column'>
								<label htmlFor='price'>Hind</label>
								<input onChange={this.handleInputChange} id='price' type='text' name='price' />
							</div>
						</div>

					<p><b>Lisatud tooted</b></p>
					<div className=''>
						{this.state.products.map((product, i) => {
							return (
								<div key={i} className='flex justify-center items-center'>
									<div className='mr3'>{product.productName}</div>
									<div>{product.price}</div>
								</div>
							)
						})}
					</div>
					<button type='submit' onClick={this.generateInvoice}>Genereeri arve</button>
					<div id='link' className=''></div>
					<style jsx>
						{`
							.error {
								background-color: red;
							}
							.success {
								background-color: green;
							}
						`}
					</style>
				</form>
		)
	}
}

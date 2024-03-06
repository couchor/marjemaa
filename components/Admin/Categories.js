import 'tachyons';

export default class Categories extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			categoryList: [],
			alert: false,
			alertType: 'error',
			alertMessage: '',
			new_parent_url: '',
			new_cat_name: '',
			seo_title: '',
			seo_description: ''
		};
	}

	async componentDidMount() {
		const hostName = window.origin
		const resp =  await fetch(`${hostName}/backend/categories`)
		const data = await resp.json()
		this.setState({categoryList: data.map(entry => entry)})
	}

	getParents = () => {
		return ['/', 'fotod', 'salmid', 'readpildil']
	}

	handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
	}


	addCategory = () => {
		if ( !this.state.new_parent_url || !this.state.new_cat_name ) {
			return;
		}
		fetch(`${window.origin}/backend/addcategory`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        parent_url: this.state.new_parent_url,
        cat_name: this.state.new_cat_name,
				seo_title: this.state.seo_title,
				seo_description: this.state.seo_description
      })
    })
		.then(response => response.json())
		.then(data => {
			if ( data ) {
				this.setState(prevState => ({
					alert: !prevState.alert,
					alertType: 'success',
					alertMessage: 'Kategooria edukalt lisatud',
					new_parent_url: '',
					new_cat_name: '',
					seo_title: '',
					seo_description: '',
					categoryList: prevState.categoryList.concat(data)
				}))
				setTimeout(() => this.setState(prevState => ({
					alert: !prevState.alert,
					alertType: '',
					alertMessage: '',
				})), 5000)
			}
		})
		.catch(err => console.log(err))
	}

	deleteCategory = (dbID, listID) => {
		fetch(`${window.origin}/backend/deletecategory`, {
			method: 'delete',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				id: dbID,
			})
		})
		.then(response => response.json())
		.then(data => {
			if ( data ) {
				this.setState(prevState => ({
					alert: !prevState.alert,
					alertType: 'success',
					alertMessage: 'Kategooria edukalt kustutatud',
					categoryList: prevState.categoryList.filter((item, j) => listID !== j)
				}))
				setTimeout(() => this.setState(prevState => ({
					alert: !prevState.alert,
					alertType: '',
					alertMessage: '',
				})), 5000)
			}
		})
		.catch(err => console.log(err))
	}

	updateCategory = (id) => {
		const cat_name = document.getElementById(`cat_name-${id}`).value;
		const parent_url = document.getElementById(`parent_url-${id}`).value;
		const seo_title = document.getElementById(`seo_title-${id}`).value;
		const seo_description = document.getElementById(`seo_description-${id}`).value;

		fetch(`${window.origin}/backend/updatecategory`, {
			method: 'put',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				id,
				parent_url,
				cat_name,
				seo_title,
				seo_description
			})
		})
		.then(response => response.json())
		.then(data => {
			if ( data ) {
				this.setState(prevState => ({
					alert: !prevState.alert,
					alertType: 'success',
					alertMessage: 'Kategooria edukalt muudetud'
				}))
				setTimeout(() => this.setState(prevState => ({
					alert: !prevState.alert,
					alertType: '',
					alertMessage: '',
				})), 5000)
			} else {
				this.setState(prevState => ({
					alert: !prevState.alert,
					alertType: 'error',
					alertMessage: 'Viga kategooria muutmisel'
				}))
				setTimeout(() => this.setState(prevState => ({
					alert: !prevState.alert,
					alertType: '',
					alertMessage: '',
				})), 5000)
			}
		})
		.catch(err => console.log(err))
	}

	render() {
		return (
				<div className='w-100 border ba bw1 b--black tc'>
					{ this.state.alert ? <div className={`${this.state.alertType} tc f3`}>{this.state.alertMessage}</div> : "" }
					<p>Olemasolevad ülemkategooriad:</p>
					{
						this.state.categoryList.map((category, i) => {
							// if ( category.parent_url === '/' ){
							// 	return false;
							// }
							// this.addToState("cat_name" + category.id, category.cat_name, "parent_url" + category.id, category.parent_url)
						  return (
							  <div key={category.id} id={category.id} className='flex mb2 justify-around bb pb2'>
									<div className='w-40'>
										<div className='flex flex-column'>
											<label htmlFor={`cat_name-${category.id}`}>Kategooria nimi</label>
											<input
												id={`cat_name-${category.id}`}
												type='text'
												defaultValue={category.cat_name} />
										</div>
										<div className='flex flex-column'>
											<label htmlFor={`parent_url-${category.id}`}>Ülemkategooria</label>
											<select
												id={`parent_url-${category.id}`}
												defaultValue={category.parent_url}>
												{this.getParents().map((parent, i) => {
													return (
														<option key={i} value={parent} >{parent}</option>
													)
												})}
											</select>
										</div>
									</div>
									<div className='w-40'>
										<div className='flex flex-column'>
											<label htmlFor={`seo_title-${category.id}`}>Lehe pealkiri</label>
											<input
												id={`seo_title-${category.id}`}
												maxLength='55'
												defaultValue={category.seo_title}
												type='text' />
										</div>
										<div className='flex flex-column'>
											<label htmlFor={`seo_description-${category.id}`}>Lehe kirjeldus</label>
											<input
												id={`seo_description-${category.id}`}
												maxLength='150'
												defaultValue={category.seo_description}
												type='text' />
										</div>
									</div>
									<div className='flex flex-column justify-center'>
										<button
											type="submit"
											onClick={() => this.updateCategory(category.id)} >
											Muuda
										</button>
										<button
											type="submit"
											onClick={() => this.deleteCategory(category.id, i)} >
											Kustuta
										</button>
									</div>
								</div>
						 )
					 })
					}
					<p>Lisa uus</p>
					<div className='flex justify-around'>
						<div className='w-40'>
							<div className='flex flex-column'>
								<label htmlFor='new_cat_name'>Kategooria nimi</label>
								<input
									id='new_cat_name'
									maxLength='100'
									onChange={this.handleInputChange}
									value={this.state.new_cat_name}
									type='text' name='new_cat_name' />
							</div>
							<div className='flex flex-column'>
								<label htmlFor='new_parent_url'>Ülemkategooria</label>
								<select id='new_parent_url' name='new_parent_url' value={this.state.new_parent_url} onChange={this.handleInputChange}>
									<option></option>
									{this.getParents().map((parent, i) => {
										return (
											<option key={i} value={parent} >{parent}</option>
										)
									})}
								</select>
							</div>
						</div>
						<div className='w-40'>
							<div className='flex flex-column'>
								<label htmlFor='seo_title'>Lehe pealkiri</label>
								<input
									id='seo_title'
									maxLength='55'
									onChange={this.handleInputChange}
									value={this.state.seo_title}
									type='text' name='seo_title' />
							</div>
							<div className='flex flex-column'>
								<label htmlFor='seo_description'>Lehe kirjeldus</label>
								<input
									id='seo_description'
									maxLength='150'
									onChange={this.handleInputChange}
									value={this.state.seo_description}
									type='text' name='seo_description' />
							</div>
						</div>
						<button type='submit' onClick={this.addCategory}>Lisa</button>
					</div>
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
				</div>
		)
	}
}

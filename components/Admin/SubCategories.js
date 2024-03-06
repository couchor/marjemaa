import 'tachyons';

export default class Categories extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			categoryList: [],
			parents: [],
			alert: false,
			alertType: 'error',
			alertMessage: '',
			parent_cat: '',
			subcat_name: '',
			seo_title: '',
			seo_description: ''
		};
	}

	async componentDidMount() {
		const hostName = window.origin
		const resp =  await fetch(`${hostName}/backend/subcategories`)
		const data = await resp.json()

		const parentResp = await fetch(`${hostName}/backend/subcategoryparents`)
		const parentData = await parentResp.json()

		this.setState({
			categoryList: data.map(entry => entry),
			parents: parentData.map(entry => entry.cat_name)
		})
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
		if ( !this.state.parent_cat || !this.state.subcat_name ) {
			return;
		}
		fetch(`${window.origin}/backend/addsubcategory`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        parent_cat: this.state.parent_cat,
        subcat_name: this.state.subcat_name,
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
					parent_cat: '',
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
		fetch(`${window.origin}/backend/deletesubcategory`, {
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
		const subcat_name = document.getElementById(`subcat_name-${id}`).value;
		const parent_cat = document.getElementById(`parent_cat-${id}`).value;
		const seo_title = document.getElementById(`seo_title-${id}`).value;
		const seo_description = document.getElementById(`seo_description-${id}`).value;

		fetch(`${window.origin}/backend/updatesubcategory`, {
			method: 'put',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				id,
				parent_cat,
				subcat_name,
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
					<p>Olemasolevad alamkategooriad:</p>
					{
						this.state.categoryList.map((category, i) => {
						  return (
							  <div key={category.id} id={category.id} className='flex mb2 justify-around bb pb2'>
									<div className='w-40'>
										<div className='flex flex-column'>
											<label htmlFor={`subcat_name-${category.id}`}>Kategooria nimi</label>
											<input
												id={`subcat_name-${category.id}`}
												type='text'
												defaultValue={category.subcat_name} />
										</div>
										<div className='flex flex-column'>
											<label htmlFor={`parent_cat-${category.id}`}>Ülemkategooria</label>
											<select
												id={`parent_cat-${category.id}`}
												defaultValue={category.parent_cat}>
												{this.state.parents.map((parent, i) => {
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
									id='subcat_name'
									maxLength='100'
									onChange={this.handleInputChange}
									value={this.state.subcat_name}
									type='text' name='subcat_name' />
							</div>
							<div className='flex flex-column'>
								<label htmlFor='parent_cat'>Ülemkategooria</label>
								<select id='parent_cat' name='parent_cat' value={this.state.parent_cat} onChange={this.handleInputChange}>
									<option></option>
									{this.state.parents.map((parent, i) => {
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

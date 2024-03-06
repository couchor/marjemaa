import 'tachyons';

export default class Verses extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			verseList: [],
			parents: [],
			parent_filter: 'Tundehetk',
			alert: false,
			alertType: 'error',
			alertMessage: '',
			new_verse: '',
			new_title: '',
			new_parent_cat: ''
		};
	}

	async componentDidMount() {
		const hostName = window.origin

		const resp =  await fetch(`${hostName}/backend/verses`)
		const data = await resp.json()

		const parentResp = await fetch(`${hostName}/backend/verseparents`)
		const parentData = await parentResp.json()

		this.setState({
			verseList: data.map(entry => entry),
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

	addVerse = () => {
		if ( !this.state.new_verse.length ) {
			return
		} else {
			fetch(`${window.origin}/backend/addverse`, {
				method: 'post',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					verse: this.state.new_verse,
					// title: this.state.new_title,
					parent_cat: this.state.new_parent_cat
				})
			})
			.then(response => response.json())
			.then(data => {
				if ( data ) {
					this.setState(prevState => ({
						alert: !prevState.alert,
						alertType: 'success',
						alertMessage: 'Värss edukalt lisatud',
						new_parent_url: '',
						new_cat_name: '',
						verseList: prevState.verseList.concat(data)
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
	}

	updateVerse = (id) => {
		const verse = document.getElementById(id).value;
		// const title = document.getElementById(`title-${id}`).value
		const parent_cat = document.getElementById(`parent_cat-${id}`).value
		fetch(`${window.origin}/backend/updateverse`, {
			method: 'put',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				id: id,
				verse: verse,
				// title: title,
				parent_cat: parent_cat
			})
		})
		.then(response => response.json())
		.then(data => {
			if ( data ) {
				this.setState(prevState => ({
					alert: !prevState.alert,
					alertType: 'success',
					alertMessage: 'Värss edukalt muudetud'
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
					alertMessage: 'Viga värsi muutmisel'
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

	deleteVerse = (dbID, listID) => {
		fetch(`${window.origin}/backend/deleteverse`, {
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
					alertMessage: 'Värss edukalt kustutatud',
					verseList: prevState.verseList.filter((item, j) => item.id !== dbID)
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
				<div className='w-100 ba bw1 b--black tc'>
					{ this.state.alert ? <div className={`${this.state.alertType} tc f3`}>{this.state.alertMessage}</div> : "" }
					<p>Olemasolevad värsid:</p>
					<div className='flex'>
						{this.state.parents.map((parent, i) => {
							return (
								<button key={i} onClick={() => this.setState({parent_filter: parent})}>{parent}</button>
							)
						})}
					</div>
					<div className='flex flex-wrap justify-around'>
					{
						this.state.verseList.filter(verse => {
							return verse.parent_cat == this.state.parent_filter
						}).map((verse, i) => {
							// this.addToState("cat_name" + category.id, category.cat_name, "parent_url" + category.id, category.parent_url)
						  return (
								  <div key={verse.id} className='flex flex-column pa3'>
										<label htmlFor={`parent_cat-${verse.id}`}>Kategooria</label>
										<select
											id={`parent_cat-${verse.id}`}
											defaultValue={verse.parent_cat}>
											{this.state.parents.map((parent, i) => {
												return (
													<option key={i} value={parent} >{parent}</option>
												)
											})}
										</select>
										{/* <label htmlFor={`title-${verse.id}`}>Pealkiri</label> */}
										{/* <input className='mb2' type='text' name='title' id={`title-${verse.id}`} defaultValue={verse.title} /> */}
										<textarea
											id={verse.id}
											className=''
											rows="25"
											defaultValue={verse.verse} />
										<button
											type="submit"
											onClick={() => this.updateVerse(verse.id)} >
											Muuda
										</button>
										<button
											type="submit"
											onClick={() => this.deleteVerse(verse.id, i)} >
											Kustuta
										</button>
									</div>

						 )
					 })
					}
					</div>
					<p>Lisa uus</p>
					<div className='flex flex-column justify-center items-center'>
						<label htmlFor='parent_cat'>Kategooria</label>
						<select id='new_parent_cat' name='new_parent_cat' value={this.state.parent_cat} onChange={this.handleInputChange}>
							<option></option>
							{this.state.parents.map((parent, i) => {
								return (
									<option key={i} value={parent} >{parent}</option>
								)
							})}
						</select>
						{/* <label htmlFor='new_title'>Pealkiri</label>
						<input onChange={this.handleInputChange} id='new_title' type='text' name='new_title' /> */}
						<textarea
							onChange={this.handleInputChange}
							value={this.state.new_verse}
							type='text' name='new_verse' />
						<button type='submit' onClick={this.addVerse}>Lisa</button>
					</div>
					<style>
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

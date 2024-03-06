import 'isomorphic-unfetch'
import Head from 'next/head'
import Categories from '../components/Admin/Categories'
import SubCategories from '../components/Admin/SubCategories'
import Verses from '../components/Admin/Verses'
import Invoice from '../components/Admin/Invoice'

export default class Admin extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			signInUsername: '',
			signInPassword: '',
			isLoggedIn: false,
			tabName: ''
		};
	}

	changeTab = (tabName) => {
		this.setState({tabName})
	}

	onSubmitSignIn = () => {
		fetch(`${window.origin}/backend/signin`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: this.state.signInUsername,
        password: this.state.signInPassword
      })
    })
		.then(res => res.json())
		.then(data => {
			if (data) {
				this.setState({ isLoggedIn: true})
			}
		})
		.catch(console.log)
	}

	onUsernameChange = (event) => {
		this.setState({signInUsername: event.target.value})
	}

	onPasswordChange = (event) => {
		this.setState({signInPassword: event.target.value})
	}

	render(){
		const tabName = this.state.tabName;
		return (
			<div>
				<Head>
					<meta name="robots" content="none" />
				</Head>
			{ !this.state.isLoggedIn ?
				<div className="measure center">
					<fieldset id="sign_up" className="ba b--transfparent ph0 mh0">
						<legend className="f4 fw6 ph0 mh0">Sisselogimine</legend>
						<div className="mt3">
							<label className="db fw6 lh-copy f6" htmlFor="username">Kasutajanimi</label>
							<input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="username"  id="username"
							onChange={this.onUsernameChange}
							/>
						</div>
						<div className="mv3">
							<label className="db fw6 lh-copy f6" htmlFor="password">Parool</label>
							<input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"
							onChange={this.onPasswordChange}
							/>
						</div>
					</fieldset>
					<div className="">
						<input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"
						onClick={this.onSubmitSignIn}
						/>
					</div>
				</div>
				:
				<div className='flex flex-column ph3'>
					<div className='flex'>
						{/* <button onClick={() => this.changeTab('Categories')}>Kategooriad</button>
						<button onClick={() => this.changeTab('Subcategories')}>Alamkategooriad</button>
						<button onClick={() => this.changeTab('Verses')}>Salmid</button> */}
						<button onClick={() => this.changeTab('Invoice')}>Arved</button>
					</div>
					{(() => {
	        switch(tabName) {
	          // case 'Categories':
	          //   return <Categories />;
						// 	break
	          // case 'Subcategories':
	          //   return <SubCategories />;
						// 	break
	          // case 'Verses':
	          //   return <Verses />;
						// 	break
						case 'Invoice':
	            return <Invoice />;
							break
	          default:
	            return <Invoice />;
	        }
	      	})()}
				</div>
			}
			</div>
		)


	}

}

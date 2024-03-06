import getConfig from 'next/config'
import {connect} from "react-redux";

const {cloudinary} = getConfig().publicRuntimeConfig

const GetCartItems = props => {
	const {cart, mobileMenu} = props
	let sum = 0
  return (
    <div>
			{
			!mobileMenu ?
			cart.items.map((item, i) => {
				sum += parseInt(item.price)
				return (
					<div key={i} className='border flex items-center justify-between fw4 pv2 ph2'>

						<div className='flex justify-between items-center w-100'>
							<span className='preview flex justify-center items-center mb2 mb0-ns'><img src={`${cloudinary}/f_auto,q_auto,w_70,h_47,c_limit/${item.imgSrc}`} alt='' /></span>
							<div className='flex w-100'>
								<a className='mb2 mb0-ns fw5 w-70 link black' href={item.link}>{item.title.replace(/_/g," ")}</a>
								<span className='mb2 mb0-ns fw5 w-30'>{item.price}€</span>
							</div>
							<div className='flex flex-column-ns'>
								<span
									onClick={() => props.dispatch({type: 'REMOVEFROMCART', title: item.title})}
									className='pointer flex items-center' ><img className='icon' src={`${cloudinary}/static/icon-delete.svg`} alt='' /></span>
							</div>
						</div>

					</div>
				)
			})
			:
 			cart.items.map((item, i) => {
				sum += parseInt(item.price)
				return (
					<div key={i} className='border flex flex-column items-center justify-between fw4 pv2 ph2'>
						<a className='mb2 mb0 fw5 link black' href={item.link}>{item.title.replace(/_/g," ")}</a>
						<div className='flex justify-between items-center w-100'>
							<span className='preview flex justify-center items-center mb2 mb0'><img src={`${cloudinary}/f_auto,q_auto,w_80,h_53,c_limit/${item.imgSrc}`} alt='' /></span>
							<span className='mb2 mb0fw5'>{item.price}€</span>
							<div className='flex flex-column'>
								<span
									onClick={() => props.dispatch({type: 'REMOVEFROMCART', title: item.title})}
									className='pointer flex items-center' ><img className='icon' src={`${cloudinary}/static/icon-delete.svg`} alt='' /></span>
							</div>
						</div>

					</div>
				)
			})
			}
			<div className='flex justify-center justify-end-l pv2 ph2 fw6'>
				<span>Summa kokku: {`€${sum}`}</span>
			</div>
		<style jsx>
			{`
				.remove {
					background-color: #d01212;
					color: white;
				}

				.icon {
					height: 1.25rem;
					width: 80px;
				}
				.preview {
					width: 80px;
				}

				.border {
					border-bottom: 1px dotted #000;
				}

			`}
		</style>
		</div>
  );
};

export default connect(state => state)(GetCartItems);

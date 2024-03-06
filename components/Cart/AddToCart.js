import {connect} from "react-redux";
import getConfig from 'next/config'
const {cloudinary} = getConfig().publicRuntimeConfig
const cloudinaryLink = cloudinary + "/static/"

const AddToCart = props => {


	let cartTitles = null
	if ( props.cart !== null ) {
		cartTitles = props.cart.items.map(item => {
			return item.title
		})
	}

	if (props.cart !== null && cartTitles.includes(props.title)){
		return <button onClick={() => props.dispatch({type: 'REMOVEFROMCART',title: props.title})} className='flex items-center callButton remove nav-bg br2 tc pa2 mb0 mt1 fw5'>Eemalda<span className='flex items-center ml1'><img className='h1' src={`${cloudinaryLink}icon-delete.svg`} /></span></button>
	} else {
		return <div onClick={() => props.dispatch({type: 'ADDTOCART', title: props.title, imgSrc: props.imgSrc, price: props.price, link: props.link})} className='callButton nav-bg pointer br2 tc pa2 mb0 mt1 fw5'>Lisa korvi
			 {/* - €{props.price} */}
		</div>
	}
};

export default connect(state => state)(AddToCart);

import { actionTypes } from './actions'

const initialState = {
	cart: null,
	termsIsOpen: false,
	initialItem: null,
	mobileMenu: false,
	fixedNav: false
}

const addToCart = (title, imgSrc, price, link ) => {
	let currentStorage = localStorage.getItem('marjemaa-cart')
	let newStorage
	if ( currentStorage != null ) {
		currentStorage = JSON.parse(currentStorage)
		currentStorage.items.push({
			title: title,
			imgSrc: imgSrc,
			price: price,
			link: link
		})
		newStorage = currentStorage
	} else {
		newStorage = {
			items: [{
				title: title,
				imgSrc: imgSrc,
				price: price,
				link: link
			}]
		}
	}
	localStorage.setItem('marjemaa-cart', JSON.stringify(newStorage));
	return newStorage
}

const removeFromCart = (title, cart) => {
	cart = JSON.parse(JSON.stringify(cart))
	if ( cart.items.length === 1) {
		localStorage.clear()
		return {
			cart: null
		}
	} else {
		let newItems = cart.items.filter((item, i) => {
			return item.title != title
		})
		cart.items = newItems
		localStorage.setItem('marjemaa-cart', JSON.stringify(cart));
		return { cart: cart }
	}
}

const setInitialItem = (isOpen, title, imgSrc, price, link) => {
	let initialItem
	if ( !isOpen === true ) {
		initialItem = {
				title: title,
				imgSrc: imgSrc,
				price: price,
				link: link
		}
	} else {
		initialItem = null
	}
	return initialItem
}

const reducer = (state = initialState, action) => {
		let element
    switch (action.type) {
				case actionTypes.FILLCART:
					return {
						...state,
						...{
							cart: action.payload
						}
					}
        case actionTypes.ADDTOCART:
          return {
						...state,
						...{ cart: addToCart(action.title, action.imgSrc, action.price, action.link)}
					}
				case actionTypes.REMOVEFROMCART:
					return {
						...state,
						...removeFromCart(action.title, state.cart)
					}
				case actionTypes.CLEARCART:
					localStorage.clear()
					return {
						...state,
						...{ cart: null}
					}
				case actionTypes.TOGGLETERMS:
					element = document.querySelector("body");
  				element.classList.toggle("modal-open");
					return {
						...state,
						...{termsIsOpen: !state.termsIsOpen}
					}
				case actionTypes.UPDATEHEADERHEIGHT:
					return {
						...state,
						...{ headerHeight: action.headerHeight}
					}
					break
					case actionTypes.FIXNAVBAR:
						return {
							...state,
							...{ fixedNav: action.fixedNav}
						}
						break
				case actionTypes.SETMOBILEMENU:
					return {
						...state,
						...{ mobileMenu: action.mobileMenu}
					}
					break
        default:
            return state
    }
};

export default reducer

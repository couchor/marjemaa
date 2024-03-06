export const actionTypes = {
	FILLCART: 'FILLCART',
	ADDTOCART: 'ADDTOCART',
	REMOVEFROMCART: 'REMOVEFROMCART',
	CLEARCART: 'CLEARCART',
	TOGGLETERMS: 'TOGGLETERMS',
	UPDATEHEADERHEIGHT: 'UPDATEHEADERHEIGHT',
	SETMOBILEMENU: 'SETMOBILEMENU',
	FIXNAVBAR: 'FIXNAVBAR'
}

export function fillCart () {
	return { type: actionTypes.FILLCART}
}

export function addtoCart () {
	return { type: actionTypes.ADDTOCART}
}

export function removeFromCart () {
	return { type: actionTypes.REMOVEFROMCART}
}

export function clearCart() {
	return { type: actionTypes.CLEARCART}
}

export function TOGGLETERMS() {
	return { type: actionTypes.TOGGLETERMS}
}

export function UPDATEHEADERHEIGHT() {
	return { type: actionTypes.UPDATEHEADERHEIGHT}
}

export function FIXNAVBAR() {
	return { type: actionTypes.FIXNAVBAR}
}

export function SETMOBILEMENU() {
	return { type: actionTypes.SETMOBILEMENU}
}

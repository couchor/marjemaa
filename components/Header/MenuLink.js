import { withRouter } from 'next/router'
import ActiveLink from './ActiveLink'
import React, { Children } from 'react'


const MenuLink = ({ router, ...props }) => (
	<li className={`parent mh0-ns pa3 relative-ns ${props.isMobile && 'bb'} `}>
		<ActiveLink activeClassName='active' href={props.href}>
			<a className='black-70 hover-black link'>{props.title}</a>
		</ActiveLink>
		{/* { (props.title === 'Fotod' || props.title === 'Sutsuke salme' || props.title === 'Read pildil') &&

		<ul className='list flex flex-column-ns flex-wrap justify-around absolute-ns pt3 pb2 pl0 left-0 nav-bg ml2 tl'>
			{
				props.categories.map((cat_name, i) => {
				return (
					<li key={i} className='pa2'>
						<ActiveLink activeClassName='hover-active' pathName={props.pathName} href={`/${encodeURI(props.title.replace(/\s/g, "-")).toLowerCase()}/${encodeURI(cat_name.replace(/\s/g, "-")).toLowerCase()}`}>
							<a className='black-70 hover-black link'>{cat_name}</a>
						</ActiveLink>
					</li>
				)
			})}
		</ul>

		} */}
		<style jsx>
			{`
				.active {
					color: black;
					text-shadow: 0px 0px 0px black;
					border-bottom: 2px solid black;
				}
				.hover-active {
					color: black;
					text-shadow: 0px 0px 0px black;
				}
				ul {
					transition: opacity .4s, z-index .4s;
					// z-index: -1;
					// width: max-content;
				}

				.parent:hover ul, .parent:focus ul {
					transition: opacity .4s;
					opacity: 1;
					// z-index: 99;
				}
				@media only screen and (min-width: 30em) {
					ul {
						opacity: 0
					}
				}
			`}
		</style>
	</li>
)

export default MenuLink

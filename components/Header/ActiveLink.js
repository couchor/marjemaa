import { withRouter } from 'next/router'
import Link from 'next/link'
import React, { Children } from 'react'

const ActiveLink = ({ router, children, ...props }) => {
  const child = Children.only(children)

  let className = child.props.className || null

  if
	((router.pathname === props.href
		|| decodeURI(props.pathName) === props.href
		|| ( (router.pathname === '/alamkategooriad' || router.pathname === '/kategooria') && ( (props.href === '/fotod' && !router.asPath.includes("read-pildil") ) || (props.href === '/read-pildil' && !router.asPath.includes("fotod") ) ) )
		|| ( router.pathname === '/salmidesisu' && props.href === '/sutsuke-salme')
	)
		&& props.activeClassName) {
    className = `${className !== null ? className : ''} ${
      props.activeClassName
    }`.trim()
  }

  delete props.activeClassName

  return <Link as={props.href} href={props.href}>{React.cloneElement(child, { className })}</Link>
}

export default withRouter(ActiveLink)

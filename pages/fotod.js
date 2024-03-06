import 'isomorphic-unfetch';

import Layout from '../components/MyLayout'
import CatCard from '../components/Category/CatCard'
import CatList from '../components/Category/CatList'

const Fotod = (props) => {
  return (
    <Layout seo_title={props.seo.seo_title} seo_description={props.seo.seo_description}>
			<div className="info-wrapper pa3 mb4 fw5">
				<p className='mt0 mb0'>Soovi korral siit midagi endale tellida, vaata rubriiki <b><a href='/tellimine' >tellimine</a></b>.</p>
			</div>
			<CatList categories={props.categories} parent={props.parent} />
    </Layout>

  )
}

Fotod.getInitialProps = async function({req}) {
	let hostName = "";
	if ( req ) {
		hostName = "http://" + req.headers.host + "/"
	} else {
		hostName = window.origin + "/"
	}

  const resp = await fetch(`${hostName}kategooriad/fotod`)
  const data = await resp.json()

  return {
    categories: data.categories,
		parent: 'fotod',
		seo: data.seo
  }
}

export default Fotod

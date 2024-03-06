import { withRouter } from 'next/router'
import Layout from '../components/MyLayout.js'
import CatList from '../components/Category/CatList.js'
import 'isomorphic-unfetch';

const Alamkategooria = withRouter(props => (
	<Layout seo_title={props.seo_title} seo_description={props.seo_description}>
    <CatList categories={props.categories} parent={props.parent} />
  </Layout>
))

Alamkategooria.getInitialProps = async (context) => {
	const { title } = context.query;

	const { req } = context;
	let hostName = "";
	if ( req ) {
		hostName = "http://" + req.headers.host + "/"
	} else {
		hostName = window.origin + "/"
	}

  const resp = await fetch(`${hostName}alamkategooriad/${title}`)
  const data = await resp.json()

  return {
		categories: data.subCategories,
		parent: `fotod/${title}`,
		seo_title: data.seo.seo_title,
		seo_description: data.seo.seo_description
  }
}

export default Alamkategooria

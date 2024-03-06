import 'isomorphic-unfetch';

import Layout from '../components/MyLayout'
import CatList from '../components/Category/CatList'

const Salmid = (props) => {
  return (
    <Layout seo_title={props.seo.seo_title} seo_description={props.seo.seo_description}>
			<div className="info-wrapper pa3 mb4 fw5">
				<p className='mt0'>Käesolevas rubriigis esitletud tekstide avalik esitamine ja/või levitamine mittetulunduslikul eesmärgil on lubatud viitega teksti autorlusele. Soovi korral kasutada teksti mingi tulundusliku, ärilise iseloomuga loome- või muu projekti raames tuleb võtta e-kirja teel ühendust autoriga.</p>
			</div>
			<CatList categories={props.categories} parent={props.parent} />
			<style jsx>
				{`
					.info-wrapper {
					  // border: 2px solid rgba(0, 0, 102, 0.6);
						background-color: rgb(255, 240, 197);
						border-width: .5rem;
						border-color: #fff;
						font-size: 1.1rem;
						width: max-content;
						max-width: 100%;
						margin-left: auto;
						margin-right: auto;
					}

					@media only screen and ( min-width: 768px ) {
					  .cat-card-wrap {
					    justify-content: space-between;
					  }
					}
				`}
			</style>
    </Layout>

  )
}

Salmid.getInitialProps = async ({req}) => {
	let hostName = "";
	if ( req ) {
		hostName = "http://" + req.headers.host + "/"
	} else {
		hostName = window.origin + "/"
	}

  const resp = await fetch(`${hostName}kategooriad/salmid`)
  const data = await resp.json()

  return {
    categories: data.categories.map(entry => entry.cat_name),
		parent: './sutsuke-salme',
		seo: data.seo[0]
  }
}

export default Salmid

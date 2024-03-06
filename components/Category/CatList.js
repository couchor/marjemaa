import CatCard from './CatCard'

const CatList = props => (
  <div className='flex flex-wrap justify-around'>
		 {
				props.categories.map((cat, i) => {
				 return (
					 <CatCard key={i} title={cat} parent={props.parent} />
				 );
			 })
		 }
  </div>
) 



export default CatList

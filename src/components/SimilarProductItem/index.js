// Write your code here
import './index.css'

const SimilarProductItem = props => {
  const {similarItem} = props

  const {title, brand, price, rating, imageUrl} = similarItem

  return (
    <li className="listed-items">
      <img className="imageUrl" src={imageUrl} alt="similar product" />
      <h1 className="title-similar">{title}</h1>
      <p className="brand-similar">{brand}</p>
      <div className="flex-price-rating">
        <p className="price-similar">Rs {price}/-</p>
        <div className="star-price-flex">
          <p>{rating}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className="star-image"
          />
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem

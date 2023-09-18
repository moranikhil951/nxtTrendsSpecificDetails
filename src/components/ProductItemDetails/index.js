// Write your code here
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'

import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'
import './index.css'

const statusView = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class ProductItemDetails extends Component {
  state = {
    updatedData: [],
    similarProductList: [],
    count: 1,
    statusUpdate: '',
  }

  componentDidMount() {
    this.getProductItemDetails()
  }

  Increment = () => {
    this.setState(prevState => ({
      count: prevState.count + 1,
    }))
  }

  descremenet = () => {
    const {count} = this.state
    this.setState(prevState => ({
      count: prevState.count - 1,
    }))
    if (count <= 1) {
      this.setState({count: 1})
    }
  }

  continueButton = () => {
    const {history} = this.props
    history.replace('/products')
  }

  getProductItemDetails = async () => {
    this.setState({statusUpdate: statusView.loading})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const fetchedData = {
        id: data.id,
        availability: data.availability,
        brand: data.brand,
        description: data.description,
        imageUrl: data.image_url,
        price: data.price,
        rating: data.rating,
        style: data.style,
        title: data.title,
        totalReviews: data.total_reviews,
      }

      const similarProductDetails = data.similar_products.map(product => ({
        id: product.id,
        imageUrl: product.image_url,
        availability: product.availability,
        brand: product.brand,
        description: product.description,
        price: product.price,
        rating: product.rating,
        style: product.style,
        title: product.title,
        totalReviews: product.total_reviews,
      }))

      this.setState({
        updatedData: fetchedData,
        similarProductList: similarProductDetails,
        statusUpdate: statusView.success,
      })
    } else {
      this.setState({statusUpdate: statusView.failure})
    }
  }

  renderFailureView = () => (
    <div className="failure-view">
      <div className="mini-failure-con">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
          alt="failure view"
          className="error-view"
        />
        <h1>Product Not Found</h1>
        <button
          type="button"
          onClick={this.continueButton}
          className="continue-button"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  )

  renderSuccessView = () => {
    const {updatedData, similarProductList, count} = this.state
    return (
      <div className="product-Details-Container">
        <div className="information-product-con">
          <img
            src={updatedData.imageUrl}
            alt="product"
            className="image-product"
          />
          <div className="info-product">
            <h1 className="title">{updatedData.title}</h1>
            <p className="price">Rs {updatedData.price}/-</p>
            <div className="flex-reviews">
              <div className="flex-rating-and-star">
                <p>{updatedData.rating}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                  className="star"
                />
              </div>
              <p>{updatedData.totalReviews} Reviews</p>
            </div>
            <p className="description-product">{updatedData.description}</p>
            <p>
              <span className="highlet-heading">Availability: </span>
              {updatedData.availability}
            </p>
            <p>
              <span className="highlet-heading">Brand: </span>
              {updatedData.brand}
            </p>
            <hr />
            <div className="adding-cart">
              <button
                data-testid="minus"
                type="button"
                onClick={this.descremenet}
                className="button-cart"
              >
                <BsDashSquare className="minus-con" />
              </button>

              <p className="count">{count}</p>

              <button
                data-testid="plus"
                type="button"
                className="button-cart"
                onClick={this.Increment}
              >
                <BsPlusSquare className="plus-con" />
              </button>
            </div>
            <button type="button" className="button">
              ADD TO CART
            </button>
          </div>
        </div>

        <h1 className="similar-product-heading">Similar Products</h1>
        <ul className="unorder-list-similar">
          {similarProductList.map(eachItem => (
            <SimilarProductItem similarItem={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderProductDetails = () => {
    const {statusUpdate} = this.state
    switch (statusUpdate) {
      case statusView.success:
        return this.renderSuccessView()
      case statusView.failure:
        return this.renderFailureView()
      case statusView.loading:
        return this.renderLoader()
      default:
        return null
    }
  }

  renderLoader = () => (
    <div className="failure-view">
      <div className="mini-failure-con" data-testid="loader">
        <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
      </div>
    </div>
  )

  render() {
    return (
      <div>
        <Header />
        <div>{this.renderProductDetails()}</div>
      </div>
    )
  }
}

export default ProductItemDetails

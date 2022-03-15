import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"

const Product = ({ product }) => {
    return (
        <Card className='my-3 p-3 rounded'>
            <Link to={`/product/${product.id}`}>
                <Card.Img
                    src={
                        product.book_cover_photo
                            ? `/images/${product.book_cover_photo}.jpg`
                            : `/images/default.jpg`
                    }
                    variant='top'
                />
            </Link>

            <Card.Body>
                <Link to={`/product/${product.id}`}>
                    <Card.Title as='div'>
                        <strong>
                            {product.book_title.length > 25
                                ? `${product.book_title.substring(0, 20)} ...`
                                : product.book_title}
                        </strong>
                    </Card.Title>
                </Link>

                <Card.Text as='div'>
                    {product?.author_name ? (
                        <p>{product?.author_name}</p>
                    ) : (
                        <p>{product?.author?.author_name}</p>
                    )}
                </Card.Text>
                <Card.Text as='h3'>${Number(product.final_price)}</Card.Text>
                {Number(product.book_price) > Number(product.final_price) ? (
                    <Card.Text
                        className='text-muted'
                        style={{
                            textDecorationLine: "line-through",
                            textDecorationStyle: "solid",
                        }}
                    >
                        ${Number(product.book_price)}
                    </Card.Text>
                ) : (
                    <Card.Text>${Number(product.book_price)}</Card.Text>
                )}
            </Card.Body>
        </Card>
    )
}

export default Product

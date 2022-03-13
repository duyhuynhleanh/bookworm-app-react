import { Card } from "react-bootstrap"

const Product = ({ product }) => {
    return (
        <Card className='my-3 p-3'>
            <Card.Img
                src={
                    product.book_cover_photo
                        ? `/images/${product.book_cover_photo}.jpg`
                        : `/images/default.jpg`
                }
                variant='top'
            />

            <Card.Body>
                <Card.Title as='div'>
                    <strong>{product.book_title}</strong>
                </Card.Title>

                <Card.Text as='div'>
                    <p>{product?.author_name}</p>
                </Card.Text>
                <Card.Text as='h3'>${product.final_price}</Card.Text>
                {product.book_price > product.final_price ? (
                    <Card.Text
                        className='text-muted'
                        style={{
                            textDecorationLine: "line-through",
                            textDecorationStyle: "solid",
                        }}
                    >
                        ${product.book_price}
                    </Card.Text>
                ) : (
                    <Card.Text>${product.book_price}</Card.Text>
                )}
            </Card.Body>
        </Card>
    )
}

export default Product

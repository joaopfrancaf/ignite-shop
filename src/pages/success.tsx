import { GetServerSideProps } from "next";
import Link from "next/link";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import { ImageContainer, SuccessContainer } from "../styles/pages/success";
import Image from 'next/image'

interface SuccessProps {
    custumerName: string;
    product: {
        name: string;
        imageUrl: string;
    }
}
export default function Success({custumerName, product}: SuccessProps) {
    return (
        <SuccessContainer>
            <h1>Compra efetuada!</h1>
            <ImageContainer>
                <Image src={product.imageUrl} width={120} height={110} alt=""/>
            </ImageContainer>

            <p>uhull <strong>{custumerName}</strong>o produto <strong>{product.name}</strong> foi compradaaaaaaaaaaa</p>
            <Link href="/">
                voltar ao catalogo
            </Link>
        </SuccessContainer>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const sessionId = String(query.session_id)

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items', 'line_items.data.price.product']
    })

    const customerName = session.customer_details.name;
    const product = session.line_items.data[0].price.product as Stripe.Product

    return {
        props: {
            customerName,
            product: {
                name: product.name,
                imageUrl: product.images[0],
            }
        }
    }
}
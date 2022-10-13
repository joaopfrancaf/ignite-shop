import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router' 
import Stripe from 'stripe'
import Image from 'next/future/image'
import { stripe } from '../../lib/stripe'
import { ProductContainer, ImageContainer, ProductDetails } from '../../styles/pages/product'
import axios from 'axios'
import React, { useState } from 'react';

interface ProductProps {
    product: {
        id:string;
        name: string;
        imageUrl:string;
        price: string;
        description: string;
        defaultPriceId: string
    }
}
export default function Product({ product }: ProductProps) {
    const [isCreathingCheckoutSession, setIsCreathingCheckoutSession] = useState(false)

    async function handleBuyProduct () {
        try {
            setIsCreathingCheckoutSession(true)

            const response = await axios.post('/api/checkout', {
                priceId: product.defaultPriceId,
            })
            
            const { checkoutUrl } = response.data;

            window.location.href = checkoutUrl
        } catch (err) {
            setIsCreathingCheckoutSession(false)

            alert('falha ao redirecionar ao checkout')
        }
    }
    return (
        <ProductContainer>
            <ImageContainer>
            <Image src={product.imageUrl} alt="" width={520} height={400} />
            </ImageContainer>

            <ProductDetails>
                <h1>{product.name}</h1>
                <span>{product.price}</span>

                <p>{product.description}</p>
            
                <button disabled={isCreathingCheckoutSession} onClick={handleBuyProduct}>
                    comprar agora
                </button>
            </ProductDetails>
        </ProductContainer>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking',
    }
}

export const getStaticProps: GetStaticProps<any, {id: string}> = async ({ params }) => {
    const productId = params.id;

    const product = await stripe.products.retrieve(productId, {
        expand: ['default_price'],
    });

    const price = product.default_price as Stripe.Price

    return {
        props: {
            product: {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],
                price: new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                }).format(price.unit_amount / 100),
                description: product.description,
                defaultPriceId: price.id,
            }
        },

        revalidate: 60 * 60 * 1, //quanto tempo em cache (1h)
    }
}

function UseState(arg0: boolean): [any, any] {
    throw new Error('Function not implemented.')
}

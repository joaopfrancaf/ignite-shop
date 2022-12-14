import { HomeContainer, Product } from "../styles/pages/home"
import Image from "next/future/image";

import {useKeenSlider } from 'keen-slider/react'

import camiseta1 from '../assests/camisetas/1.png'
import camiseta2 from '../assests/camisetas/2.png'
import camiseta3 from '../assests/camisetas/3.png'

import 'keen-slider/keen-slider.min.css';
import { stripe } from "../lib/stripe";
import { GetServerSideProps, GetStaticProps } from "next";
import Stripe from "stripe";

import Link from 'next/link';

//import { styled } from "../styles"

/*
const Button = styled('button',{
  backgroundColor: '$green300',/*css aqui no stitches é um objeto javascript*/
  /*
  borderRadius: 4,
  border: 0,
  padding:'4p 8px',

  /*encadeamento de estilização aqui*/
  /*
  span: {
    fontWeight: 'bold'
  },

  '&:hover': { /*o e comercial (&) indica o proprio elemento (o buttom)*/
  /*
    filter: 'brightness(0.8)'
  },
  
})  
*/

interface HomeProps {  //criar uma tipagem pro prop que entra na function home
  products: {
    id: string,
    name: string,
    imageUrl:string,
    price:string;
  }[] //colchetes no final (pq é um array de product)
}

export default function Home({products}: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing:48,
    }
  })   //aqui é o codigo da biblioteca do carousel (KeenSlider)

  return (
    <HomeContainer ref={sliderRef} className='keen-slider'>
    {products.map(product => {
      return (
        <Link  href={`/product/${product.id}`} key={product.id}>
            <Product className="keen-slider__slide">
            <Image src={product.imageUrl} width={520} height={480} alt=""/>

            <footer>
              <strong>{product.name} x</strong>
              <span>{product.price}</span>
            </footer>
          </Product>
        </Link>
      )
    })}
    </HomeContainer>
  )
}


//embaixo metodo para fazer o fatch no stripe, ele fica no lado do servidor node do next.js e fica em cache nele
//lembrando que esse metodo fica no lado do nextjs, entao qualquer console.log só aparece no console, nao na pagina
export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {

    const price = product.default_price as Stripe.Price
    
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(price.unit_amount / 100),
  }
  })

  return {
    props: {
      products
    },
    revalidate: 60 + 60 * 2, //2 horas a pagina é revalidada
  }
}
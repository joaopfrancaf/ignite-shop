import { HomeContainer, Product } from "../styles/pages/home"
import Image from "next/future/image";

import {useKeenSlider } from 'keen-slider/react'

import camiseta1 from '../assests/camisetas/1.png'
import camiseta2 from '../assests/camisetas/2.png'
import camiseta3 from '../assests/camisetas/3.png'

import 'keen-slider/keen-slider.min.css';
import { stripe } from "../lib/stripe";
import { GetServerSideProps } from "next";

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



export default function Home(props) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing:48,
    }
  })   //aqui é o codigo da biblioteca do carousel (KeenSlider)
  return (
    <HomeContainer ref={sliderRef} className='keen-slider'>
      <Product className="keen-slider__slide">
        <Image src={camiseta1} width={520} height={480} alt=""/>

        <footer>
          <strong>Camiseta x</strong>
          <span>RS 79,99</span>
        </footer>
      </Product>

      <Product className="keen-slider__slide">
        <Image src={camiseta2} width={520} height={480} alt=""/>

        <footer>
          <strong>Camiseta x</strong>
          <span>RS 79,99</span>
        </footer>
      </Product>

      <Product className="keen-slider__slide">
        <Image src={camiseta3} width={520} height={480} alt=""/>

        <footer>
          <strong>Camiseta x</strong>
          <span>RS 79,99</span>
        </footer>
      </Product>

      <Product className="keen-slider__slide">
        <Image src={camiseta3} width={520} height={480} alt=""/>

        <footer>
          <strong>Camiseta x</strong>
          <span>RS 79,99</span>
        </footer>
      </Product>
    </HomeContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await stripe.products.list()

  console.log(response.data)

  return {
    props: {
      list: [1,2,3]
    }
  }
}

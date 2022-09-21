import { styled } from "../styles"

const Button = styled('button',{
  backgroundColor: '$green300',/*css aqui no stitches é um objeto javascript*/
  borderRadius: 4,
  border: 0,
  padding:'4p 8px',

  /*encadeamento de estilização aqui*/
  span: {
    fontWeight: 'bold'
  },

  '&:hover': { /*o e comercial (&) indica o proprio elemento (o buttom)*/
    filter: 'brightness(0.8)'
  },
  
})

export default function Home() {
  return (
    <Button>
      <span>teste</span> enviar
    </Button>
  )
}

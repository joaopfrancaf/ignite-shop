import Link from "next/link";
import { ImageContainer, SuccessContainer } from "../styles/pages/success";

export default function Success() {
    return (
        <SuccessContainer>
            <h1>Compra efetuada!</h1>
            <ImageContainer>
                
            </ImageContainer>

            <p>uhull <strong>Joao Pedro</strong>o produto <strong>camisa tal</strong> foi compradaaaaaaaaaaa</p>
            <Link href="/">
                voltar ao catalogo
            </Link>
        </SuccessContainer>
    )
}
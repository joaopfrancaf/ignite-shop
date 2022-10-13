import { NextApiRequest, NextApiResponse } from "next";
import { json } from "stream/consumers";
import { stripe } from "../../lib/stripe";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {priceId} = req.body

    if (req.method != 'POST') {
        return res.status(405).json({error: "method not allowed"})
    }

    if (!priceId) {
        return res.status(400).json({error: "price not found"})
    }

    //as requesiços acima, caso o method http for errado aparece a mensagem, primeira, caso nao tem o priceid aparece a segunda

    const success_url = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;//esse CHECKOUT_SESSION_ID é uma variavel do stripe, que traz na requisição acho todos os dados de compra do stripe
    const cancel_url = `${process.env.NEXT_URL}/`;


    const checkoutSession = await stripe.checkout.sessions.create({
        success_url: success_url,
        cancel_url: cancel_url,
        mode: 'payment',
        line_items: [
            {
                price: priceId,
                quantity:1,
            }
        ]
    })
    //acima configuração do checkout stripe

    return res.status(201).json({
        checkoutUrl: checkoutSession.url,
    });
}
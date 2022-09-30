import { CheckoutInput } from "dh-marvel/features/checkout/checkout.types";
import router from "next/router";




export const postCheckout = async (data: CheckoutInput | any) => {
    await fetch("/api/checkout", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (response.status === 405) {
                console.log("ERROR_METHOD_NOT_ALLOWED");
            } else {
                return response.json();
            }
        })
        .then((data) => {
            console.log(data.error);
            if (data.error) {
                switch (data.error) {
                    case "ERROR_INCORRECT_ADDRESS":
                        console.log('direccion incorrecta');
                        break
                    case "ERROR_CARD_WITHOUT_FUNDS":
                        console.log('sinfondos');
                        break
                    case "ERROR_CARD_WITHOUT_AUTHORIZATION":
                        console.log('sin autorizacionon');
                        break
                    case "ERROR_CARD_DATA_INCORRECT":
                        console.log('datos de tarjeta incorrectos');
                        break
                    default:
                        console.log("new error");
                        break
                }
            } else {
                router.push({
                    pathname: '/confirmacion-compra'
                })
            }
        })
}


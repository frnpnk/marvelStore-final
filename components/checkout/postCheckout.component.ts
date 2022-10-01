import { CheckoutInput } from "dh-marvel/features/checkout/checkout.types";
import router from "next/router";




export const postCheckout = async (data: CheckoutInput) => {
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
        .then((res) => {
            console.log(res);
            if (res.error) {
                return (
                    res.message
                )
            } else {
                router.push({
                    pathname: '/confirmacion-compra',
                    query: res
                })
            }
        })
}


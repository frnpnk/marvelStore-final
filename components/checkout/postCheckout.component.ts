import { CheckoutInput } from "dh-marvel/features/checkout/checkout.types";
import { response } from "msw";
import { FC } from "react";





export const postCheckout = async (data: CheckoutInput) => {
    await fetch("/api/checkout",
        {
            method: "POST",
            headers: { 'Content-Type': 'application/json',
        },
            body: JSON.stringify(data)
        }
    ).then((response)=>{
        console.log(response);
        
        if (response.status === 405){
            console.log("ERROR_METHOD_NOT_ALLOWED");
        }else{
            return response.json();
        }
    })
}


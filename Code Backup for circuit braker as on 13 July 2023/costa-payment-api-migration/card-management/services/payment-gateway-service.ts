import { wordPayClient } from "../libs/axios";
import { addCardWithSessionInterface } from "../libs/interfaces";
export class PaymentGatewayService {
  async generateSessionByCardDetails(payload: any): Promise<any> {
    payload = {
      identity: "69a7d987-c26d-4d0e-b502-f6d10c76c857",
      cardExpiryDate: {
        month: 12,
        year: 2023,
      },
      cvc: "123",
      cardNumber: "4444333322221111",
    };
    return await wordPayClient.post("/verifiedTokens/sessions", payload, {
      headers: {
        accept: "application/vnd.worldpay.verified-tokens-v1.hal+json",
        "content-type": "application/vnd.worldpay.verified-tokens-v1.hal+json",
      },
    });
  }

  async createVerifiedTokenBySession(
    payload: addCardWithSessionInterface
  ): Promise<any> {
    const { sessionState, cardHolderName } = payload;
    let requestBody = {
      description: "Token-Description",
      paymentInstrument: {
        type: "card/checkout",
        cardHolderName: cardHolderName,
        sessionHref:
          "https://try.access.worldpay.com/verifiedTokens/sessions/" +
          sessionState,
      },
      merchant: {
        entity: "default",
      },
      verificationCurrency: "GBP",
    };

    return await wordPayClient.post("/verifiedTokens/cardOnFile", requestBody, {
      headers: {
        accept: "application/vnd.worldpay.verified-tokens-v1.hal+json",
        "content-type": "application/vnd.worldpay.verified-tokens-v1.hal+json",
      },
    });
  }

  async retrieveCardDetailsByToken(token: any): Promise<any> {
    return await wordPayClient.get("tokens/" + token);
  }
  
  async initializationDeviceData(payload: any): Promise<any> {
    const {transactionReference, merchant, tokenReference} = payload

    let apiPayload = {
      transactionReference: transactionReference,
      paymentInstrument: {
        "type": "card/tokenized",
        "href": "https://try.access.worldpay.com/tokens/"+tokenReference
      },
      merchant: merchant ? merchant : { entity: "default"}
    };
    return await wordPayClient.post("verifications/customers/3ds/deviceDataInitialization", apiPayload, {
      headers: {
        "content-type": "application/vnd.worldpay.verifications.customers-v2.hal+json"  
      }
    });
  }



}

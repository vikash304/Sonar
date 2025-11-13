import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import {
  findLastSegmentOfUrl,
  formatError,
  formatResponse
} from "../../libs/helpers";
import { addCardWithSessionInterface } from "../../libs/interfaces";
import { LambdaResponse } from "../../libs/types";
import { PaymentGatewayService } from "../../services/payment-gateway-service";

export async function addCardSessionHandler(
  event: any
): Promise<LambdaResponse | undefined> {
  const addCardWithSesionRequest: addCardWithSessionInterface = event.body;
  const paymentGatewayServiceObj = new PaymentGatewayService();
  let generateSession;

  try {
    generateSession = await paymentGatewayServiceObj.generateSessionByCardDetails(
      addCardWithSesionRequest
    );

    /* call cardOnFile World Api to generate verified token from state */
    let sessionUrl = generateSession.data._links["verifiedTokens:session"].href;
    let sessionState = findLastSegmentOfUrl(sessionUrl);

    let verifiedToken;

    try {
      verifiedToken = await paymentGatewayServiceObj.createVerifiedTokenBySession(
        {
          sessionState: sessionState,
          // sessionState: addCardWithSesionRequest.sessionState,
          cardHolderName: addCardWithSesionRequest.cardHolderName,
          customerId: addCardWithSesionRequest.customerId,
        }
      );

      let verifiedTokenUrl = verifiedToken.data._links["tokens:token"].href;
      let token = findLastSegmentOfUrl(verifiedTokenUrl);

      /* call world pay api /tokens/reference to retrieve card details by token */
      try {
        let cardDetails = await paymentGatewayServiceObj.retrieveCardDetailsByToken(
          token
        );
        let cardTokenId = cardDetails.data.tokenId;
        let cardNumber4Digit = cardDetails.data.paymentInstrument.cardNumber;
        let expiryDate = cardDetails.data.paymentInstrument.cardExpiryDate;
        let cardType = cardDetails.data.paymentInstrument.type;
        let descriptionRef = findLastSegmentOfUrl(
          cardDetails.data._links["tokens:description"].href
        );

        let cardHolderNameRef = findLastSegmentOfUrl(
          cardDetails.data._links["tokens:cardHolderName"].href
        );
        let cardExpiryDateRef = findLastSegmentOfUrl(
          cardDetails.data._links["tokens:cardExpiryDate"].href
        );

        let billingAddressRef = findLastSegmentOfUrl(
          cardDetails.data._links["tokens:billingAddress"].href
        );

        let schemeTransactionRef = findLastSegmentOfUrl(
          cardDetails.data._links["tokens:schemeTransactionReference"].href
        );

        let response = {
          outcome: verifiedToken.data.outcome,
          tokenReference: token,
          cardTokenId: cardTokenId,
          cardNumber4Digit: cardNumber4Digit,
          expiryDate: expiryDate,
          cardType: cardType,
          fundingType: "",
          tokenExpiryDateTime: "expiy date time of token",
          cardReferences: {
            descriptionRef: descriptionRef,
            cardHolderNameRef: cardHolderNameRef,
            cardExpiryDateRef: cardExpiryDateRef,
            billingAddressRef: billingAddressRef,
            schemeTransactionRef: schemeTransactionRef,
          },
        };
        return formatResponse(JSON.stringify(response));
      } catch (error) {
        return formatError(error);
      }
    } catch (error) {
      return formatError(error);
    }
  } catch (error) {
    return formatError(error);
  }
}

export const handler = middy(addCardSessionHandler).use(jsonBodyParser()); // parses the request body when it's a JSON and converts it to an object
// .use(httpErrorHandler());

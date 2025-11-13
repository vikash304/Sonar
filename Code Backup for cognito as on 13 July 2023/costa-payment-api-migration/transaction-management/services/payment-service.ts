import { PaymentRepository } from "../dao/payment-repository";

export class PaymentService {
  constructor() {

  }

  getPaymentData() {
    try {
      let payment = new PaymentRepository();
      return payment.getCompany();
      } catch(e) {
        console.error(e);
        throw e;
    }
  }
}
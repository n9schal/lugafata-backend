import {
  PaymentMethodHandler,
  VendureConfig,
  CreatePaymentResult,
  SettlePaymentResult,
  LanguageCode,
} from "@vendure/core";

/**
 * This is a handler which integrates Vendure with a custom
 * payment provider. In this case, Payment on delivery.
 */

export const customPaymentProcess = new PaymentMethodHandler({
  code: "payment-on-delivery-method",
  description: [
    {
      languageCode: LanguageCode.en,
      value: "Payment On Delivery Provider",
    },
  ],
  args: {},

  /** This is called when the `addPaymentToOrder` mutation is executed */
  createPayment: (ctx, order, amount, args, metadata): CreatePaymentResult => {
    return {
      amount: order.total,
      state: "Authorized" as const,
    };
  },

  /** This is called when the `settlePayment` mutation is executed */
  settlePayment: (ctx, order, payment, args): SettlePaymentResult => {
    return { success: true };
  },
});

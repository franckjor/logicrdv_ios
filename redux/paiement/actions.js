import * as types from './types';



export const makePaiementRequest = (paymentMethodId,paymentIntent, isConfirmation) => ({
  type: types.MAKE_PAIEMENT_REQUEST,
  payload:  {paymentMethodId, paymentIntent, isConfirmation}
});


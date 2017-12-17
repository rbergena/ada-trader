import OpenOrder from 'models/open_order';
import Quote from 'models/quote';


describe('OpenOrder spec', () => {
  let currentQuote;
  let OrderAtQuotePrice;
  let OrderAboveQuotePrice;

  beforeEach(() => {
    currentQuote = new Quote({
      symbol: 'HUMOR',
      price: 85.00,
    })

    OrderAtQuotePrice = new OpenOrder({
      targetPrice: 85.0,
      symbol: 'HUMOR',
      quote: currentQuote,
      buy: true,
    })

    OrderAboveQuotePrice = new OpenOrder({
      targetPrice: 99.0,
      symbol: 'HUMOR',
      quote: currentQuote,
      buy: true,
    })
  });

  describe('validate', () => {
    it ('does not allow for price to be blank', () => {

      const invalidOrder = new OpenOrder({
        targetPrice: '',
        symbol: 'HUMOR',
        quote: currentQuote,
        buy: true,
      })

      expect(invalidOrder.isValid()).toBeFalsy();
    });

    // buy order validations
    it ('does not allow for buy orders where target price is equal to the quote', () => {
      expect(OrderAtQuotePrice.isValid()).toBeFalsy();
    });
    it ('does not allow for buy orders where target price is greater than the quote', () => {

      // const invalidBuyOrder = new OpenOrder({
      //   targetPrice: 99.0,
      //   symbol: 'HUMOR',
      //   quote: currentQuote,
      //   buy: true,
      // })
      expect(OrderAboveQuotePrice.isValid()).toBeFalsy();
    });
    it ('allows for buy orders where target price is less than the quote', () => {

      const invalidBuyOrder = new OpenOrder({
        targetPrice: 83.0,
        symbol: 'HUMOR',
        quote: currentQuote,
        buy: true,
      })
      expect(invalidBuyOrder.isValid()).toBeTruthy(`error: ${invalidBuyOrder.validationError}`);
    });

    // sell order validations
    it ('does not allow for sell orders where target price is equal to the quote', () => {

      OrderAtQuotePrice.set('buy', false);

      expect(OrderAtQuotePrice.isValid()).toBeFalsy();
    });

    it ('does not allow for sell orders where target price is less than the quote', () => {
      const invalidSellOrder = new OpenOrder({
        targetPrice: 83.0,
        symbol: 'HUMOR',
        quote: currentQuote,
        buy: false,
      })
      expect(invalidSellOrder.isValid()).toBeFalsy();
    });
    it ('allows for sell orders where target price is greater than the quote', () => {
      // const invalidSellOrder = new OpenOrder({
      //   targetPrice: 99.0,
      //   symbol: 'HUMOR',
      //   quote: currentQuote,
      //   buy: false,
      // })
      OrderAboveQuotePrice.set('buy', false)

      expect(OrderAboveQuotePrice.isValid()).toBeTruthy(`error: ${OrderAboveQuotePrice.validationError}`);
    });
  });

});

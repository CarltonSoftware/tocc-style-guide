import * as EVENTS from '../events';

export const selectMarketingBrand = function(marketingBrand) {
  return function(dispatch) {
    dispatch({
      type: EVENTS.SELECT_MARKETINGBRAND,
      marketingBrand: marketingBrand
    });
  }
};
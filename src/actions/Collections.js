import * as EVENTS from '../events';
import * as Utils from '../utils';

export const getCollection = function(entity, hash, page, limit, filters, orderBy, fields) {
  if (!hash) {
    hash = entity.toLowerCase();
  }

  return function(dispatch) {
    var col = Utils.createCollection(entity, page, limit, filters, orderBy, fields);

    dispatch({
      type: EVENTS.GET_COLLECTION_START,
      collection: col,
      hash: hash
    });

    return col.fetch().then(function(Collection) {
      dispatch({
        type: EVENTS.GET_COLLECTION_SUCCESS,
        collection: Collection,
        hash: hash
      });
    }).catch(function(err) {
      dispatch({
        type: EVENTS.GET_COLLECTION_ERROR,
        error: err,
        hash: hash
      });
    });
  }
};
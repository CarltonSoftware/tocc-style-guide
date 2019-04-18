import { common, FilterCollection } from 'plato-js-client';

export const createCollection = (entity, page, limit, filters, orderBy, fields) => {
  var object = common[entity];
  var obj = new object();
  var col = new FilterCollection({
    path: obj.path,
    object: object
  });

  col.page = page || 1;
  col.limit = limit || 10;
  col.orderBy = orderBy || '';
  col.removeAllFilters();
  col.addFilters(filters || {});
  if (fields) {
    col.fields = fields;
  }

  return col;
};
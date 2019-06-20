import * as EVENTS from '../events';
const objectPath = require('object-path');

const Tabs = (state = {}, action) => {
  state['state'] = action.type;
  
  if (action.status) {
    state['status'] = action.status;
  }
  
  if (action.error) {
    state['error'] = action.error;
  }

  switch (action.type) {
    case EVENTS.GET_COLLECTION_START:
    case EVENTS.GET_COLLECTION_SUCCESS:
    case EVENTS.GET_COLLECTION_ERROR:
      state[action.hash] = action.collection;
      break;
    default:
      break;
  }
  
  var entity;
  switch (action.type) {
  case EVENTS.UPDATE_ENTITY_START:
  case EVENTS.UPDATE_ENTITY_SUCCESS:
  case EVENTS.UPDATE_ENTITY_ERROR:
    entity = objectPath.get(state, action.objectpath);
    if (!entity) {
      return state;
    }
    break;
  }
  
  var collection;
  switch (action.type) {
  case EVENTS.UPDATE_ITEM_IN_STATE_COLLECTION_START:
  case EVENTS.UPDATE_ITEM_IN_STATE_COLLECTION_SUCCESS:
  case EVENTS.UPDATE_ITEM_IN_STATE_COLLECTION_ERROR:
    collection = objectPath.get(state, action.objectpath);
    if (!collection) {
      return state;
    }

    action.entity.updating = (action.type === EVENTS.UPDATE_ITEM_IN_STATE_COLLECTION_START);
    action.entity.updated = (action.type === EVENTS.UPDATE_ITEM_IN_STATE_COLLECTION_SUCCESS);
    
    if (collection.getEntityById(action.entityid)) {
      if (action.newentityid) {
        action.entity.id = action.newentityid;
      }
      
      collection.updateElementById(action.entityid, action.entity);
    } else {
      collection.push(action.entity);
    }

    if (action.error) {
      action.error.namespace = action.objectpath;
    }

    objectPath(state).set(action.objectpath, collection);
    break;
  }

  switch (action.type) {
  case EVENTS.GET_COLLECTION_START:
  case EVENTS.GET_COLLECTION_SUCCESS:
  case EVENTS.GET_COLLECTION_ERROR:
    return { ...state };
  case EVENTS.UPDATE_ENTITY_START:
    
    entity.updating = true;
    entity.updated = false;
    entity.error = undefined;
    objectPath.set(state, action.objectpath, entity);

    return { ...state, updating: true };
  case EVENTS.UPDATE_ENTITY_SUCCESS:
    
    action.entity.updating = false;
    action.entity.updated = true;
    action.entity.error = undefined;
    objectPath.set(state, action.objectpath, action.entity);
    
    return { ...state, updating: false };
  case EVENTS.UPDATE_ENTITY_ERROR:
    
    action.entity.updating = false;
    action.entity.updated = false;
    action.entity.error = action.error;
    objectPath.set(state, action.objectpath, action.entity);
    
    return { ...state, updating: false };
  case EVENTS.UPDATE_ITEM_IN_STATE_COLLECTION_START:
    return { ...state, collectionupdating: true };
  case EVENTS.UPDATE_ITEM_IN_STATE_COLLECTION_SUCCESS:
    return { ...state, collectionupdating: false };
  case EVENTS.UPDATE_ITEM_IN_STATE_COLLECTION_ERROR:
    return { ...state, error: action.error, collectionupdating: false };
  case EVENTS.CURRENTUSER_SETTING_START:
    return { ...state, updatingsettings: true };
  case EVENTS.CURRENTUSER_SETTING_SUCCESS:
    return { ...state, updatingsettings: false };
  case EVENTS.GET_CURRENTUSER_SUCCESS:
    return {...state, user: action.user };
  case EVENTS.SELECT_MARKETINGBRAND:
    
    // This is a bit of a hack - can't get toccstyles module import working properly
    const r = Math.round(Math.random() * 1000000000, 2);
    var css = {
      toccfonts: EVENTS.CDN + '/fonts/' + action.marketingBrand.id + '.css?r=' + r,
      toccstyles: EVENTS.CDN + '/' + action.marketingBrand.id + '/index.css?r=' + r
    };
    
    for (const i in css) {
      if (document.getElementById(i)) {
        document.getElementById(i).href = css[i];
      } else {
        var head = document.getElementsByTagName('HEAD')[0];

        // Create new link Element 
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.id = i;
        link.type = 'text/css';
        link.href = css[i];

        // Append link element to HTML head 
        head.appendChild(link);
      }
    }
    
    return {...state, selectedMarketingBrand: action.marketingBrand };
  case EVENTS.GET_CURRENTUSER_ERROR:
  case EVENTS.LOGOUT:
    return {...state, user: undefined };
  default:
    return state;
  }
};

export default Tabs;
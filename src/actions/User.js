import { client, common } from 'plato-js-client';
import * as EVENTS from '../events';
import * as Utils from '../utils';

export const whoAmi = function() {
  return function(dispatch) {
    dispatch({
      type: EVENTS.GET_CURRENTUSER_START
    });

    return client.getInstance().whoAmi().then((response) => {
      var actor = common.ActorInstance.call(this, response.entity.type.toLowerCase());

      var a = new actor(response.entity.id);
      a.mutateResponse(response.entity);

      // Load root
      client.getInstance().getRootCacheable().then(function(json) {
        for (var i in json.entity.static) {
          var col = Utils.createCollection(i);
          dispatch({
            type: EVENTS.GET_COLLECTION_START,
            collection: col,
            hash: i
          });
          col.mutateResponse(json.entity.static[i]);
          dispatch({
            type: EVENTS.GET_COLLECTION_SUCCESS,
            collection: col,
            hash: i
          });
        }
      
        dispatch({
          type: EVENTS.GET_CURRENTUSER_SUCCESS,
          user: a
        });
      })
    }).catch(function(err) {
      dispatch({
        type: EVENTS.GET_CURRENTUSER_ERROR,
        error: err
      });
    });
  }
};

export const logOut = function() {
  return function(dispatch) {
    client.getInstance().oAuthLogout();
    dispatch({
      type: EVENTS.LOGOUT
    });
  }
};

export const addUpdateActorSettingValueByIndex = function(actor, settingName, data, index) {
  return function(dispatch) {

    dispatch({
      type: EVENTS.CURRENTUSER_SETTING_START
    });

    var setting = actor.settings.filter(function(setting) {
      return setting.name === settingName;
    }).shift();

    if (!setting) {
      setting = new common.ActorSetting();
      setting.parent = actor;
      setting.name = settingName;
      setting.value = [];
    } else {
      setting.value = setting.getDecodedValue() || [];
    }
    
    if (data === null) {
      var value = setting.getDecodedValue() || [];
      if (value.length > 1 && index > 0) {
        value.splice(1, index);
      } else if (index === -1) {
        value = [];
      } else {
        value.shift();
      }

      setting.value = value;
    } else {
      if (typeof index === 'number' && setting.value[index]) {
        data.updated = new Date();
        setting.value[index] = data;
      } else {
        data.created = new Date();
        setting.value.push(data);
      }
    }

    setting.value = JSON.stringify(setting.value);

    dispatch({
      type: EVENTS.UPDATE_ITEM_IN_STATE_COLLECTION_SUCCESS,
      entity: setting,
      objectpath: 'user.settings'
    });

    setting.update().then(function() {
      dispatch({
        type: EVENTS.CURRENTUSER_SETTING_SUCCESS
      });
    }).catch(function(error) {
      dispatch({
        type: EVENTS.GET_CURRENTUSER_ERROR,
        error: error
      });
    });
  }
};
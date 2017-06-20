import axios from 'axios';

export default function ({dispatch}) {
  return next => action => {
  
    if(action.url && action.method){

      function handleSuccess (response) {
        if (action.onSuccess) {
          action.onSuccess(response);
        }
        cleanupAndDispatch(response.data);
      }

      function cleanupAndDispatch(data) {
        const newAction = {
          ...action,
          payload: data,
          url: null,
          method: null,
          redirect_now: action.redirect
        };
        dispatch(newAction);
      }

      function handleError (error) {
        if(error.response) {
          if (action.onError) {
            action.onError(error.response);
          }
          cleanupAndDispatch(error.response.data);
        }
      }

      if (localStorage.getItem('token')) {
        var config = {
          headers: {'token': localStorage.getItem('token')}
        };
      } else {
        var config = {};
      }

      switch (action.method){
        case 'GET':
          axios.get(action.url, config).then(handleSuccess).catch(handleError);
          break;

        case 'DELETE':
          axios.delete(action.url, config).then(handleSuccess).catch(handleError);
          break;

        case 'POST':
          axios.post(action.url, action.payload, config).then((response) => handleSuccess(response)).catch(handleError);
          break;
      }
      return next(action);
    }else {
      return next(action);
    }
  }
}

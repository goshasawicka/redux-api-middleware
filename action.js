import { ROOT_URL } from './config'; // define url path in external file (config in this case)
import { browserHistory } from 'react-router'

export function register ({email, password, passwordConfirm}) {
    return {
        method: 'POST',
        url: `${ROOT_URL}/register`,    
        payload: {email , password, passwordConfirm},
        type: 'AUTH_USER',
        onSuccess: (response) => {
          // do something when api call is resolved
          
          browserHistory.push('/index');
        },
        onError: (response) => {
          // do something if error
          console.log('## error', response.data);
        },
    };
}

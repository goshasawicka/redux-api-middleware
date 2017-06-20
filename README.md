# redux-api-middleware
Redux middleware to handle async api calls.


## Setup
Add api.js to your project. 

Include the middleware file to your store setup:
```
import { createStore, applyMiddleware } from 'redux';

...
const store = createStore(
  reducers,
  {},
  applyMiddleware(Api ...)
);

...
```

And you are good to go.

## Usage
### Action
As any other redux middleware, api.js is checking every action and if conditions are met (action has url and method) - action is stopped, middleware is doing its thing and dispatches a new action with updated url and method (set to null, so it's not rechecked again) and with payload coming from the response.

In order to trigger the api with an action it must include parameters:
```
{ 
  ...
  method: '...', // eg. POST, GET, DELETE
  url: 'http://localhost:3000' // api address
  ...
}
```
For more/other methods please modify cases in the api.js switch statement.

#### Optional
Action callbacks onSuccess and onErrors are optional if you have anything to do after the response is finished 
(eg. redirect user to other page, print something, write to localStorage, etc.).
```
{
  ...
  onSuccess: (response) => {
           // do something 
         },
  onError: (response) => {
           // do something else
         }
  ...
}
```

### Reducer
After the api.js has finished, new action is dispatched with updated payload and has to be handled by redux reducers in regular way. 
```
switch (action.type){
  case 'AUTH_USER':
    if (actions.payload.error){
      return {...state, error: action.payload.error}
    }
    return {...state, data: action.payload, error: ''} // any state part you want to update with response data
  ...
}
```





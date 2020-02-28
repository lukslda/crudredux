// "createStroe" crea el store, "applyMiddleware" es un complemento para poder utilizar "thunk", compose
// "redux-thunk" te permite utilizar funciones asincronas

// IMPORTANTE : siempre que creas un store se requiere un reducer. 
// cada uno tendra su state ej: productosReducer, usuarioReducer, clienteReducer pero al final todos estaran en uno solo que es el index.js
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers'; //busca automaticamente un archivo llamado index.js


const store = createStore(
    reducer,
    compose( applyMiddleware(thunk),

        typeof window === 'object' &&
            typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ?
                window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
);

export default store;
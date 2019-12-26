import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createLogger } from 'redux-logger';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const persistConfig = {
  timeout: 1000, // you can define your time. But is required.
  key: 'root',
  storage,
  whitelist: ['login', 'user'],
};

const persistEnhancer = () => createStore => (reducer, initialState, enhancer) => {
  const store = createStore(persistReducer(persistConfig, reducer), initialState, enhancer);
  const persist = persistStore(store, null);
  return {
    persist,
    ...store,
  };
};

export const dva =
  process.env.APP_TYPE === 'build'
    ? {
        config: {
          extraEnhancers: [persistEnhancer()],
        },
      }
    : {
        config: {
          extraEnhancers: [persistEnhancer()],
        },
        plugins: [
          {
            onAction: createLogger({
              level: 'info',
              collapsed: true,
            }),
          },
        ],
      };

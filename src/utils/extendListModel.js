export const extendServerList = ({
  namespace, 
  getListMethod = () => {}, 
  createMethod = () => {},
  deleteMethod = () => {},
  modifyMethod = () => {},
}) => {
  return {
    namespace,
    state: {
      list: [],
      sort: 'id',
      sortDirection: 'asc', // ['desc', 'asc']
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0
      }
    },
    reducers: {
      save(state, {payload}) {
        return { ...state, ...payload };
      },
      updateRow(state, {payload}) {
        // console.log(payload)
        const newList = [...state.list]
        const index = _.findIndex(newList, ['id', payload.id])
        if (index !== -1) {
          newList[index] = {...newList[index], ...payload}
          return {
            ...state,
            list: newList,
          }
        } else {
          return state
        }
      },
      remove: (state, {payload}) => {
        const newList = [...state.list]
        const index = _.findIndex(newList, ['id', payload.id])
        if (index !== -1) {
          newList.splice(index, 1)
          return {
            ...state,
            list: newList,
            pagination: {
              ...state.pagination,
              total: state.pagination.total - 1
            }
          }
        } else {
          return state
        }
      },
    },
    effects: {
      *fetch ({ payload }, { call, put, select }) {
        const defaultSort = yield select((state) => state[namespace].sort)
        const defaultSortDirection = yield select((state) => state[namespace].sortDirection)
        const sort = payload.sort || defaultSort
        const sortDirection = payload.sortDirection || defaultSortDirection
        try {
          const response = yield call(getListMethod, {...payload, sort, sortDirection})
          yield put({
            type: 'save',
            payload: {
              list: response.rows, 
              sort,
              sortDirection,
              pagination: {
                total: response.count, 
                pageSize: payload.pageSize, 
                current: payload.page
              }
            },
          });
        } catch (err) {
          console.log(err)
        }
      },
      *createItem ({ payload }, { call, put, select }) {
        try {
          const response = yield call(createMethod, payload.data)
          const list = yield select((state) => state[namespace].list)
          const pagination = yield select((state) => state[namespace].pagination)
          yield put({
            type: 'save',
            payload: {
              list: [response, ...list], 
              pagination: {
                ...pagination,
                total: pagination.count + 1, 
                current: 1
              }
            },
          });
        } catch (err) {
          console.log(err)
        }
      },
      *deleteItem ({ payload }, { call, put }) {
        try {
          yield call(deleteMethod, payload.id)
          yield put({
            type: 'remove',
            payload
          });
        } catch (err) {
          console.log(err)
        }
      },
      *modifyItem ({ payload }, { call, put }) {
        try {
          const response = yield call(modifyMethod, payload.id, payload.data)
          const data = response || {id: payload.id, ...payload.data}
          yield put({
            type: 'updateRow',
            payload: data
          });
        } catch (err) {
          console.log(err)
        }
      },
    },
  }
}

import {combineReducers} from 'redux'

import {
  ADD_TRANSACTION
, DELETE_TRANSACTION
, GET_TRANSACTION_GRID_FIELDS
, REQUEST_SUM
} from 'actions'

import {
  defaultTransactions
, defaultTransactionGridFields
, defaultSummary
} from './defaults'

function addTransaction(state, action) {
  const {description, value} = action.transaction
  const newState = [...state, {
    id : state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1
  , description
  , value
  }]
  return newState
}

function transactions(state = defaultTransactions, action) {
  let newState
  switch (action.type) {
    case ADD_TRANSACTION:
      return addTransaction(state, action)
    case DELETE_TRANSACTION:
      newState = state.filter(todo => todo.id !== action.id)
      return newState
    default:
      return state
  }
}

function transactionsGrid(state = defaultTransactionGridFields, action) {
  switch (action.type) {
    case GET_TRANSACTION_GRID_FIELDS:
      return state
    default:
      return state
  }
}

function summary(state = defaultSummary, action) {
  let sum
  switch (action.type) {
    case REQUEST_SUM:
      sum = action.data.reduce((prev, current) => (
        { value: prev.value + current.value }
      ))

      sum = { value: Math.round(sum.value * 100) / 100 }

      // Return ES2015 friendly
      // or stage-0 {...state, ...sum}
      return Object.assign({}, state, sum)
    default:
      return state
  }
}

export default combineReducers({
  transactionsGrid
, transactions
, summary
})


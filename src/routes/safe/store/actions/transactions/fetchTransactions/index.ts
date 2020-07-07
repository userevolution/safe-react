import { batch } from 'react-redux'

import { addIncomingTransactions } from '../../addIncomingTransactions'

import { loadIncomingTransactions } from './loadIncomingTransactions'
import { loadOutgoingTransactions } from './loadOutgoingTransactions'

import { addOrUpdateCancellationTransactions } from 'src/routes/safe/store/actions/transactions/addOrUpdateCancellationTransactions'
import { addOrUpdateTransactions } from 'src/routes/safe/store/actions/transactions/addOrUpdateTransactions'
import { Dispatch } from 'redux'
import { loadAllTransactions } from './loadAllTransactions'
import { addNewTransactions } from '../../addNewTransactions'

const noFunc = () => {}

export default (safeAddress: string) => async (dispatch: Dispatch): Promise<void> => {
  const transactions = await loadOutgoingTransactions(safeAddress)

  if (transactions) {
    const { cancel, outgoing } = transactions
    const updateCancellationTxs = cancel.size
      ? addOrUpdateCancellationTransactions({ safeAddress, transactions: cancel })
      : noFunc
    const updateOutgoingTxs = outgoing.size ? addOrUpdateTransactions({ safeAddress, transactions: outgoing }) : noFunc

    batch(() => {
      dispatch(updateCancellationTxs)
      dispatch(updateOutgoingTxs)
    })
  }

  const incomingTransactions = await loadIncomingTransactions(safeAddress)

  if (incomingTransactions.get(safeAddress).size) {
    dispatch(addIncomingTransactions(incomingTransactions))
  }
  const allTransactions = await loadAllTransactions(safeAddress)

  if (allTransactions.get(safeAddress).size) {
    dispatch(addNewTransactions(allTransactions))
  }
}

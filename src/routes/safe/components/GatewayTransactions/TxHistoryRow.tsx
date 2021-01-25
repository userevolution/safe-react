import { AccordionDetails, AccordionSummary } from '@gnosis.pm/safe-react-components'
import React, { ReactElement } from 'react'

import { isCreationTxInfo, Transaction } from 'src/logic/safe/store/models/types/gateway.d'
import { NoPaddingAccordion } from './styled'
import { TxHistoryCollapsed } from './TxHistoryCollapsed'
import { TxDetails } from './TxDetails'
import { TxInfoCreation } from './TxInfoCreation'

export const TxHistoryRow = ({ transaction }: { transaction: Transaction }): ReactElement => (
  <NoPaddingAccordion
    TransitionProps={{
      mountOnEnter: false,
      unmountOnExit: true,
      appear: true,
    }}
  >
    <AccordionSummary>
      <TxHistoryCollapsed transaction={transaction} />
    </AccordionSummary>
    <AccordionDetails>
      {isCreationTxInfo(transaction.txInfo) ? (
        <TxInfoCreation transaction={transaction} />
      ) : (
        <TxDetails transaction={transaction} txLocation="history" />
      )}
    </AccordionDetails>
  </NoPaddingAccordion>
)
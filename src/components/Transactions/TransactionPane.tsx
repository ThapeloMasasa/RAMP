import { useState } from "react"
import { InputCheckbox } from "../InputCheckbox"
import { TransactionPaneComponent } from "./types"



export const TransactionPane: TransactionPaneComponent = ({
  transaction,
  loading,
  setTransactionApproval: consumerSetTransactionApproval,
  onCheckChange
}) => {
  const [approved, setApproved] = useState(transaction.approved)
  
  const handleCheckboxChange = async (newValue: boolean) => {
    setApproved(newValue);
    await consumerSetTransactionApproval({
      transactionId: transaction.id,
      newValue,
    });
   
    
    onCheckChange(newValue, transaction.id); // Call the function passed down as a prop
   
  };
  

  return (
    <div className="RampPane">
      <div className="RampPane--content">
        <p className="RampText">{transaction.merchant} </p>
        <b>{moneyFormatter.format(transaction.amount)}</b>
        <p className="RampText--hushed RampText--s">
          {transaction.employee.firstName} {transaction.employee.lastName} - {transaction.date}
        </p>
      </div>
      <InputCheckbox
        id={transaction.id}
        checked={approved}
        disabled={loading}
        onChange={handleCheckboxChange}
      />

      
    </div>
  )
}
const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})
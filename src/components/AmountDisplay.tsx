import { formatAmount } from "../helper/formatAmount"

type AmountDisplayProps ={
    label?:string
    amount: number
}
//como usaremos este componente en el listado de gastos tambien y no tiene label ponemos esa prop como opcional agregando el ?
export const AmountDisplay = ({label, amount}: AmountDisplayProps) => {
  return (
    <p className="text-2xl text-blue-600 font-bold">
        {label && `${label}: `}
        <span className="font-black text-black">{formatAmount(amount)}</span>
    </p>
  )
}

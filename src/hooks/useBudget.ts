import { useContext } from "react"
import { BudgetContext } from "../context/BudgetContext"

export const useBudget = () => {
    const context = useContext(BudgetContext)
    if(!context){
        throw new Error('useBudget debe usarse mediante BudgetProvider ')
    }
  return  context
  
}

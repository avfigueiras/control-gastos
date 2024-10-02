/* Usando Context manejas el estado global de la app, le pasas el state sin tener que instanciar en cada elemento. Necesitas
un proveedor para acceder al state, este provider siempre es un arrow function y siempre retorna algo, en este ejemplo como estaos con
un reducer instanciamos el reducer dentro del provider y retornamos el state y el dispatch.
Necesitamos crear el context, que es el que nos permite manejar el estado global y provider tiene la informacion. tenemos que crear un type
que permite conectar el provider y el context.
*/

import { createContext, Dispatch, ReactNode, useMemo, useReducer } from "react"
import { BudgetActions, budgetReducer, BudgetState, initialState } from "../reducers/budget-reducer"
import { Expense } from "../types/types"

type BudgetContextProps = {
    dispatch: Dispatch<BudgetActions>
    state: BudgetState
    totalExpenses: number
    remainingBudget:number
}
//Creamos este tipo para el children ya que TS reclama el tipo, y como los hijos pueden ser de varios se pone de tipo ReactNode
type BudgetProviderProps = {
    children:ReactNode
}

//le pasamos de momento {} as BudgetContextProps para quitar el error del argumento que espera el context otra opcion es pasarle null!
export const BudgetContext = createContext<BudgetContextProps>({} as BudgetContextProps)

/* el provider para conectarse va a retornar  el context como si fuese un componente, y recibe como props children
que es lo que va a permitir que lo usen en la app, en este caso children es nuestra app y sus componentes
*/
export const BudgetProvider = ({children}: BudgetProviderProps) => {
    const [state, dispatch] = useReducer(budgetReducer, initialState)

    const totalExpenses = useMemo(() => state.expenses.reduce((total:number, current: Expense) => current.amount > 0 ? total + current.amount : total, 0)
    ,[state.expenses])

 const  remainingBudget = state.budget - totalExpenses
    
    return (
        /*vamos a retornar el state y el dispatch para poder acceder al instanciar a esas acciones y al estado, pero dentro del BudgetContext.Provider como value, y
        children dentro para que todos puedan acceder a esos valores */
   <BudgetContext.Provider value={{state, dispatch, totalExpenses, remainingBudget}}>
        {children}
   </BudgetContext.Provider>
    )
}
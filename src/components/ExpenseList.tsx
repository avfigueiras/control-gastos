import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import { ExpenseDetail } from "./ExpenseDetail"

export const ExpenseList = () => {
    const { state } = useBudget()

    const filterCategory = state.currentFilterCategory ? state.expenses.filter(expense => expense.category === state.currentFilterCategory) : state.expenses

    const isEmptyExpenses = useMemo(() => filterCategory.length === 0, [filterCategory])
    
    return (
        <div className="mt-10 bg-white p-10 shadow-lg rounded-lg">
            {isEmptyExpenses ?
                <p className="text-gray-600 text-2xl font-bold"> No Existen gastos</p> : (
                    <>
                        <p className="text-gray-600 text-2xl my-5 font-bold">Listado de Gastos</p>
                        {
                            filterCategory.map(expense => (
                                <ExpenseDetail
                                    key={expense.id}
                                    expense={expense}
                                />
                            ))
                        }
                    </>

                )}
        </div>
    )
}

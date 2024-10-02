import { useEffect, useMemo } from "react"
import { BudgetForm } from "./components/BudgetForm"
import { useBudget } from "./hooks/useBudget"
import { BudgetTracker } from "./components/BudgetTracker"
import ExpenseModal from "./components/ExpenseModal"
import { ExpenseList } from "./components/ExpenseList"
import { FilterByCategory } from "./components/FilterByCategory"

function App() {
  //como usamos un hook ,el state lo puedes manejar directo en el formulario sin tener que pasarlo como props al componente
  const { state } = useBudget()
  
  const isValid = useMemo(() => state.budget > 0, [state.budget])

  //almacenando en el localStorage
  useEffect(()=>{
    localStorage.setItem('budget', state.budget.toString())
    localStorage.setItem('expenses', JSON.stringify(state.expenses))
  }, [state])


  return (
    <>
      <header className="bg-blue-600 py-8 max-h-72">
        <h1 className="text-4xl text-white text-center uppercase font-black"
        >
          Planificador de gastos
        </h1>
      </header>
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        {isValid ? <BudgetTracker /> : <BudgetForm />}
      </div>
      {isValid && (
        <main className="mx-auto py-10 max-w-3xl">
          <FilterByCategory />
          <ExpenseList />
          <ExpenseModal />
        </main>
      )}
    </>
  )
}

export default App

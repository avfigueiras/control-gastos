import { ChangeEvent, FormEvent, useMemo, useState } from "react"
import { useBudget } from "../hooks/useBudget"


/*para usar el context debemos usar el hooh use context el que recibe nuestro context creado const context = useContext(BudgetContext)
para evitar esta forma mejor creamos un custom hook que haga exactamente este proceso y asi usamos el hooh para conectar de esta manera
*/
export const BudgetForm = () => {
    const [budget, setBudget] = useState(0)
    //usamos el context
    const { dispatch } = useBudget()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBudget(e.target.valueAsNumber)
    }

    const isValid = useMemo(() => {
        return isNaN(budget) || budget <= 0
    }, [budget])

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    //aca utilizamos el dispatch desde el context
       dispatch({type:'add-budget', payload:{budget}})
    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <div className=" space-y-5 flex flex-col">
                <label htmlFor="budget" className="text-4xl font-bold text-blue-600 text-center">
                    Definir Presupuesto
                </label>
                <input
                    type="number"
                    className="w-full bg-white border border-gray-200 p-2"
                    placeholder="Define tu presupuesto"
                    name="budget"
                    value={budget}
                    onChange={e => handleChange(e)}
                />
            </div>
            <input
                type="submit"
                value="Definir Presupuesto"
                className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white uppercase w-full p-2 font-black disabled:opacity-40"
                disabled={isValid}
                onClick={() => dispatch({ type: 'add-budget', payload: { budget } })}
            />
        </form>

    )
}

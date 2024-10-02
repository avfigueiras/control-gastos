import {CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { useBudget } from "../hooks/useBudget"
import { AmountDisplay } from "./AmountDisplay"

export const BudgetTracker = () => {
 const { state, totalExpenses, remainingBudget, dispatch } = useBudget()

//porcentaje dinamico de la barra circular progresiva, multiplico por 100 y luego le digo que puede tener hasta 2 decimales con toFixed(2)
 const percentaje = +((totalExpenses / state.budget) * 100).toFixed(2)

    return (
        <div className="grid drid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex justify-center">
               <CircularProgressbar 
               value={percentaje}
               text={`${percentaje}% Gastado`}
               styles={buildStyles({
                pathColor:percentaje === 100 ? '#dc2626' : '#3b82f6',
                trailColor:'#f5f5f5',
                textColor:percentaje === 100 ? '#dc2626' : '#3b82f6',
                textSize:8
               })}
               />
            </div>
            <div className="flex flex-col justify-center items-center gap-8">
                <button
                    type="button"
                    className="uppercase bg-pink-600 w-full p-2 text-white font-bold rounded-lg"
                    onClick={() => dispatch({type:'reset-app'})}
                >
                    Reset App
                </button>
                <AmountDisplay 
                label="Presupuesto"
                amount={state.budget}
                />
                 <AmountDisplay 
                label="Gastado"
                amount={totalExpenses}
                />
                 <AmountDisplay 
                label="Disponible"
                amount={remainingBudget}
                />
            </div>
        </div>
    )
}

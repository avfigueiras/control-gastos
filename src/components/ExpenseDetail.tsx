import { useMemo } from "react"
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import { categories } from "../data/categories"
import { formatDate } from "../helper/formatAmount"
import { Expense } from "../types/types"
import { AmountDisplay } from "./AmountDisplay"
import { useBudget } from "../hooks/useBudget";

/*Se usa la libreria react-swipeable-list, donde LeadingActions son las acciones que vienen de un lado y TrailingActions
son las acciones que vienen del otro lado. Se importan igual los css propios  de la libreria . Todo el div del return 
tiene que estar rodeado por elcomponente  SwipeableList,l componente SwipeableListItem debe declararse despues del List y 
tambien rodea todo el contenido, este necesita unas props.Luego se le especifican las acciones y la configuracion  */
type ExpenseDetailProps = {
    expense: Expense
}
export const ExpenseDetail = ({ expense }: ExpenseDetailProps) => {
    const { dispatch } = useBudget()
    const categoryInfo = useMemo(() => categories.filter(category => category.id === expense.category)[0], [expense]) //le ponemos en la [0] para acceder al objeto

    //creo una funcion que va a englobar el componente Leading para especificar que hara, como es un componente ponemos () en ves de {}
    const leadingActions = () => (
        //tenemos el componente y las acciones que se van a disparar al arrastrar de izq a derecha
        <LeadingActions>
            <SwipeAction onClick={() => dispatch({type:'get-expense-by-id', payload:{id:expense.id}})}>
                Actualizar
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = () => (
        /*tenemos el componente y las acciones que se van a disparar al arrastrar de izq a derecha,la prop destructive={true}
        hace que al deslizar en esa direccion se elimine el componente pero no se eliminara del state si no se dispara la 
        accion*/
        <TrailingActions>
            <SwipeAction 
            onClick={() => dispatch({type:'delete-expense', payload:{id:expense.id}}) }
            destructive={true}
            >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )

    return (
        <SwipeableList>
            <SwipeableListItem
                maxSwipe={30} //son los pixeles que quieres que se recorran para disparar las acciones
                leadingActions={leadingActions()} //  acciones del lado izquierdo al derecho
                trailingActions={trailingActions()} //acciones del lado derecho al izq
            >
                <div className="bg-white shadow-lg p-5 w-full border-b border-gray-200 flex gap-5 items-center">
                    <div>
                        <img src={`/icono_${categoryInfo.icon}.svg`} alt="icono del gasto" className="w-20" />
                    </div>
                    <div className="flex-1 space-y-2">
                        <p className="font-bold text-sm uppercase text-slate-500">{categoryInfo.name}</p>
                        <p>{expense.expenseName}</p>
                        {/*  al poner despues de date el signo ! eestamos diciendo que ese valor si existe */}
                        <p className="text-slate-600 text-sm">{formatDate(expense.date!.toString())}</p>
                    </div>
                    <AmountDisplay amount={expense.amount} />
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}

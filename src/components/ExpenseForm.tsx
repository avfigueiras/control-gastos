import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { categories } from "../data/categories"
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import { DraftExpense, Value } from "../types/types";
import { ErrorMessage } from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

const initialState = {
    amount: 0,
    expenseName: '',
    category: '',
    date: new Date()
}

//para que se vea bien el calendario debemos instalar tambien react-calendar e importar los estilos de ambos 
export const ExpenseForm = () => {
    const [expense, setExpense] = useState<DraftExpense>(initialState);
    const [previewAmout, setPreviewAmout] = useState(0); //para mostrar el valor que queda disponible
    const [error, setError] = useState('')
    const { dispatch, state, remainingBudget } = useBudget()

    useEffect (() =>{
        //para editar y llenar el formulario con los datos correspondiente al gasto con el id
        if(state.editingId){
            const value = state.expenses.filter( item => item.id === state.editingId)[0]
            setExpense(value)
            setPreviewAmout(value.amount)
        }
    },[state.editingId])


    const handleChangeDate = (value: Value) => {
        setExpense({
            ...expense,
            date: value
        })
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        const isAmountField = ['amount'].includes(name)
        setExpense({
            ...expense,
            [name]: isAmountField ? +value : value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        //validamos usando Object.value que comvierte un objeto en array. En este caso buscamos si al menos uno esta vacio
        if (Object.values(expense).includes('')) {
            setError('Todos los campos son obligatorios')
            //ponemos return y asi evitamos se ejecuten las demas lineas si se cumple la condicion
            return
        }

        //validar que no me pase del monto
        if ( (expense.amount - previewAmout ) > remainingBudget) {
            setError('El gasto se pasa del presupuesto')
            return
        }

        //agregar o actualizar el gasto
        if(state.editingId){
            // en este caso como el gasto no tiene id tengo que recuperarlo y hacer una copia del expense para los demas valores
            dispatch({type:'edit-expense', payload:{expense: {id: state.editingId, ...expense}}})
        } else{
            dispatch({ type: 'add-expense', payload: { expense } })
        }
        
        //linpiando el formulario y seteando a cero el state del monto restante
        setExpense(initialState)
        setPreviewAmout(0)
    }

    return (
        <form action="" className="space-y-5" onSubmit={handleSubmit}>
            <legend className="uppercase text-2xl font-black text-center border-b-4 border-blue-500 py-2">
               {!state.editingId ? 'Nuevo Gasto' : 'Editar Gasto' }
            </legend>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <div className="flex flex-col gap-2">
                <label htmlFor="expenseName" className="text-xl">Nombre Gasto:</label>
                <input
                    type="text"
                    id="expenseName"
                    placeholder="Añade el nombre del gasto"
                    className="bg-slate-100 p-2"
                    name="expenseName"
                    value={expense.expenseName}
                    onChange={handleChange}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="amount" className="text-xl">Cantidad gastada:</label>
                <input
                    type="text"
                    id="amount"
                    placeholder="Añade la cantidad del gasto: ej 300"
                    className="bg-slate-100 p-2"
                    name="amount"
                    value={expense.amount}
                    onChange={handleChange}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="category" className="text-xl">Categoría:</label>
                <select
                    id="category"
                    className="bg-slate-100 p-2"
                    name="category"
                    value={expense.category}
                    onChange={handleChange}
                >
                    <option value="">-- Seleccione --</option>
                    {categories.map(item => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="date" className="text-xl">Fecha Gasto:</label>
                <DatePicker
                    className="bg-slate-100 p-2 border-0"
                    value={expense.date}
                    onChange={handleChangeDate}
                />
            </div>
            <input
                type="submit"
                className="bg-blue-600 text-white w-full uppercase cursor-pointer p-2 font-bold rounded-lg"
                value={state.editingId ? 'Guardar Cambios' : 'Registrar Gasto'}
            />
        </form>
    )
}

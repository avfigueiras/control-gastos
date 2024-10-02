import { Category, DraftExpense, Expense } from "../types/types"
import { v4 as uuidv4 } from 'uuid';

export type BudgetActions =
    { type: 'add-budget', payload: { budget: number } } |
    { type: 'show-modal' } |
    { type: 'close-modal' } |
    { type: 'add-expense', payload: { expense: DraftExpense } } |
    { type: 'delete-expense', payload: { id: Expense ['id']} } |
    { type: 'get-expense-by-id', payload: { id: Expense ['id']} } |
    { type: 'edit-expense', payload: { expense: Expense} } |
    { type: 'reset-app' } |
    { type: 'add-filter-category', payload: { id: Category ['id']} } 

export type BudgetState = {
    budget: number,
    modal: boolean,
    expenses: Expense[],
    editingId: Expense ['id'],
    currentFilterCategory: Category ['id']
}

//guardando el presupuesto en el localstorage
const initialBudget = (): number=> {
    const localstorageBudget = localStorage.getItem('budget')
    return localstorageBudget ? +localstorageBudget : 0
}

//guardando los gastos en el localstorage
const initialExpenses = (): Expense[] => {
    const localstorageExpense = localStorage.getItem('expenses')
    return localstorageExpense ? JSON.parse(localstorageExpense) : []
}

export const initialState = {
    budget: initialBudget(),
    modal: false,
    expenses: initialExpenses(),
    editingId:'',
    currentFilterCategory:''
}

//toma el gasto sin el id(el tipo es  DraftExpense) y retorna uno que tiene el id (el tipo Expense)
const createExpense = (draft: DraftExpense): Expense => {
    return {
        ...draft,
        id: uuidv4()
    }
}

export const budgetReducer = (
    state: BudgetState = initialState,
    action: BudgetActions
) => {

    if (action.type === 'add-budget') {
        return {
            ...state,
            budget: action.payload.budget
        }
    }

    if (action.type === 'show-modal') {
        return {
            ...state,
            modal: true
        }
    }

    if (action.type === 'close-modal') {
        return {
            ...state,
            modal: false,
            editingId:''
        }
    }

    //add gasto
    if (action.type === 'add-expense') {
        const newExpense = createExpense(action.payload.expense)
        return {
            ...state,
            expenses: [...state.expenses, newExpense], //copia lo que tiene el state de gastos y agrega lo que tiene en el payload
            modal: false //cerramos modal
        }
    }

    //delte gasto
    if (action.type === 'delete-expense') {
        const result = state.expenses.filter((element) => element.id !== action.payload.id)
        return {
            ...state,
            expenses: result
        }
    }

    if (action.type === 'get-expense-by-id') {
        return {
            ...state,
            editingId: action.payload.id,
            modal:true
        }
    }

    if (action.type === 'edit-expense') {
        //si coincide el id guardo el objeto que tiene el payload sino devuelvo el gasto sin modificar
        const result = state.expenses.map(expense => expense.id === action.payload.expense.id ? action.payload.expense : expense)
        return {
            ...state,
            expenses: result,
            modal:false,
            editingId:''
        }
    }

    if(action.type === 'reset-app'){
        //no vamos a necesitar lo del local storage ni todos los elementos del state por eso copiamos el state y no ponemos ni modal ni id
        return {
            ...state,
            budget: 0,
            expenses: []
        }
    }

    if (action.type === 'add-filter-category') {
        return {
            ...state,
            currentFilterCategory: action.payload.id,
        }
    }

    return state
}


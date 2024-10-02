import { ReactNode } from "react"

type ErrorMessageProps = {
    children: ReactNode  //reactNode te permite renderizar texto y otros componentes dentro de este
}

export const ErrorMessage = ({children}: ErrorMessageProps) => {
  return (
    <p className=" bg-red-600 p-2 text-white text-sm font-bold text-center">
     {children}
    </p>
  )
}

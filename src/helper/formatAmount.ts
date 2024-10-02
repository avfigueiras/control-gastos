//formatear montos
export const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US',{
        style: 'currency', currency:'USD'
    }).format(amount)
   }

//formatear fecha sin usar libreria
export const formatDate = (date: string): string => {
    //para trabajar con la fecha hay que llevarla a fecha
    const newDate = new Date(date)
    //creamos un objeto y le damos los formatos que queremos
    const dateObj: Intl.DateTimeFormatOptions = {
        weekday: 'long', // esto es que queremos el nombre completo en texto
        year:'numeric',  //sera un numero
        month: 'long',   // mes en texto
        day: 'numeric' 
    }
    return new Intl.DateTimeFormat('es-ES',dateObj).format(newDate)
   }

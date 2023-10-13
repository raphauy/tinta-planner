
export default function StateFlow() {
  return (
    <section className="flex w-full px-1 mb-1">


        <div className="w-8 bg-blue-500" />

        <div className="w-full">
            <div className="relative flex items-center justify-center h-12 p-4 text-white bg-blue-500">
                <div className="text-xl font-bold">Calificado</div>
                <svg 
                    className="absolute top-0 bottom-0 right-0 h-full text-blue-500 fill-current bg-tinta-natural" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 6 20">
                        <polygon points="0,0 3,10 0,20"/>
                </svg>
            </div>    
        </div>          

        <div className="w-full">
        <div className="relative flex items-center justify-center h-12 p-4 text-white bg-blue-500">
            <svg 
            className="absolute top-0 bottom-0 left-0 h-full bg-blue-500 fill-current text-tinta-natural" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 6 20">
                <polygon points="0,0 3,10 0,20"/>
            </svg>
            <div className="text-xl font-bold">Propuesta</div>
            <svg 
                className="absolute top-0 bottom-0 right-0 h-full text-blue-500 fill-current bg-tinta-natural" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 6 20">
                    <polygon points="0,0 3,10 0,20"/>
            </svg>
        </div>
        </div>          

        <div className="w-full">
        <div className="relative flex items-center justify-center h-12 p-4 text-white bg-blue-500">
            <svg 
            className="absolute top-0 bottom-0 left-0 h-full bg-blue-500 fill-current text-tinta-natural" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 6 20">
                <polygon points="0,0 3,10 0,20"/>
            </svg>
            <div className="text-xl font-bold text-center">Negociación</div>
            <svg 
                className="absolute top-0 bottom-0 right-0 h-full text-blue-500 fill-current bg-tinta-natural" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 6 20">
                    <polygon points="0,0 3,10 0,20"/>
            </svg>
        </div>
        </div>          

        <div className="w-full">
            <div className="flex w-full">
                <div className="relative flex items-center justify-center w-full h-12 p-4 text-white bg-blue-500">
                    <svg 
                        className="absolute top-0 bottom-0 left-0 h-full bg-blue-500 fill-current text-tinta-natural" 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 6 20">
                        <polygon points="0,0 3,10 0,20"/>
                    </svg>
                    <div className="ml-4 text-xl font-bold">Ganado</div>
                    <svg 
                        className="absolute top-0 bottom-0 right-0 h-full text-blue-500 fill-current bg-tinta-natural" 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 6 20">
                            <polygon points="0,0 3,10 0,20"/>
                    </svg>
                </div>
                <div className="w-6 h-6 p-4 mt-2 bg-green-500 rounded-full"></div>
            </div>

        </div>


    </section>

  )
}

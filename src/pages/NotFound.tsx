export const NotFoundPage = () => {
    return(
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-red-600">404</h1>
            <p className="mt-4 text-lg text-gray-700">Oops! la página que buscas no existe.</p>
            <a className="mt-6 px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600" href="/">Volver a la página principal</a>
        </div>
    )
}
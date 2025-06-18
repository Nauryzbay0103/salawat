import { Basket, Home } from '@/pages'
import { BrowserRouter, Route, Routes } from 'react-router'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/basket' element={<Basket />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App

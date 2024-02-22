import React from 'react'
import './App.css'
import Search from './page/Search'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Read from './page/Read'
import NotFound from './page/NotFoundPage'

export default function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Search />} />
                    <Route path="/read/:id" element={<Read />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </div>
    )
}

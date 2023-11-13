import React, { Component, lazy, Suspense } from "react";
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner'
import Login from "./views/login";
import Books from "./views/bookslist";
import BooksList from "./views/bookslist";

const Dashboard = lazy(() => import("./views/dashboard"));

function App() {
    return (
        <Router>
            <Suspense fallback={
                <div className="loading-screen-overlay" id="loading-overlay">
                    <div className="loading-screen">
                        <ColorRing
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="blocks-loading"
                            wrapperStyle={{}}
                            wrapperClass="blocks-wrapper"
                            colors={['#404e67', '#01a9ac', '#64c5b1', '#1ABB9C']}
                        />
                        <span>Data wordt geladen...</span>
                    </div>
                </div>}>
                <Routes>
                    <Route exact path="/" element={localStorage.getItem('token') ? <Dashboard /> : <Login />} />
                    <Route exact path="/books" element={<BooksList />} />
                    {/* <Route exact path="/login" element={<Login />} /> */}
                </Routes>
            </Suspense>
        </Router>
    )
}

export default App;
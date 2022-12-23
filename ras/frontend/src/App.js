import React, { Component, lazy, Suspense } from "react";
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner'

const Dashboard = lazy(() => import("./views/dashboard"));
const Booklist = lazy(() => import("./views/booklist"));

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
                            colors={['#8066ee', '#58c8d6', '#fe4c62', '#49b8fd', '#ffbe0e']}
                        />
                        <span>Data wordt geladen...</span>
                    </div>
                </div>}>
                <Routes>
                    <Route exact path="/" element={<Dashboard />} />
                    <Route exact path="/booklist" element={<Booklist />} />
                </Routes>
            </Suspense>
        </Router>
    )
}

export default App;
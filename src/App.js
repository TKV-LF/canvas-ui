import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';

function App() {
    return (
        <Router>
            <Routes>
                {publicRoutes.map((route, index) => {
                    let Layout = route.component;
                    return <Route key={index} path={route.path} element={<Layout />} />;
                })}
            </Routes>
        </Router>
    );
}

export default App;

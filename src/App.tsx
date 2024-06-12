import './App.css'
import { Link, Route, Routes } from "react-router-dom";
import Home from "./page/home/homepage";
import DrawTriangle from "./page/draw_triangle/draw_triangle_ex";
import DrawPointCube from "./page/draw_point_cube/draw_point_cube";

function App() {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/draw_triangle">draw triangle</Link>
                    </li>
                    <li>
                        <Link to="/draw_point_cube">draw point cube</Link>
                    </li>
                </ul>
            </nav>
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/draw_triangle" element={<DrawTriangle />} />
                    <Route path="/draw_point_cube" element={<DrawPointCube />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;

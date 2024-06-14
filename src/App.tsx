import './App.css'
import {Link, Route, Routes} from "react-router-dom";
import Home from "./page/home/homepage";
import DrawTriangle from "./page/draw_triangle/draw_triangle_ex";
import DrawPointCube from "./page/draw_point_cube/draw_point_cube";
import LensBlurEffect from "./page/lens_blur_effect/lens_blur_effect.tsx";

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
                    <li>
                        <Link to="/lens_blur_effect">lens blur effect</Link>
                    </li>
                </ul>
            </nav>
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/draw_triangle" element={<DrawTriangle/>}/>
                    <Route path="/draw_point_cube" element={<DrawPointCube/>}/>
                    <Route path="/lens_blur_effect" element={<LensBlurEffect/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;

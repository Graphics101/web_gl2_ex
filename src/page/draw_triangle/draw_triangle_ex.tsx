import {useEffect, useRef} from "react";
import gl_setup from "../../web_gl_setup_utils/gl_setup.ts";
import resizeCanvasToDisplaySize from "../../web_gl_setup_utils/resize_cavas_to_display_size.ts";
import vertexShaderSource from "./draw_triangle_vertex_shader.vert?raw";
import fragmentShaderSource from "./draw_triangle_fragment_shader.frag?raw";
import create_shader from "../../web_gl_setup_utils/create_shader.ts";
import create_gl_program from "../../web_gl_setup_utils/create_gl_program.ts";
import draw_grid from "../../web_gl_setup_utils/draw_grid/draw_grid.ts";

function DrawTriangle() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }
        window.addEventListener('resize', () => drawingLogic(canvas));
        drawingLogic(canvas);

        return () => {
            window.removeEventListener('resize', () => drawingLogic(canvas));
        };
    }, []);

    return (
        <div className="canvas-container">
            <h2>Draw Triangle Example</h2>
            <canvas ref={canvasRef} id="canvas"></canvas>
        </div>
    );
}

const drawingLogic: (canvas: HTMLCanvasElement) => void = async (canvas: HTMLCanvasElement) => {
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - 60; // 네비게이션 바 높이만큼 뺀다.
    };

    resizeCanvas(); // 초기 크기 설정

    const gl = await gl_setup(canvas);
    resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement);
    draw_grid(gl);


    const vertexShader = create_shader(gl, gl.VERTEX_SHADER, vertexShaderSource)!;
    const fragmentShader = create_shader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)!;

    const program = create_gl_program(gl, vertexShader, fragmentShader)!;

    const positionAttributeLocation = gl.getAttribLocation(program, "a_Position");
    const positionBuffer = gl.createBuffer()!;
    const positions = [
        0.0, 0.5, 0.0,
        -0.5, -0.5, 0.0,
        0.5, -0.5, 0.0
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    const colorAttributeLocation = gl.getAttribLocation(program, "a_Color");
    const colorBuffer = gl.createBuffer()!;
    const colors = [
        1.0, 1.0, 1.0, 1.0,
        1.0, 0.0, 0.0, 1.0,
        0.0, 1.0, 0.0, 1.0
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    gl.vertexAttribPointer(colorAttributeLocation, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorAttributeLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.useProgram(program);
    gl.drawArrays(gl.TRIANGLES, 0, 3);


    return () => {
        window.removeEventListener('resize', resizeCanvas);
    };
}

export default DrawTriangle;

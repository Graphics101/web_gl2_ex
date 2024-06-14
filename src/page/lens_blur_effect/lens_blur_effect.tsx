import {useEffect, useRef} from "react";
import gl_setup from "../../web_gl_setup_utils/gl_setup.ts";
import resizeCanvasToDisplaySize from "../../web_gl_setup_utils/resize_cavas_to_display_size.ts";
import vertexShaderSource from "./lens_blur_effect_vertex_shader.vert?raw";
import fragmentShaderSource from "./lens_blur_effect_fragment_shader.frag?raw";
import create_shader from "../../web_gl_setup_utils/create_shader.ts";
import create_gl_program from "../../web_gl_setup_utils/create_gl_program.ts";

let gl: WebGL2RenderingContext;
let program: WebGLProgram;

function LensBlurEffect() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }
        window.addEventListener('resize', () => drawingLogic(canvas));
        drawingLogic(canvas);

        canvas.addEventListener('mousemove', (e) => {
            gl.uniform2fv(gl.getUniformLocation(program, "u_mouse"), [e.offsetX, e.offsetY]);
        });

        return () => {
            window.removeEventListener('resize', () => drawingLogic(canvas));
            canvas.removeEventListener('mousemove', (e) => {
                console.log(e.offsetX, e.offsetY);
                gl.uniform2fv(gl.getUniformLocation(program, "u_mouse"), [e.offsetX, e.offsetY]);
            });
        };
    }, []);
    return (
        <div>
            <h1>Lens Blur Effect</h1>
            <canvas ref={canvasRef}></canvas>
        </div>
    );
}

const drawingLogic: (canvas: HTMLCanvasElement) => void = async (canvas: HTMLCanvasElement) => {
    const resizeCanvas = () => {
        const size = window.innerWidth > window.innerHeight - 160 ? window.innerHeight - 160 : window.innerWidth;
        canvas.width = size;
        canvas.height = size; // 네비게이션 바 높이만큼 뺀다.
    };

    resizeCanvas(); // 초기 크기 설정

    gl = await gl_setup(canvas);
    resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement);

    const vertexShader = create_shader(gl, gl.VERTEX_SHADER, vertexShaderSource)!;
    const fragmentShader = create_shader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)!;

    program = create_gl_program(gl, vertexShader, fragmentShader)!;

    const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [
        -1, -1,
        1, -1,
        -1, 1,
        -1, 1,
        1, -1,
        1, 1,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const texcoordAttributeLocation = gl.getAttribLocation(program, "a_texcoord");
    const texcoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
    const texcoords = new Float32Array([
        0, 0,
        1, 0,
        0, 1,
        0, 1,
        1, 0,
        1, 1,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, texcoords, gl.STATIC_DRAW);

    function render() {
        resizeCanvasToDisplaySize(canvas);
        // draw_grid(gl);

        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        gl.useProgram(program);

        gl.enableVertexAttribArray(positionAttributeLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        const size = 2;
        const type = gl.FLOAT;
        const normalize = false;
        const stride = 0;
        const offset = 0;
        gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);

        gl.enableVertexAttribArray(texcoordAttributeLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
        gl.vertexAttribPointer(texcoordAttributeLocation, size, type, normalize, stride, offset);

        gl.uniform2fv(gl.getUniformLocation(program, "u_resolution"), [canvas.clientWidth, canvas.clientHeight]);
        gl.uniform1f(gl.getUniformLocation(program, 'u_pixelRatio'), window.devicePixelRatio);

        gl.drawArrays(gl.TRIANGLES, 0, 6);

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}
export default LensBlurEffect;

import createShader from "../create_shader.ts";
import createGLProgram from "../create_gl_program.ts";
import gridVertexShader from "./draw_grid_vertex_shader.vert?raw";
import gridFragmentShader from "./draw_grid_frag_shader.frag?raw";

function drawGrid(gl: WebGL2RenderingContext) {
    const vertexShader: WebGLShader = createShader(gl, gl.VERTEX_SHADER, gridVertexShader)!;
    const fragmentShader: WebGLShader = createShader(gl, gl.FRAGMENT_SHADER, gridFragmentShader)!;
    const program: WebGLProgram = createGLProgram(gl, vertexShader, fragmentShader)!;

    const vertices = new Float32Array([
        -1, -1,
        1, -1,
        -1, 1,
        -1, 1,
        1, -1,
        1, 1,
    ]);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    gl.useProgram(program);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
}

export default drawGrid;

function createShader(gl: WebGLRenderingContext, type: GLenum, source: string): WebGLShader | undefined {
    const shader: WebGLShader | null = gl.createShader(type);
    if (shader === null) {
        console.log("Failed to create shader");
        throw new Error("Failed to create shader");
    }
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        return shader;
    }

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

export default createShader;

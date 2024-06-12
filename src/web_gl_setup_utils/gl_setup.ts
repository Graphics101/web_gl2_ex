async function glSetUp(canvas: HTMLCanvasElement): Promise<WebGL2RenderingContext> {
    const gl: WebGL2RenderingContext | null = canvas.getContext("webgl2");

    if (!gl) {
        throw new Error("Unable to initialize WebGL. Your browser or machine may not support it.");
    }

    return gl;
}

export default glSetUp;

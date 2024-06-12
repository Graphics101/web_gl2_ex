#version 300 es
precision mediump float;
out vec4 outColor;
void main() {
    // Get the screen coordinates
    ivec2 coord = ivec2(gl_FragCoord.xy);

    // Check if the current position is a multiple of 20
    if (coord.x % 20 == 0 || coord.y % 20 == 0) {
        outColor = vec4(0.5, 0.5, 0.5, 1.0); // Gray color for the grid lines
    } else {
        outColor = vec4(0.3, 0.3, 0.3, 1.0); // White color for the background
    }
}

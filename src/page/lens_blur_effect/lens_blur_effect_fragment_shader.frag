#version 300 es

precision highp float;

in vec2 v_texcoord;
uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_pixelRatio;
out vec4 fragColor;

float sdCircle(vec2 st, vec2 center) {
    return length(st - center) * 2.0;
}

float sdRoundRect(vec2 p, vec2 b, float r) {
    vec2 d = abs(p - 0.5) * 4.2 - b + vec2(r);
    return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - r;
}

float stroke(float x, float size, float w, float edge) {
    float d = smoothstep(size - edge, size + edge, x + w * 0.5) - smoothstep(size - edge, size + edge, x - w * 0.5);
    return clamp(d, 0.0, 1.0);
}

float fill(float x, float size, float edge) {
    return 1.0 - smoothstep(size - edge, size + edge, x);
}

void main() {
    vec2 st = v_texcoord;

    vec2 posMouse = u_mouse / u_resolution;
    posMouse = (posMouse - 0.5) * vec2(u_resolution.x / u_resolution.y, 1.0) + 0.5;


    float circleSize = 0.3;
    float circleEdge = 0.5;

    float sdfCircle = fill(sdCircle(st, posMouse), circleSize, circleEdge);

    float size = 0.8;
    float roundness = 0.25;
    float boarderSize = 0.05;

    float sdf = sdRoundRect(st, vec2(size), roundness);
    sdf = stroke(sdf, size, boarderSize, sdfCircle) * 4.0;

    vec3 color = vec3(sdf);
    fragColor = vec4(color.rgb, 1.0);
}

#version 300 es

in vec4 a_position;
in vec2 a_texcoord;
out vec2 v_texcoord;

void main() {
    vec4 pos = a_position;
    pos.y = -pos.y;

    gl_Position = pos;
    v_texcoord = a_texcoord;
}

#version 300 es

layout (location = 0) in vec4 a_Position;
layout (location = 1) in vec4 a_Color;
out vec4 vertexColor;

void main() {
    gl_Position = a_Position;
    vertexColor = a_Color;
}


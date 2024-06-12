#version 300 es

precision mediump float;

in vec4 vertexColor;
out vec4 FragColor;

void main() {
    // gl_FragColor는 프래그먼트 셰이더가 설정을 담당하는 특수 변수
    FragColor = vertexColor;
}

console.log("main.js loaded for the web page.");

// Global variables for configurations
var NumTimesToSubdivide = 5; // Number of times to subdivide the triangle
var positions = []; // Array to hold vertex positions

// Main function to initialize WebGL and set up the canvas
window.onload = function main() {
    console.log("Main function started execution.");
    
    // Loading the WebGL canvas
    const canvas = this.document.querySelector("#gl-canvas") ?? console.log("Canvas element not found.");
    const gl = canvas.getContext("webgl") ?? console.log("WebGL not enabled for browser.")
    if(!canvas || !gl) {
        console.log("Exiting main function due to inablility to render WebGL information.");
    }
    
    // Preparing the canvas for rendering
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    // Setting up the different triangle components
    var verticies = [
        vec2(-1, -1),
        vec2(0, 1),
        vec2(1, -1)
    ];

    // Start the recursive division of the triangle
    divideTriangle(verticies[0], verticies[1], verticies[2], NumTimesToSubdivide);

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // Load the data into the GPU

    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId );
    gl.bufferData(gl.ARRAY_BUFFER, flatten(positions), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer

    var positionLoc = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc);
};

// Referencing the equivalent function from https://www.interactivecomputergraphics.com/Code/02/gasket2.js
function triangle(a, b, c) {
    positions.push(a, b, c);
}

// Referencing the equivalent function from https://www.interactivecomputergraphics.com/Code/02/gasket2.js
function divideTriangle(a, b, c, count) {
    // Base case: if count is 0, draw the triangle
    if (count === 0) {
        triangle(a, b, c);
    } else {
        
        // Calculate midpoints of each side of the triangle
        var ab = mix(a, b, 0.5);
        var ac = mix(a, c, 0.5);
        var bc = mix(b, c, 0.5);
        --count;

        // Recursively subdivide the triangle into 3 smaller triangles
        divideTriangle(a, ab, ac, count);
        divideTriangle(c, ac, bc, count);
        divideTriangle(b, bc, ab, count);
    }
}
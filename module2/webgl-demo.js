console.log("Script loaded");

// Initiatlizing WebGL variables that are indicated in the example script and placed in the global space in that example
// https://www.interactivecomputergraphics.com/Code/02/gasket1.js is example reference.
var positions = [];
var numPositions = 5000;
// Example provided a var for gl that I am choosing my implementation to leave in main().

// Wait for DOM to load before initializing WebGL
window.addEventListener('load', main);

function main() {
    console.log("Main function called");
    
    const canvas = document.querySelector("#gl-canvas");
    console.log("Canvas element:", canvas);
    
    // Add debug logging to verify canvas is found
    if (!canvas) {
        console.error("Canvas element not found");
        return;
    }
    
    // Starting the build of the Sierpinski Gasket
    const gl = canvas.getContext("webgl");
    if (!gl) {
        console.error("WebGL not supported");
        return;
    }

    // Configuring the WebGL canvas
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Defining the initial verticies of the triangle
    const vertices = [
        [0, 1],
        [-1, -1],
        [1, -1]
    ];

    // Sepcifying the starting position p for iteration
    var u = add(vertices[0], vertices[1]);
    var v = add(vertices[0], vertices[2]);
    var p = mult(0.25, add(u, v));

    // Addition of initial position into the array of points
    positions.push(p);

    // Iteratively generating points for the Sierpinski Gasket
    for (var i = 0; positions.length < numPositions; ++i) {
        var j = Math.floor(Math.random() * 3);
        p = add(positions[i], vertices[j]);
        p = mult(0.5, p);
        positions.push(p);
    }
    // Choosing to implement the render as a set of commands at the end instead of a separate function for simplicity
    //gl.clear(gl.COLOR_BUFFER_BIT);
    //gl.drawArrays(gl.POINTS, 0, positions.length);
}
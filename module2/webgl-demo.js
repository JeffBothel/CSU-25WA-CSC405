console.log("Script loaded");

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
    
    const gl = canvas.getContext("webgl");
    console.log("WebGL context:", gl);

    // Check if WebGL is supported
    if (gl === null) {
        console.error("WebGL not supported");
        alert("Unable to initialize WebGL. Your browser may not support it.");
        return;
    }

    console.log("Setting clear color and clearing canvas");
    // Set clear color to black, fully opaque
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // Clear the color buffer with specified clear color
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    console.log("WebGL initialization complete");
}
/**
 * @param {number} n
 * @return {boolean}
 */
var divisorGame = function(n) {
    return divisorGameRec(n, "alice").lostPlayer === "bob"
};

// x = range 1...n-1
// alice wil win when the next play n-x === 0
//


// n = 3
function divisorGameRec(n, player) {
    
    let currentX = -1
    
    for (let x = 1; x < n; x++) {
        if (n % x === 0) {
            currentX = x
            break
        }
    }
    
    if (currentX === -1) {
        return {lostPlayer: player}
    }
    
    if (n - currentX === 0) {
        return {lostPlayer: player}
    }
    
    return divisorGameRec(n - currentX, player === "alice" ? "bob": "alice")
}
/**
 * @param {number} n
 * @return {number}
 */


 // 3
 var climbStairs = function(n) {
    let memo = {}

    return countClimbStairsRec(n, memo)
};

function countClimbStairsRec(n, memo) {
    if (memo[n]) {
        return memo[n]
    }

    if (n < 0) {
        return 0
    }
    else if (n === 0) {
        return 1
    }

    memo[n] = countClimbStairsRec(n - 2, memo) + countClimbStairsRec(n - 1, memo)

    return memo[n]
}
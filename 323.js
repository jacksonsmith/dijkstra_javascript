/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var countComponents = function(n, edges) {
    let visited = new Set()
    let count = 0
    for (let i = 0; i < n; i++) {
        if (!visited.has(i)) {
            bfs(edges, visited, i)
            count++
        }
    }

    return count
};


function bfs(edges, visited, root) {
    let queue = [root]

    while (queue.length > 0) {
        let visiting = queue.shift()

        visited.add(visiting)

        for (let edge of edges) {
            if (edge[0] === visiting || edge[1] === visiting) {
                if (!visited.has(edge[0])) {
                    queue.push(edge[0])
                }

                if (!visited.has(edge[1])) {
                    queue.push(edge[1])
                }
            }
        }
    }
}
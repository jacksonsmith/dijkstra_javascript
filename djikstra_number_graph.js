// // build graph
const graph = [ [{node: 2, weight: 10}, {node: 3, weight: 5}],
                [{node: 3, weight: 3}, {node: 4, weight: 1}],
                [{node: 2, weight: 3}, {node: 5, weight: 2}],
                [{node: 5, weight: 6}],
                [{node: 1, weight: 7}, {node: 4, weight: 6}]
            ]

// // shortest path djikstra algorithm

function shortestPath(graph, rootNode) {
    if (!graph[rootNode]) {
        console.log("incorrect root node")
    }
    const { Heap } = require('heap-js');
    const customPriorityComparator = (a, b) => a.weight - b.weight;
    const remaining = new Heap(customPriorityComparator);

    const previousNode = {}

    for (let i = 1; i <= graph.length; i++) {
        previousNode[i] = i
    }

    const pathWeight = {}

    for (let i = 1; i <= graph.length; i++) {
        pathWeight[i] = i === rootNode ? 0: Infinity
    }

    for (let i = 1; i <= graph.length; i++) {
        remaining.push({node: i, weight: pathWeight[i]})
    }

    while (remaining.size() > 0) {
        let visiting = remaining.pop()
    
        console.log("path weight", pathWeight)
        console.log('visiting: ', visiting.node)
    
        for (let neighboor of graph[visiting.node - 1]) {
            let sum = pathWeight[visiting.node] + neighboor.weight
    
            if (sum < pathWeight[neighboor.node]) {
                pathWeight[neighboor.node] = sum
                previousNode[neighboor.node] = visiting.node
    
            }
        }
    }

    return {pathWeight, previousNode}
}

// tests || asserts

const {pathWeight, previousNode} = shortestPath(graph, 1)

console.log("pathWeight", pathWeight)
console.log("previousNode", previousNode)

console.log("---- assert pathWeight ----")

console.log("assert pathWeight equals 0", pathWeight[1] === 0)
console.log("assert pathWeight equals 8",pathWeight[2] === 8)
console.log("assert pathWeight equals 5",pathWeight[3] === 5)
console.log("assert pathWeight equals 9",pathWeight[4] === 9)
console.log("assert pathWeight equals 7",pathWeight[5] === 7)

console.log("---- assert previousNode ----")

console.log("assert previousNode equals 1", previousNode[1] === 1)
console.log("assert previousNode equals 2",previousNode[2] === 3)
console.log("assert previousNode equals 3",previousNode[3] === 1)
console.log("assert previousNode equals 4",previousNode[4] === 2)
console.log("assert previousNode equals 5",previousNode[5] === 3)
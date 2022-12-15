// // build graph

const graph = {
    a: [{node: "b", weight: 5}, {node: "c", weight: 3}, {node: "e", weight: 2}],
    b: [{node: "d", weight: 2}],
    c: [{node: "b", weight: 1}, {node: "d", weight: 1}],
    d: [{node: "a", weight: 1}, {node: "g", weight: 2}, {node: "h", weight: 1}],
    e: [{node: "a", weight: 1}, {node: "h", weight: 4}, {node: "i", weight: 7}],
    f: [{node: "b", weight: 3}, {node: "g", weight: 1}],
    g: [{node: "c", weight: 3}, {node: "i", weight: 2}],
    h: [{node: "c", weight: 2}, {node: "f", weight: 2}, {node: "g", weight: 2}],
    i: []
}

// // shortest path djikstra algorithm

function shortestPath(graph, rootNode) {
    if (!graph[rootNode]) {
        console.log("incorrect root node")
    }
    const { Heap } = require('heap-js');
    const customPriorityComparator = (a, b) => a.weight - b.weight;
    const remaining = new Heap(customPriorityComparator);

    const previousNode = {}

    for (let node in graph) {
        previousNode[node] = node
    }

    const pathWeight = {}

    for (let node in graph) {
        pathWeight[node] = node === rootNode ? 0: Infinity
    }

    // for (let node in graph) {
    remaining.push({node: rootNode, weight: pathWeight[rootNode]})
    // }

    while (remaining.size() > 0) {
        let visiting = remaining.pop()
    
        console.log('visiting: ', visiting.node)
    
        for (let neighboor of graph[visiting.node]) {
            console.log(neighboor)
            let sum = pathWeight[visiting.node] + neighboor.weight
    
            if (sum < pathWeight[neighboor.node]) {
                pathWeight[neighboor.node] = sum
                previousNode[neighboor.node] = visiting.node
                remaining.push({node: neighboor.node, weight: sum})
            }
        }

        console.log(remaining.peek())
    }

    return {pathWeight, previousNode}
}

// tests || asserts

const {pathWeight, previousNode} = shortestPath(graph, "a")

console.log("pathWeight", pathWeight)
console.log("previousNode", previousNode)

console.log("---- assert pathWeight ----")

console.log("assert pathWeight equals a", pathWeight["a"] === 0)
console.log("assert pathWeight equals b",pathWeight["b"] === 4)
console.log("assert pathWeight equals c",pathWeight["c"] === 3)
console.log("assert pathWeight equals d",pathWeight["d"] === 4)
console.log("assert pathWeight equals e",pathWeight["e"] === 2)
console.log("assert pathWeight equals f",pathWeight["f"] === 7)
console.log("assert pathWeight equals g",pathWeight["g"] === 6)
console.log("assert pathWeight equals h",pathWeight["h"] === 5)
console.log("assert pathWeight equals i",pathWeight["i"] === 8)

console.log("---- assert previousNode ----")

console.log("assert pathWeight equals a", previousNode["a"] === "a")
console.log("assert pathWeight equals b",previousNode["b"] === "c")
console.log("assert pathWeight equals c",previousNode["c"] === "a")
console.log("assert pathWeight equals d",previousNode["d"] === "c")
console.log("assert pathWeight equals e",previousNode["e"] === "a")
console.log("assert pathWeight equals f",previousNode["f"] === "h")
console.log("assert pathWeight equals g",previousNode["g"] === "d")
console.log("assert pathWeight equals h",previousNode["h"] === "d")
console.log("assert pathWeight equals i",previousNode["i"] === "g")
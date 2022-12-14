const { Heap } = require('heap-js');

const customPriorityComparator = (a, b) => a.weight - b.weight;
const minHeap = new Heap(customPriorityComparator);

const graph = [ [{node: 2, weight: 10}, {node: 3, weight: 5}],
                [{node: 3, weight: 3}, {node: 4, weight: 1}],
                [{node: 2, weight: 3}, {node: 5, weight: 2}],
                [{node: 5, weight: 6}],
                [{node: 1, weight: 7}, {node: 4, weight: 6}]
]
const estimate = {1: Infinity, 2: Infinity, 3: Infinity, 4: Infinity, 5 :Infinity}
const visited = [1]

minHeap.push({node:1, weight: 0})
estimate[1] = 0


while (minHeap.size() > 0) {
    let visiting = minHeap.pop()
    visited.push(visiting.node)

    console.log("estimativas", estimate)
    console.log('visiting: ', visiting.node)

    for (let neighboor of graph[visiting.node - 1]) {
        if (!visited.includes(neighboor.node)) {
            let sum = estimate[visiting.node] + neighboor.weight
            let currentWeight = sum < estimate[neighboor.node] ? sum : estimate[neighboor.node]
            estimate[neighboor.node] = currentWeight
            minHeap.push({node: neighboor.node, weight: currentWeight});
        }
    }
}


console.log(estimate)

console.log(estimate[1] === 0)
console.log(estimate[2] === 8)
console.log(estimate[3] === 5)
console.log(estimate[4] === 9)
console.log(estimate[5] === 7)
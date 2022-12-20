var minimumEffortPath = function(heights) {
    let graph = buildGraph(heights)

    const {pathPrevious} = djikstra("00", graph)

    const lastIndex = (heights.length - 1).toString() + (heights[0].length - 1).toString()

    let currentNode = pathPrevious[lastIndex]
    let result = [heights[heights.length - 1][heights[0].length - 1]]
    while (currentNode != "-") {
        console.log(currentNode)
        console.log(currentNode.split(""))
        result.push(heights[currentNode.split("")[0]][currentNode.split("")[1]])
        currentNode = pathPrevious[currentNode]
    }

    console.log(result.reverse())

    return result.reverse()
};

function buildGraph(heights) {
    console.log("oi")
    
    let graph = {}

    for (let i = 0; i < heights?.[0].length; i++) {
        for (let j = 0; j < heights?.[i].length; j++) {
            // if (i >= 0 && i < heights?.length && j >= 0 && j < heights?.[0].length) {
                let upIndex = i - 1
                let downIndex = i + 1
                let leftIndex = j - 1
                let rightIndex = j + 1

                let nodeName = i.toString() + j.toString()

                
                graph[nodeName] = []
                
                if (upIndex >= 0 ) {
                    graph[nodeName].push({label: upIndex.toString() + j.toString(), weight: heights[upIndex][j]})
                }

                if (downIndex < heights.length) {
                    graph[nodeName].push({label: downIndex.toString() + j.toString(), weight: heights[downIndex][j]})
                }

                if (leftIndex >= 0) {
                    graph[nodeName].push({label: i.toString() + leftIndex.toString(), weight: heights[i][leftIndex]})
                }
                
                if (rightIndex < heights[0].length) {
                    graph[nodeName].push({label: i.toString() + rightIndex.toString(), weight: heights[i][rightIndex]})
                }
        }
    } 

    return graph
}


function djikstra(root, graph) {
    let remaining = [{label: root, weight: 0}]
    let pathWeight = {}
    let pathPrevious = {}
    let visitedNodes = ["00"]

    for (let node in graph) {
        pathWeight[node] = node === root ? 0 : Infinity
        pathPrevious[node] = "-"
    }

    while (remaining.length > 0) {
        let n = remaining.shift()

        visitedNodes.push(n.label)

        console.log("visiting", n.label)
        console.log("neighboors", graph[n.label])
        console.log("pathWeight", pathWeight)

        if (n.label === "22") {
            break
        }
        
            for (let neighboors of graph[n.label]) {
                if (!visitedNodes.includes(neighboors.label)) {
                    let sum = Math.abs(n.weight - neighboors.weight)

                    pathWeight[neighboors.label] = sum
                    remaining.push({label: neighboors.label, weight: sum})
                    pathPrevious[neighboors.label] = n.label
        
                    remaining.sort((a,b) => a.weight - b.weight)
                }
            }
    }

    return {pathWeight, pathPrevious}
}


console.log(minimumEffortPath([[1,2,2],[3,8,2],[5,3,5]]))
console.log(JSON.stringify(minimumEffortPath([[1,2,2],[3,8,2],[5,3,5]])) === JSON.stringify([1,3,5,3,5]))


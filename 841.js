/**
 * @param {number[][]} rooms
 * @return {boolean}
 */
var canVisitAllRooms = function(rooms) {
    return dfs(0, rooms)
};

function dfs(root, rooms) {
    let queue = [root] 
    let visited = [] 
    let visitedRooms = new Set()

    while(queue.length > 0) {
        let currentKey = queue.shift()

        visited.push(currentKey)
        visitedRooms.add(currentKey)

        for (let key of rooms[currentKey]) {
            if (!visited.includes(key)) {
                queue.push(key)
            }
        }
    }
    
    return visitedRooms.size === rooms.length
}
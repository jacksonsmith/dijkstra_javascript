/**
 * @param {number[][]} intervals
 * @return {number}
 */
var minMeetingRooms = function(intervals) {
    let minHeap = []
    let minMeetingCount = 0
    intervals.sort((intervalA, intervalB) => intervalA[0] - intervalB[0])

    for(let interval of intervals) {
        minHeap.push(interval[1])
    }
    minHeap.sort((intervalA, intervalB) => intervalA - intervalB)

    for (let interval of intervals) {
        let peekEndInterval = minHeap[0]

        // console.log("interval", interval[0])
        // console.log("peekEndInterval", peekEndInterval)
        // console.log("result", interval[0] < peekEndInterval)

        if (interval[0] < peekEndInterval) {
            minMeetingCount++
        } else {
            minHeap.shift(0)
        }
    }

    return minMeetingCount

    // [20,45],[12,13],[2,50],[14,20],[3,5]
    // 2 ----- 5// sala 1  2 < 5 true
    //  3 ----------- 13 // sala 2. 3 < 5 {12 < 13 true} || conta +1
    //               12 ------------ 20 // sala 2. {12 < 13 true} || conta +1
    //                   14 -------------------------- 45 // sala 1
    //                              20 ---------------------- 50 // sala 2
};
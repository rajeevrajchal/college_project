module.exports = {

    /*
    * compare two data of same list of datasets.
    * check with profit and return the schedule array of data.
    */
    compareProfit: (a, b) => {
        if (a.profit > b.profit) {
            return -1
        }
        if (a.profit < b.profit) {
            return 1
        }
        return 0
    },

    jobSchedulingList: (sortedJobs) => {
        /*
        * Initialize the result sequence as first job in sorted jobs
        */
        const scheduleJobs = []

        //length of the original jobs array.
        const sizeOfJobs = sortedJobs.length
        for (var i = 0; i < sizeOfJobs; i++) {
            for (var j = Math.min(sizeOfJobs, sortedJobs[i].deadline) - 1; j >= 0; j--) {
                if (!scheduleJobs[j]) {
                    scheduleJobs[j] = sortedJobs[i];  // Add this job to result// Make this slot occupied
                    break;
                }
            }
        }
        return scheduleJobs
    },

    findProbability: (ratingOne,ratingSecond ) => {
        return 1.0/(1+ Math.pow(10, (ratingOne - ratingSecond) / 400))
    },

    eloRateTask: (tasks) => {
        /*
       * k is factor that
       * K = γt, where t is ti/48, ti is time and 48 is normalize constant.
       *     γ is choose by running synthetic pr real-life data represent by d .
       * every sprint is of 7 days i.e. 168 hr
       */
        const k = 168 / 48
        const taskCopy = [...tasks]
        console.table(taskCopy)
        const comparison = (taskOne, taskTwo) => {
            //probability to win.
            const probabilityB = 1.0/(1+ Math.pow(10, (taskOne - taskTwo) / 400))
            const probabilityA = 1.0/(1+ Math.pow(10, (taskTwo - taskOne) / 400))
            console.log(probabilityB)
            console.log(probabilityA)
            if(probabilityA > probabilityB ){
                console.log('A wins')
            }
            else if(probabilityA === probabilityB){
                console.log("draw")
            }
            else{
                return 'b'
                console.log('B wins')
            }
        }
        let i = 0
        while (i < taskCopy.length-1) {
           comparison(taskCopy[i]['deadline'], taskCopy[i+1]['deadline'])
            i++
        }
    }
}

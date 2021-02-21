const {findProbability} = require("../helper");
const {eloRateTask} = require("../helper");
const {
    compareProfit,
    jobSchedulingList
} = require("../helper/index")

module.exports = {
    /*
    * Greedy Approach of scheduling job with deadline and profit.
    * ALGORITHM
    * -> Sort all the jobs in decreasing order of profit.
    * -> Initialize the result sequence as first jobs in sorted jobs.
    * -> Now do following for remaining n-1 jobs
    *   ->  If the current job can fit in the current result sequence without missing the deadline,
    *       add current job to the result else ignore.
    */

    schedule: async (req, res, next) => {
        try {
            const {
                jobs
            } = req.body
            /*
            * -> sort a job in descending order of profit
            * -> jobs.sort(compareProfit) takes a function as input for sort the datasets
            */
            const sortedJobs = await jobs.sort(compareProfit)

            //scheduling jobs
            const scheduleJobs = await jobSchedulingList(sortedJobs)

            //final response
            if(scheduleJobs.length !== 0 ){
                await eloRateTask(scheduleJobs)
                // return res.status(200).json({
                //     data: {
                //         sortedJob: sortedJobs,
                //         schedule: scheduleJobs,
                //         msg: "schedule is required"
                //     },
                //     status: "success"
                // });
            }else{
                console.log('error')
            }
        } catch (error) {
            next(error)
        }
    },

    eloRating: async (req, res, next) => {
        const {
            expectedRatingA, expectedRatingB,d
        } = req.body
        /*
        * k is factor that
        * K = γt, where t is ti/48, ti is time and 48 is normalize constant.
        *         γ is choose by running synthetic pr real-life data represent by d .
        * every sprint is of 7 days i.e. 168 hr
        */
        const k = 168 / 48
        let newRatingA = 0
        let newRatingB = 0
        const probabilityB = findProbability(expectedRatingA, expectedRatingB)
        const probabilityA = findProbability(expectedRatingB, expectedRatingA)
        console.log(probabilityB)
        console.log(probabilityA)
        // A wins
        if(probabilityA > probabilityB ){
            console.log('A wins')
            newRatingA = expectedRatingA + k * (1 - probabilityA )
            newRatingB = expectedRatingB + k * (0 - probabilityB )
        }
        else if(probabilityA === probabilityB){
            newRatingA = expectedRatingA,
            newRatingB =expectedRatingB
        }
        else{
        //    B wins
            console.log('B wins')
             newRatingA = expectedRatingA + k * (0 - probabilityA )
             newRatingB = expectedRatingB + k * (1 - probabilityB )
        }
        console.log(newRatingA)
        console.log(newRatingB)
    }
}

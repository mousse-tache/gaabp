const sortNominations = (nominations) => {
    return (
        nominations.filter(x => x.sd).map(x => {return {sd: new Date(x.sd), ed: x.ed ? new Date(x.ed) : new Date()}}).sort((previous, current) => {
  
            var previousTime = previous.sd.getTime();
            var currentTime = current.sd.getTime();
          
            if (previousTime < currentTime) {
              return -1;
            }
          
            if (previousTime === currentTime) {
              return 0;
            }
          
            return 1;
        })
    )
}

const getFlattenedYears = (arrayYears) => {
    const fy = [];

    arrayYears.forEach((years, index) => {
        if (index == 0) {
            fy.push(years);
            return;
        }
        var previous = fy[fy.length-1];

        if (previous.ed < years.sd) {
            fy.push(years);
            return;
        }

        if(previous.sd < years.sd && previous.ed < years.ed) {
            previous.ed = years.ed;
            return;
        }                
    });

    return fy;
}

const getYearsElapsed = (arrayYears) => {
    var yearsElapsed = 0;

    arrayYears.forEach(y => {
        var diff = new Date(y.ed - y.sd);
        yearsElapsed+= Math.abs(diff.getUTCFullYear() - 1970)
    });

    return yearsElapsed;
}

const getAnneeDeService = (nominations) => {
    var sorted = sortNominations(nominations);
    var fy = getFlattenedYears(sorted);

    return getYearsElapsed(fy);
}

export default getAnneeDeService;
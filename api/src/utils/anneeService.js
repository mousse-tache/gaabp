const sortNominations = (nominations) => {
    return (
        nominations.filter(x => x.sd && x.type !== "Membre").map(x => {return {sd: new Date(x.sd), ed: x.ed ? new Date(x.ed) : new Date()};}).sort((previous, current) => {
  
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
    );
};

const getFlattenedYears = (arrayYears) => {
    const fy = [];

    arrayYears.forEach((years, index) => {
        if (index === 0) {
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
};

const getYearsElapsed = (arrayYears) => {
    var yearsElapsed = 0;

    arrayYears.forEach(y => {
        var diff = y.ed - y.sd;
        yearsElapsed+= diff;
    });

    yearsElapsed= Math.abs(new Date(yearsElapsed).getUTCFullYear() - 1970);
    return yearsElapsed;
};

const getYearsAndDaysElapsed = (arrayYears) => {
    var yearsElapsed = 0;
    var daysElapsed = 0;

    arrayYears.forEach(y => {
        var diff = y.ed - y.sd;
        yearsElapsed+= diff;
    });

    yearsElapsed= Math.abs(new Date(yearsElapsed).getUTCFullYear() - 1970);

    arrayYears.forEach(y => {
        var diff = new Date(y.ed - y.sd);
        daysElapsed+= Math.abs(diff/(1000*60*60*24));
    });

    daysElapsed= Math.round(daysElapsed - yearsElapsed*365);

    return `${yearsElapsed} an(s) et ${daysElapsed} jour(s)`;
};

const getDetailedService = (nominations) => {
    var sorted = sortNominations(nominations);
    var fy = getFlattenedYears(sorted);

    return getYearsAndDaysElapsed(fy);
};

const getAnneeDeService = (nominations) => {
    var sorted = sortNominations(nominations);
    var fy = getFlattenedYears(sorted);

    return getYearsElapsed(fy);
};

export { getAnneeDeService }
const sortNominations = (nominations): number => {
  return nominations
    .filter((x) => x.sd && x.type !== "Membre")
    .map((x) => {
      return { sd: new Date(x.sd), ed: x.ed ? new Date(x.ed) : new Date() };
    })
    .sort((previous, current) => {
      const previousTime = previous.sd.getTime();
      const currentTime = current.sd.getTime();

      if (previousTime < currentTime) {
        return -1;
      }

      if (previousTime === currentTime) {
        return 0;
      }

      return 1;
    });
};

const getFlattenedYears = (arrayYears): Array => {
  const fy = [];

  arrayYears.forEach((years, index) => {
    if (index === 0) {
      fy.push(years);
      return;
    }
    const previous = fy[fy.length - 1];

    if (previous.ed < years.sd) {
      fy.push(years);
      return;
    }

    if (previous.sd < years.sd && previous.ed < years.ed) {
      previous.ed = years.ed;
      return;
    }
  });

  return fy;
};

const getYearsElapsed = (arrayYears): number => {
  let yearsElapsed = 0;

  arrayYears.forEach((y) => {
    const diff = y.ed - y.sd;
    yearsElapsed += diff;
  });

  yearsElapsed = Math.abs(new Date(yearsElapsed).getUTCFullYear() - 1970);
  return yearsElapsed;
};

const getYearsAndDaysElapsed = (arrayYears): string => {
  let yearsElapsed = 0;
  let daysElapsed = 0;

  arrayYears.forEach((y) => {
    const diff = y.ed - y.sd;
    yearsElapsed += diff;
  });

  yearsElapsed = Math.abs(new Date(yearsElapsed).getUTCFullYear() - 1970);

  arrayYears.forEach((y) => {
    const diff = new Date(y.ed - y.sd);
    daysElapsed += Math.abs(diff / (1000 * 60 * 60 * 24));
  });

  daysElapsed = Math.round(daysElapsed - yearsElapsed * 365);

  return `${yearsElapsed} an(s) et ${daysElapsed} jour(s)`;
};

const getDetailedService = (nominations: Record): string => {
  const sorted = sortNominations(nominations);
  const fy = getFlattenedYears(sorted);

  return getYearsAndDaysElapsed(fy);
};

const getAnneeDeService = (nominations: Record): number => {
  const sorted = sortNominations(nominations);
  const fy = getFlattenedYears(sorted);

  return getYearsElapsed(fy);
};

export default getAnneeDeService;

export { getDetailedService };

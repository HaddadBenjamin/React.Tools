const computePageRange = (
  page: number,
  numberOfPageToDisplay: number,
  lastPage: number,
) => {
  // eslint-disable-next-line operator-linebreak
  const clampedNumberOfPageToDisplay =
    // eslint-disable-next-line no-nested-ternary
    numberOfPageToDisplay < 0
      ? 1
      : numberOfPageToDisplay > lastPage
        ? lastPage
        : numberOfPageToDisplay;
  const numberOfPageToDisplayIsEven = clampedNumberOfPageToDisplay % 2 === 0;

  let minimumPageRange = page - Math.floor(clampedNumberOfPageToDisplay / 2);
  const minimumPageOffset = minimumPageRange < 1 ? -minimumPageRange + 1 : 0;

  minimumPageRange += minimumPageOffset;

  let maximumPageRange = page + Math.floor(clampedNumberOfPageToDisplay / 2) + minimumPageOffset;
  const maximumPageRangeOffset = maximumPageRange > lastPage ? maximumPageRange - lastPage : 0;

  if (maximumPageRangeOffset) {
    minimumPageRange -= maximumPageRangeOffset - minimumPageOffset;
    maximumPageRange -= maximumPageRangeOffset;
  }

  return [
    minimumPageRange,
    maximumPageRange - (numberOfPageToDisplayIsEven ? 1 : 0),
  ];
};

export default computePageRange;

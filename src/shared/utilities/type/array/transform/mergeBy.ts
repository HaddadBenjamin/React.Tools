/* eslint-disable no-tabs,no-mixed-spaces-and-tabs */
export interface IMergeByParameters<TElement1, TElement2>
{
	array1: TElement1[]
	array2: TElement2[]
	mergeCondition: (element1: TElement1, element2: TElement2) => boolean
	removeElementWithoutMatches?: boolean
}

export interface IMergeFields <TElement2>
{
	haveMergeMatches: boolean,
	mergeMatchesCount: number,
	firstMergeMatch?: TElement2,
	mergeMatches: TElement2[]
}

export type MergeByResponse<TElement1, TElement2> = IMergeFields<TElement2> & TElement1

const mergeBy = <TElement1, TElement2>(
  {
    array1,
    array2,
    mergeCondition,
    removeElementWithoutMatches,
  } : IMergeByParameters<TElement1, TElement2>) : MergeByResponse<TElement1, TElement2>[] => array1
    .map((element1) => {
      const mergeMatches = array2.filter((element2) => mergeCondition(element1, element2));

      return ({
        ...element1,
        haveMergeMatches: !!mergeMatches?.[0],
        mergeMatchesCount: mergeMatches.length,
        firstMergeMatch: mergeMatches?.[0],
        mergeMatches,
      });
    })
    .filter((elementMerged) => !removeElementWithoutMatches || elementMerged.haveMergeMatches);

export default mergeBy;

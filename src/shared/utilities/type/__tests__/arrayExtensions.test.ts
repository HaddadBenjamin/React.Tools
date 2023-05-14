import addRangeWithoutDuplicate from '../array/transform/addRangeWithoutDuplicate';
import distinctBy from "../array/filter/distinctBy";
import containsAll from "../array/predicate/containsAll";
import groupBy from "../array/transform/groupBy";
import swap from "../array/transform/swap";
import swapIndex from "../array/transform/swapIndex";
import mergeBy from "../array/transform/mergeBy";

describe('arrayExtension', () => {
  it("addRangeWithoutDuplicate'", () => {
    // Given & When
    const result = addRangeWithoutDuplicate([{a: 1, id: 1}], [
      {a: 1, id: 1},
      {a: 2, id: 2},
    ], (a, b) => a.id === b.id)
    const expected = [{a: 1, id: 1}, {a: 2, id: 2} ];

    expect(result).toStrictEqual(expected)
  });

  it("distinctBy'", () => {
    // Given & When
    const result = distinctBy([
      {a: 1, id: 1},
      {a: 1, id: 1},
      {a: 2, id: 2}],
      (a, b) => a.id === b.id)
    const expected = [{a: 1, id: 1}, {a: 2, id: 2} ];

    expect(result).toStrictEqual(expected)
  });

  it("containsAll'", () => {
    // Given & When & Then
    expect(containsAll([1,2,3], [1, 2])).toStrictEqual(true)
    expect(containsAll([1,2,3], [1, 2, 4])).toStrictEqual(false)
  });

  it("groupBy'", () => {
    // Given & When
    const result = groupBy([
        {a: 1, id: 1},
        {a: 2, id: 1},
        {a: 3, id: 2}],
      a => a.id)
    const expected = [
      { key : 1, value : [{a: 1, id: 1}, {a: 2, id: 1}] },
      { key : 2, value : [{a: 3, id: 2}] },
    ];

    expect(result).toStrictEqual(expected)
  });

  it("swap", () => {
    // Given & When
    const result = swap([1, 2, 3,  4, 5], 1, 5)
    const expected = [5, 2, 3, 4, 1]

    expect(result).toStrictEqual(expected)
  });

  it("swapIndex", () => {
    // Given & When
    const result = swapIndex([1, 2, 3,  4, 5], 0, 4)
    const expected = [5, 2, 3, 4, 1]

    expect(result).toStrictEqual(expected)
  });

  describe("mergeBy", () => {
    const mergedElements = [
      {
        id : 1,
        s: '1',
        haveMergeMatches: true,
        mergeMatchesCount: 2,
        firstMergeMatch: { id : 1, text: 'other test 1' },
        mergeMatches: [{ id : 1, text: 'other test 1' }, { id : 1, text: 'other test 1-2' }]
      },
      {
        id : 2,
        s: '2',
        haveMergeMatches: true,
        mergeMatchesCount: 1,
        firstMergeMatch: { id : 2, text: 'other test 2' },
        mergeMatches: [{ id : 2, text: 'other test 2' }]
      }
    ]

    it("return matches and no matches elements - removeElementWithoutMatches: false", () => {
      // Given & When
      const result  = mergeBy({
        array1: [{ id : 1, s: '1' }, { id : 2, s: '2' }, { id : 3, s: '3' }],
        array2: [{ id : 1, text: 'other test 1' }, { id : 2, text: 'other test 2' }, { id : 1, text: 'other test 1-2' }],
        mergeCondition: (element1, element2) => element1.id === element2.id,
      })
      const expected = [...mergedElements,
        {
          id : 3,
          s: '3',
          haveMergeMatches: false,
          firstMergeMatch: undefined,
          mergeMatchesCount: 0,
          mergeMatches: []
        }]

      expect(result).toStrictEqual(expected)
    });

    it("return only matches elements - removeElementWithoutMatches: true", () => {
      // Given & When
      const result  = mergeBy({
        array1: [{ id : 1, s: '1' }, { id : 2, s: '2' }, { id : 3, s: '3' }],
        array2: [{ id : 1, text: 'other test 1' }, { id : 2, text: 'other test 2' }, { id : 1, text: 'other test 1-2' }],
        mergeCondition: (element1, element2) => element1.id === element2.id,
        removeElementWithoutMatches: true
      })

      expect(result).toStrictEqual(mergedElements)
    });
  })
});

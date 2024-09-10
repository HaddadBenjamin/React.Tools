import { useEffect, useRef } from 'react';

type MutationCallback = (mutations: MutationRecord[]) => void;

// attributes: attributs, classes, data / charactersData : data / subTree: observe les enfants / subtree: observe les enfants de façon profonde
// attributeOldValue: anciens attributs et classes / attributeFilder: c'est pour de l'optimisation, ex: ['class', 'data-*']
const defaultOptions : MutationObserverInit = ({
  /** Observe: attributes, classes, data changes  Can be omitted if attributeOldValue or attributeFilter is specified. */
  attributes: true,
  /** Observe: data. Can be omitted if characterDataOldValue is specified. */
  characterData: true,
  /** Observe children. */
  childList: true,
  /** Observe the whole tree. */
  subtree: true,
  /** Set to true if characterData is set to true or omitted and target's data before the mutation needs to be recorded. */
  characterDataOldValue: true,
  /** Ex: ['class', 'data-*'] */
  // attributeFilter: true,
  /** Set to true if attributes is true or omitted and target's attribute value before the mutation needs to be recorded. */
  attributeOldValue: true,
  /** Set to true if mutations to target's attributes are to be observed. Can be omitted if attributeOldValue or attributeFilter is specified. */
});

/* Exemple d'utilisation :
    const ref = useRef<HTMLDivElement>(null);
    const handleMutation: MutationCallback = ;
    const observe = useMutationObserver((mutations: MutationCallback) => mutations.forEach((console.log)), { childList: true });
    useEffect(() => { if (targetRef.current) observe(targetRef.current, { subtree: true });}, [observe]);
    return <div ref={ref}/>
*/

const useMutationObserver = (callback: MutationCallback, options?: MutationObserverInit) => {
  const observer = useRef<MutationObserver | null>(null);

  useEffect(() => {
    observer.current = new MutationObserver(callback);

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [callback]);

  const observe = (target: Node, config?: MutationObserverInit) => {
    if (observer.current) {
      observer.current.observe(target, { ...options, ...(defaultOptions ?? config) });
    }
  };

  return observe;
};

export default useMutationObserver;

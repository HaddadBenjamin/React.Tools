import { useEffect, useState } from 'react';
import axios from 'axios';
import doesElementIsVisible from '../../../../shared/utilities/htmlElement/doesElementIsVisible';

// Pour pouvoir faire de l'infinite scrolling, il est nécéssaire que votre endpoint en GET gère la pagination.
export default (
  containerSelector: string,
  computeFetchUrl: (page: number, pageSize: number) => string,
  updateDelay = 500,
  pageSize = 1,
  lastPage = 100,
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [items, setItems] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [mustFetch, setMustFetch] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fetchItems = (): Promise<any> => {
    if (!hasNextPage) return Promise.resolve();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return axios.get(computeFetchUrl(page, pageSize)).then((response: any) => {
      const newPage: number = page + 1;

      setItems([...items, ...response.data]);
      setPage(newPage);

      if (newPage > lastPage) setHasNextPage(false);
    });
  };

  useEffect(() => {
    async function asyncEffect() {
      await fetchItems();
      setMustFetch(false);
    }

    if (mustFetch) asyncEffect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mustFetch]);

  const doesLastContainerChildIsVisible = (): boolean => {
    const lastChild = document.querySelector(
      `${containerSelector} :last-child`,
    );

    return doesElementIsVisible(lastChild);
  };

  const computeIsFetching = () => {
    if (doesLastContainerChildIsVisible()) setMustFetch(true);
  };

  useEffect(() => {
    fetchItems();
    const timer = window.setInterval(computeIsFetching, updateDelay);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { items, isFetching: !mustFetch } as const;
};

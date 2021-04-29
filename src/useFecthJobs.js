/** @format */

import { useReducer, useEffect } from 'react';
import axios from 'axios';

const ACTION = {
  MAKE_REQUEST: 'make-request',
  GET_DATA: 'get-data',
  ERROR: 'error',
  UPDATE_HAS_NEXT_PAGE: 'update-has-next-page'
};

const BASE_URL =
  'https://secret-ocean-49799.herokuapp.com/https://jobs.github.com/positions.json';

function reducer(state, action) {
  switch (action.type) {
    case ACTION.MAKE_REQUEST:
      return { loading: true, jobs: [] };

    case ACTION.GET_DATA:
      return { ...state, loading: false, jobs: action.payload.jobs };

    case ACTION.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        jobs: []
      };

    case ACTION.UPDATE_HAS_NEXT_PAGE:
      return { ...state, hasNextPage: action.payload.hasNextPage };

    default:
      return state;
  }
}

export default function useFetchjobs(params, page) {
  const [state, dispatch] = useReducer(reducer, { jobs: [], loading: true });

  useEffect(() => {
    const cancleToken1 = axios.CancelToken.source();
    dispatch({ type: ACTION.MAKE_REQUEST });
    axios
      .get(BASE_URL, {
        cancelToken: cancleToken1.token,
        params: { markdown: true, page: page, ...params }
      })
      .then((res) => {
        dispatch({ type: ACTION.GET_DATA, payload: { jobs: res.data } });
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        dispatch({ type: ACTION.ERROR, payload: { error: err } });
      });

    const cancleToken2 = axios.CancelToken.source();
    axios
      .get(BASE_URL, {
        cancelToken: cancleToken2.token,
        params: { markdown: true, page: page + 1, ...params }
      })
      .then((res) => {
        dispatch({
          type: ACTION.UPDATE_HAS_NEXT_PAGE,
          payload: { hasNextPage: res.data.length !== 0 }
        });
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        dispatch({ type: ACTION.ERROR, payload: { error: err } });
      });

    return () => {
      cancleToken1.cancel();
      cancleToken2.cancel();
    };
  }, [params, page]);
  return state;
}

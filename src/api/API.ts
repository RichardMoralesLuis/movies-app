const buildURLParams = (params: any = {}): URLSearchParams => {
  const searchParams = new URLSearchParams();
  searchParams.append('api_key', process.env.REACT_APP_API_KEY!);
  Object.keys(params).forEach(paramKey => searchParams.append(paramKey, params[paramKey]));
  return searchParams;
};

const get = async <T>(path: string, params?: any): Promise<T> => {
  const searchParams = buildURLParams(params);
  const url = `${process.env.REACT_APP_BASE_URL}/${path}?${searchParams}`;

  const response = await fetch(url);

  // if (parser) {
  //   return parser(response);
  // }

  return await response.json();
};

export const API = {
  MOVIES: {
    popular: () => get('movie/popular'),
    search: (query: string, page = 1) => get('search/movie', { query, page })
  },
  CASTS: {
    search: (query: string, page = 1) => get('search/person', { query, page })
  },
  PRODUCTION_COMPANIES: {
    search: (query: string, page = 1) => get('search/company', { query, page })
  },
  GENRES: {
    all: () => get('genre/movie/list')
  },
  DISCOVER: {
    filter: (params: any) => get('discover/movie', params)
  }
};

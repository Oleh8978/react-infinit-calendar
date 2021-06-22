export const appendSearchParams = function concatArrayWithUnique<TypeElement>(
  url: URL,
  searchParams: { [key: string]: any },
) {
  if (searchParams.limit) url.searchParams.append('limit', searchParams.limit);
  if (searchParams.hasOwnProperty('offset'))
    url.searchParams.append('offset', searchParams.offset);
  if (searchParams.query) url.searchParams.append('query', searchParams.query);
  if (searchParams.sortType)
    url.searchParams.append('sortType', searchParams.sortType);
  if (searchParams.sortField)
    url.searchParams.append('sortField', searchParams.sortField);
  if (searchParams.type) url.searchParams.append('type', searchParams.type);
  return url;
};

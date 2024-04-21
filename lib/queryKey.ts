export const tableManagerKeys = {
  table: ['table'] as const,
  detail: (id?: string | string[]) =>
    [...tableManagerKeys.table, 'detail', id] as const,
};

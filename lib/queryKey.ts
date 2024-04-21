export const tableManagerKeys = {
  table: ['table'] as const,
  detail: () => [...tableManagerKeys.table, 'detail'] as const,
  detailId: (id: string) => [...tableManagerKeys.detail(), id] as const,
};

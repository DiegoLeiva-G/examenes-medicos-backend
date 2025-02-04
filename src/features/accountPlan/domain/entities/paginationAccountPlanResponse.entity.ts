export class PaginationAccountPlanResponseEntity<T> {
  constructor(
    public total: number,
    public totalPages: number,
    public currentPage: number,
    public nextPage: number | null,
    public prevPage: number | null,
    public results: T,
    public totalAmounts: { totalExpenses: number; totalIncomes: number },
  ) {}
}

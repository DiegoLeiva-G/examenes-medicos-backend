import { type Prisma } from '@prisma/client';

export const prismaSearchQuery = <T>(
  field: keyof T,
  search: string,
): Array<Record<string, { contains: string; mode: Prisma.QueryMode }>> =>
  search.split(' ').map(search => ({
    [field]: {
      contains: search,
      mode: 'insensitive' as Prisma.QueryMode,
    },
  }));

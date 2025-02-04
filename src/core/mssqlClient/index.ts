import { TYPES } from 'tedious';
import knex from 'knex';
import { envs } from '../config';

const mssqlClient = knex({
  client: 'mssql',
  connection: {
    host: envs.DB_SERVER,
    port: parseInt(envs.DB_PORT, 10),
    user: envs.DB_USER,
    password: envs.DB_PASSWORD,
    options: {
      // eslint-disable-next-line
      mapBinding: (value: any) => {
        // bind all strings to varchar instead of nvarchar
        if (typeof value === 'string') {
          return {
            type: TYPES.VarChar,
            value,
          };
        }

        // allow devs to pass tedious type at query time
        if (value !== null && value.type) {
          return {
            type: value.type,
            value: value.value,
          };
        }
      },
    },
  },
});

// TODO: now with knex we can improve this sql queries

export const caschileDB = async <T>(sqlQuery: string): Promise<{ recordset: T[] }> => {
  const selectedRows = await mssqlClient.raw(sqlQuery);

  return { recordset: selectedRows };
};

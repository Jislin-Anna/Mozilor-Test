import pgPromise from 'pg-promise';

const pgp = pgPromise();

const db = pgp('postgres://postgres:jislin@123@localhost:5432');

export {db,pgp};
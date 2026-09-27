/*
 * Revacity CMS - set up the app database on your EXISTING local PostgreSQL
 * (localhost:5432) instead of Docker. Creates the revacity_cms database,
 * points .env at it, then runs migrations + seed.
 * Run via setup-local-db.bat (which prompts for your Postgres password).
 */
const { Pool } = require('pg');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const HOST = process.env.PGHOST || 'localhost';
const PORT = process.env.PGPORT || '5432';
const USER = process.env.PGUSER || 'postgres';
const DBNAME = 'revacity_cms';
const PASS = process.env.PGPASS || '';

if (!PASS) {
  console.error('No password provided. Run setup-local-db.bat instead of this file.');
  process.exit(1);
}

const enc = encodeURIComponent(PASS);
const adminUrl = `postgresql://${USER}:${enc}@${HOST}:${PORT}/postgres`;
const appUrl = `postgresql://${USER}:${enc}@${HOST}:${PORT}/${DBNAME}`;

function run(cmd) {
  console.log('> ' + cmd);
  execSync(cmd, { stdio: 'inherit', shell: true });
}

(async () => {
  const admin = new Pool({ connectionString: adminUrl, connectionTimeoutMillis: 5000 });
  try {
    await admin.query('SELECT 1');
  } catch (e) {
    console.error(`\n!! Could not connect to PostgreSQL at ${HOST}:${PORT} as "${USER}".`);
    console.error(`   ${e.code || ''} ${e.message || ''}`);
    console.error('   - Wrong password? Run the .bat again and re-enter it.');
    console.error('   - No PostgreSQL on 5432? Tell Claude and we will install one.');
    process.exit(1);
  }

  const exists = await admin.query('SELECT 1 FROM pg_database WHERE datname=$1', [DBNAME]);
  if (exists.rowCount === 0) {
    console.log(`Creating database "${DBNAME}"...`);
    await admin.query(`CREATE DATABASE "${DBNAME}"`);
  } else {
    console.log(`Database "${DBNAME}" already exists.`);
  }
  await admin.end();

  // Point .env at this database.
  const envPath = path.join(process.cwd(), '.env');
  let env = fs.readFileSync(envPath, 'utf8');
  const line = `DATABASE_URL="${appUrl}"`;
  if (/^DATABASE_URL=.*$/m.test(env)) env = env.replace(/^DATABASE_URL=.*$/m, line);
  else env = line + '\n' + env;
  fs.writeFileSync(envPath, env);
  console.log(`Updated .env -> DATABASE_URL now uses ${HOST}:${PORT}/${DBNAME}`);

  // Create tables and seed.
  process.env.DATABASE_URL = appUrl;
  run('npm run db:migrate');
  run('npm run db:seed');

  console.log('\n=========================================================');
  console.log(' Database is ready.');
  console.log(' NEXT: stop your dev server (Ctrl+C in its window) and run');
  console.log('       npm run dev');
  console.log(' again so it picks up the new .env, then reload');
  console.log('       http://localhost:3000/en');
  console.log('=========================================================');
})().catch((e) => {
  console.error('\n!! FAILED:', e.code || '', e.message || '');
  process.exit(1);
});

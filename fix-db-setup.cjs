/*
 * Revacity CMS - database setup helper (run by start-db.bat)
 * Waits for Postgres, then makes sure the schema + seed data exist.
 * The navigation column mismatch is already handled in code (schema.ts
 * maps sortOrder -> the existing "order" column), so no rename is needed.
 */
const { Pool } = require('pg');
const { execSync } = require('child_process');

const CONN =
  process.env.DATABASE_URL ||
  'postgresql://postgres:postgres@localhost:5436/revacity_cms';
process.env.DATABASE_URL = CONN;

function run(cmd) {
  console.log('> ' + cmd);
  execSync(cmd, { stdio: 'inherit', shell: true });
}

(async () => {
  const pool = new Pool({ connectionString: CONN, connectionTimeoutMillis: 5000 });

  let connected = false;
  for (let i = 0; i < 30; i++) {
    try {
      await pool.query('SELECT 1');
      connected = true;
      break;
    } catch {
      if (i === 0) console.log('Waiting for Postgres at ' + CONN + ' ...');
      await new Promise((r) => setTimeout(r, 2000));
    }
  }
  if (!connected) {
    console.error('\n!! Could not connect to Postgres. Is Docker Desktop running?');
    process.exit(1);
  }
  console.log('Connected to Postgres.');

  const reg = await pool.query("SELECT to_regclass('public.navigation') AS r");
  if (!reg.rows[0].r) {
    console.log('Tables missing -> running migrations + seed...');
    await pool.end();
    run('npm run db:migrate');
    run('npm run db:seed');
    console.log('\nDone (fresh setup). Reload http://localhost:3000/en');
    return;
  }

  const cnt = await pool.query('SELECT count(*)::int AS c FROM navigation');
  if (cnt.rows[0].c === 0) {
    console.log('navigation table is empty -> seeding...');
    await pool.end();
    run('npm run db:seed');
    console.log('\nDone. Reload http://localhost:3000/en');
    return;
  }

  await pool.end();
  console.log('\nDatabase is up and populated. Reload http://localhost:3000/en');
})().catch((e) => {
  console.error('\n!! FAILED:', e.code || '', e.message);
  process.exit(1);
});

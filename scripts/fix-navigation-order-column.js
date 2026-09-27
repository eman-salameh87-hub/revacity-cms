const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres:postgres@localhost:5436/revacity_cms',
});

(async () => {
  try {
    await client.connect();
    const res = await client.query(
      "SELECT table_name, column_name, data_type FROM information_schema.columns WHERE table_name IN ('navigation', 'navigation_i18n') ORDER BY table_name, ordinal_position;"
    );

    console.log(JSON.stringify(res.rows, null, 2));

    const hasOrder = res.rows.some(
      (r) => r.table_name === 'navigation' && r.column_name === 'order'
    );
    const hasSortOrder = res.rows.some(
      (r) => r.table_name === 'navigation' && r.column_name === 'sort_order'
    );

    if (hasOrder && !hasSortOrder) {
      await client.query('ALTER TABLE public.navigation RENAME COLUMN "order" TO "sort_order";');
      console.log('RENAMED navigation.order -> navigation.sort_order');
    } else if (!hasOrder && !hasSortOrder) {
      console.log('navigation table has neither order nor sort_order');
    } else {
      console.log('navigation table already matches expected schema');
    }
  } catch (error) {
    console.error('DB_ERR:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
})();

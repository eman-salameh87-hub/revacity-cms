import { db } from '@/lib/db';
import { content, contentI18n, contentTypes } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

async function main() {
  const rows = await db
    .select({
      id: content.id,
      slug: content.slug,
      status: content.status,
      typeSlug: contentTypes.slug,
      locale: contentI18n.locale,
      title: contentI18n.title,
      body: contentI18n.body,
    })
    .from(content)
    .leftJoin(contentTypes, eq(contentTypes.id, content.typeId))
    .leftJoin(contentI18n, eq(contentI18n.contentId, content.id))
    .where(eq(content.id, 'bdb3181b-ac76-4b8d-a743-a8d2cc4f62e7'));

  console.log(JSON.stringify(rows, (key, value) => {
    if (key === 'body' && Array.isArray(value)) return `<${value.length} blocks: ${value.map((b: any) => b.type + (b.component ? ':' + b.component : '')).join(',')}>`;
    return value;
  }, 2));
  process.exit(0);
}
main().catch((e) => { console.error('ERROR', e); process.exit(1); });

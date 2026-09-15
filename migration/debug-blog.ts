// One-off diagnostic — not part of the app. Prints every `content` row whose
// slug is "blog", across every content type, so we can see exactly what's
// in the database (status, type, locale) instead of guessing blind.
import { db } from '@/lib/db';
import { content, contentI18n, contentTypes } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

async function main() {
  const rows = await db
    .select({
      id: content.id,
      slug: content.slug,
      status: content.status,
      typeId: content.typeId,
      typeSlug: contentTypes.slug,
      typeName: contentTypes.name,
      locale: contentI18n.locale,
      title: contentI18n.title,
      bodyLen: contentI18n.body,
    })
    .from(content)
    .leftJoin(contentTypes, eq(contentTypes.id, content.typeId))
    .leftJoin(contentI18n, eq(contentI18n.contentId, content.id))
    .where(eq(content.slug, 'blog'));

  console.log(JSON.stringify(rows, (key, value) => {
    if (key === 'bodyLen' && Array.isArray(value)) return `<${value.length} blocks: ${value.map((b) => b.type).join(',')}>`;
    return value;
  }, 2));

  if (rows.length === 0) {
    console.log('NO ROWS with slug "blog" found at all.');
  }
  process.exit(0);
}

main().catch((e) => { console.error('ERROR', e); process.exit(1); });

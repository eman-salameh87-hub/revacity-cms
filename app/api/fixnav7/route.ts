// Temporary diagnostic route - disabled. This folder can be deleted.
import { NextResponse } from 'next/server';
export function GET() {
  return NextResponse.json({ error: 'not found' }, { status: 404 });
}

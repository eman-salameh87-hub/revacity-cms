DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'navigation'
      AND column_name = 'order'
  )
  AND NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'navigation'
      AND column_name = 'sort_order'
  ) THEN
    ALTER TABLE public.navigation RENAME COLUMN "order" TO "sort_order";
  END IF;
END $$;

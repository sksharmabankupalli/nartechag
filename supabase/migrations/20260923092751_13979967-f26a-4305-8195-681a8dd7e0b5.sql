ALTER TABLE public.profiles ADD COLUMN username text;

UPDATE public.profiles
SET username = left(
  coalesce(
    nullif(regexp_replace(lower(coalesce(full_name, 'student')), '[^a-z0-9_]+', '', 'g'), ''),
    'student'
  ),
  20
) || '_' || left(replace(id::text, '-', ''), 6)
WHERE username IS NULL;

ALTER TABLE public.profiles ALTER COLUMN username SET NOT NULL;
ALTER TABLE public.profiles ADD CONSTRAINT profiles_username_length CHECK (char_length(username) BETWEEN 3 AND 30);
ALTER TABLE public.profiles ADD CONSTRAINT profiles_username_format CHECK (username ~ '^[a-z0-9_]+$');
CREATE UNIQUE INDEX profiles_username_unique_idx ON public.profiles (lower(username));

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  requested_username text;
BEGIN
  requested_username := lower(trim(COALESCE(NEW.raw_user_meta_data ->> 'username', '')));

  IF requested_username = '' OR requested_username !~ '^[a-z0-9_]{3,30}$' THEN
    RAISE EXCEPTION 'Username must be 3-30 characters using only lowercase letters, numbers, and underscores';
  END IF;

  INSERT INTO public.profiles (id, full_name, username)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', requested_username),
    requested_username
  )
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'student')
  ON CONFLICT DO NOTHING;

  RETURN NEW;
END;
$function$;
INSERT INTO public.resources (year, semester, course_name, title, resource_type, url, description)
SELECT 1, 2, 'Fundamentals of Plant Pathology', 'Fundamentals of Plant Pathology — Previous Year Question Papers (PATH 171)', 'pyqs', '/__l5e/assets-v1/d03d706f-9e1b-4c7b-9287-32f78097557e/PATH_171_PYQs_NARTECHAG.APP.pdf', 'Past examination papers for PATH 171.'
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources
  WHERE year = 1 AND semester = 2
    AND course_name = 'Fundamentals of Plant Pathology'
    AND resource_type = 'pyqs'
    AND url = '/__l5e/assets-v1/d03d706f-9e1b-4c7b-9287-32f78097557e/PATH_171_PYQs_NARTECHAG.APP.pdf'
);
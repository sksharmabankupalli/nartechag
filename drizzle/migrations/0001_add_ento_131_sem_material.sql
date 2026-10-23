INSERT INTO public.resources (course_name, title, resource_type, year, semester, url, description)
SELECT
  'Fundamentals of Entomology',
  'Course Material (ENTO 131)',
  'semester_exam',
  1,
  2,
  '/__l5e/assets-v1/3c355693-3c32-4082-92f9-5ee271946a48/ENTO_131_Course_Material_NARTECHAG.APP.pdf',
  'Full course material — lectures 1-25 on insect morphology and taxonomy (ANGRAU)'
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources
  WHERE course_name = 'Fundamentals of Entomology'
    AND resource_type = 'semester_exam'
    AND year = 1
    AND semester = 2
    AND url = '/__l5e/assets-v1/3c355693-3c32-4082-92f9-5ee271946a48/ENTO_131_Course_Material_NARTECHAG.APP.pdf'
);
INSERT INTO public.resources (year, semester, course_name, title, resource_type, url, description)
SELECT 2, 3, 'Fundamentals of Extension Education', 'Fundamentals of Extension Education — Course Material (AEXT 292)', 'semester_exam', '/__l5e/assets-v1/8dc6c1e5-995c-4069-9547-126729a7280d/AEXT_292_NARTECHAG.APP.pdf', 'Lecture notes and comprehensive course material for AEXT 292.'
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources
  WHERE year = 2 AND semester = 3
    AND course_name = 'Fundamentals of Extension Education'
    AND resource_type = 'semester_exam'
    AND url = '/__l5e/assets-v1/8dc6c1e5-995c-4069-9547-126729a7280d/AEXT_292_NARTECHAG.APP.pdf'
);
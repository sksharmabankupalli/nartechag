INSERT INTO public.resources (year, semester, course_name, title, resource_type, url, description)
SELECT 1, 2, 'Livestock and Poultry Management', 'Livestock and Poultry Management — Course Material (LSPM 101)', 'semester_exam', '/__l5e/assets-v1/3e0197c4-a051-4c25-8d16-e89b6fc130fb/LSPM_101_NARTECHAG.APP.pdf', 'Cover identifies LSPM 101; internal lecture pages are labeled LSPM 201. Compiled by Dr. Bala Krishna and CH. Hari Gopala Krishna.'
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources
  WHERE year = 1 AND semester = 2
    AND course_name = 'Livestock and Poultry Management'
    AND resource_type = 'semester_exam'
    AND url = '/__l5e/assets-v1/3e0197c4-a051-4c25-8d16-e89b6fc130fb/LSPM_101_NARTECHAG.APP.pdf'
);
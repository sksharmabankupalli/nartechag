INSERT INTO public.resources (year, semester, course_name, title, resource_type, url, description)
SELECT 1, 2, 'Soil Fertility Management', 'Soil Fertility Management — Course Material (SSAC 122)', 'semester_exam', '/__l5e/assets-v1/1c38dc9f-a2bf-4b10-bb33-58643f700ee3/SSAC_122_NARTECHAG.APP.pdf', 'Lecture notes and comprehensive course material by Dr. P. Gurumurthy, Professor, Department of Soil Science and Agricultural Chemistry, Agricultural College, Naira.'
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources
  WHERE year = 1 AND semester = 2
    AND course_name = 'Soil Fertility Management'
    AND resource_type = 'semester_exam'
    AND url = '/__l5e/assets-v1/1c38dc9f-a2bf-4b10-bb33-58643f700ee3/SSAC_122_NARTECHAG.APP.pdf'
);
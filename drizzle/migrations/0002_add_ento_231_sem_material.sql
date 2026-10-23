INSERT INTO public.resources (year, semester, course_name, title, resource_type, url)
SELECT 2, 3, 'Insect Ecology and Concepts of Integrated Pest Management', 'Course Material (ENTO 231)', 'semester_exam', '/__l5e/assets-v1/fdfb8a4e-a2c2-43ec-8603-496f361447a5/ENTO_231_SOURCE_NARTECHAG.APP.pdf'
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources
  WHERE course_name = 'Insect Ecology and Concepts of Integrated Pest Management'
    AND resource_type = 'semester_exam'
);
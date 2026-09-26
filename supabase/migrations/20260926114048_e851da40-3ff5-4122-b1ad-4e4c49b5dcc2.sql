INSERT INTO public.resources (year, semester, course_name, title, resource_type, url, description)
SELECT 1, 2, 'Personality Development', 'Personality Development — Course Material (AEC 193)', 'semester_exam', '/__l5e/assets-v1/58eb2208-885c-4b79-8644-584dc50e42e2/AEC_193_Personality_Development_Course_Material.pdf', 'Lecture notes and comprehensive practical course material.'
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources
  WHERE year = 1 AND semester = 2
    AND course_name = 'Personality Development'
    AND resource_type = 'semester_exam'
    AND url = '/__l5e/assets-v1/58eb2208-885c-4b79-8644-584dc50e42e2/AEC_193_Personality_Development_Course_Material.pdf'
);
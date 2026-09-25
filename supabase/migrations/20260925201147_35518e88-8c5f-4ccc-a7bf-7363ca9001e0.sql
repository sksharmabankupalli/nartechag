INSERT INTO public.resources (year, semester, course_name, title, resource_type, url, description)
SELECT 2, 3, 'Production Technology of Fruit and Plantation Crops', 'Production Technology of Fruit and Plantation Crops — Course Material (HORT 281)', 'semester_exam', '/__l5e/assets-v1/7e7580f2-2e28-4d72-aa8d-8cc8352e2bbc/HORT_281_Fruit_and_Plantation_Crops_Course_Material.pdf', 'Lecture notes and practical course material compiled by Dr G Narayana Swamy.'
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources
  WHERE year = 2 AND semester = 3
    AND course_name = 'Production Technology of Fruit and Plantation Crops'
    AND resource_type = 'semester_exam'
    AND url = '/__l5e/assets-v1/7e7580f2-2e28-4d72-aa8d-8cc8352e2bbc/HORT_281_Fruit_and_Plantation_Crops_Course_Material.pdf'
);
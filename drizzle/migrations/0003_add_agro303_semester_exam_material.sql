insert into public.resources (year, semester, course_name, title, resource_type, url, description)
select 3, 6, 'Dryland Agriculture / Rainfed Agriculture and Watershed Management',
       'Course Material (AGRO 303)', 'semester_exam',
       '/__l5e/assets-v1/ee045abe-fb47-4bd8-bcc5-b287affe937f/AGRO_303_UPTO_8_LEC.pdf',
       'Lecture material up to Lecture 8 (72 pages). The file''s pages also include Lecture 9 material.'
where not exists (
  select 1 from public.resources
  where semester = 6
    and course_name = 'Dryland Agriculture / Rainfed Agriculture and Watershed Management'
    and resource_type = 'semester_exam'
    and url = '/__l5e/assets-v1/ee045abe-fb47-4bd8-bcc5-b287affe937f/AGRO_303_UPTO_8_LEC.pdf'
);
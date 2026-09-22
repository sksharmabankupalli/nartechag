DELETE FROM public.resources
WHERE year = 1
  AND semester = 2
  AND course_name = 'Fundamentals of Plant Pathology'
  AND resource_type = 'lecture_outlines';

DELETE FROM public.resources
WHERE resource_type = 'lecture_outlines'
  AND title IN (
    'Personality Development — Course Outlines (AEC 193)',
    'Environmental Studies and Disaster Management — Course Outlines (VAC 161)',
    'Soil Fertility Management — Course Outlines (SSAC 122)',
    'Fundamentals of Entomology — Course Outlines (ENTO 131)',
    'Fundamentals of Plant Pathology — Course Outlines (PATH 171)',
    'Entrepreneurship Development and Business Communication — Course Outlines (MPC 291)',
    'Crop Production Technology-I (Kharif Crops) — Course Outlines (AGRO 201)',
    'Fundamentals of Extension Education — Course Outlines (AEXT 292)',
    'Fundamentals of Nematology — Course Outlines (PATH 271)',
    'Principles and Practices of Natural Farming — Course Outlines (AGRO 202)'
  );

INSERT INTO public.resources (year, semester, course_name, title, resource_type, url, description)
VALUES
  (1, 2, 'Personality Development', 'Personality Development — Course Outlines (AEC 193)', 'lecture_outlines', '/__l5e/assets-v1/c58ec8fa-b0b6-4207-af5e-53d8665f2279/Personality_Development_Course_Outlines_AEC_193.pdf', NULL),
  (1, 2, 'Environmental Studies and Disaster Management', 'Environmental Studies and Disaster Management — Course Outlines (VAC 161)', 'lecture_outlines', '/__l5e/assets-v1/27766650-9046-4345-bf3d-6197e7e3e4d6/Environmental_Studies_and_Disaster_Management_VAC_161.pdf', NULL),
  (1, 2, 'Soil Fertility Management', 'Soil Fertility Management — Course Outlines (SSAC 122)', 'lecture_outlines', '/__l5e/assets-v1/7dd9b46e-000b-4f70-9383-ae46f2e0ee95/Soil_Fertility_Management_Course_Outlines_SSAC_122.pdf', NULL),
  (1, 2, 'Fundamentals of Entomology', 'Fundamentals of Entomology — Course Outlines (ENTO 131)', 'lecture_outlines', '/__l5e/assets-v1/31949bf2-68c2-40e7-a101-93b898389362/Fundamentals_of_Entomology_Course_Outlines_ENTO_131.pdf', NULL),
  (1, 2, 'Fundamentals of Plant Pathology', 'Fundamentals of Plant Pathology — Course Outlines (PATH 171)', 'lecture_outlines', '/__l5e/assets-v1/7efe9126-c9f1-4609-9edf-2c006228c955/Fundamentals_of_Plant_Pathology_Course_Outlines_PATH_171.pdf', NULL),
  (2, 3, 'Entrepreneurship Development and Business Communication', 'Entrepreneurship Development and Business Communication — Course Outlines (MPC 291)', 'lecture_outlines', '/__l5e/assets-v1/ff8910fd-d2b7-439b-ba70-fa464a8d81ae/Entrepreneurship_Development_and_Business_Communication_MDC_291.pdf', NULL),
  (2, 3, 'Crop Production Technology-I (Kharif Crops)', 'Crop Production Technology-I (Kharif Crops) — Course Outlines (AGRO 201)', 'lecture_outlines', '/__l5e/assets-v1/30a3d56c-6153-4f70-936a-251a8989f6a1/Crop_Production_Technology_I_Kharif_Crops_AGRO_201.pdf', NULL),
  (2, 3, 'Fundamentals of Extension Education', 'Fundamentals of Extension Education — Course Outlines (AEXT 292)', 'lecture_outlines', '/__l5e/assets-v1/90c9cb80-018b-418e-96e1-fe79a8dddf04/Fundamentals_of_Extension_Education_AEXT_292.pdf', NULL),
  (2, 3, 'Fundamentals of Nematology', 'Fundamentals of Nematology — Course Outlines (PATH 271)', 'lecture_outlines', '/__l5e/assets-v1/8ab4b174-3f79-41ca-943c-40451c1cea90/Fundamentals_of_Nematology_PATH_271.pdf', NULL),
  (2, 3, 'Principles and Practices of Natural Farming', 'Principles and Practices of Natural Farming — Course Outlines (AGRO 202)', 'lecture_outlines', '/__l5e/assets-v1/200257af-38c9-43fa-a66c-47520f9fc69e/Principles_and_Practices_of_Natural_Farming_AGRO_202.pdf', NULL);
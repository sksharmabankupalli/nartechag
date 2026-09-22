DELETE FROM public.resources
WHERE year = 3
  AND semester = 6
  AND resource_type = 'lecture_outlines'
  AND course_name IN (
    'Renewable Energy in Agriculture and Allied Sector',
    'Dryland Agriculture / Rainfed Agriculture and Watershed Management',
    'Insect Pest Management in Horticultural Crops and Stored Grains',
    'Fundamentals of Agri Biotechnology',
    'Crop Improvement (Rabi Crops) - II',
    'Fundamentals of Seed Science & Technology',
    'Agricultural Microbiology and Phyto-remediation',
    'Basic and Applied Agril Statistics'
  );

INSERT INTO public.resources (year, semester, course_name, title, resource_type, url)
VALUES
  (3, 6, 'Renewable Energy in Agriculture and Allied Sector', 'Renewable Energy in Agriculture and Allied Sectors — Course Outlines (AENG 351)', 'lecture_outlines', '/__l5e/assets-v1/b79f63d9-5e34-4413-873f-3a64396d9df5/AENG_351_Renewable_Energy_Agriculture_Outlines.pdf'),
  (3, 6, 'Dryland Agriculture / Rainfed Agriculture and Watershed Management', 'Dryland Agriculture and Watershed Management — Course Outlines (AGRO 303)', 'lecture_outlines', '/__l5e/assets-v1/2fcc641f-3041-42bc-835a-72e32a11fc1e/AGRO_303_Dryland_Agriculture_Outlines.pdf'),
  (3, 6, 'Insect Pest Management in Horticultural Crops and Stored Grains', 'Pest Management in Horticultural Crops and Stored Grains — Course Outlines (ENTO 332)', 'lecture_outlines', '/__l5e/assets-v1/ebb46e07-53c7-4326-8d7e-c4adfeb7e11e/ENTO_332_Pest_Management_Horticultural_Crops_Stored_Grains_Outlines.pdf'),
  (3, 6, 'Fundamentals of Agri Biotechnology', 'Fundamentals of Agricultural Biotechnology — Course Outlines (GPBR 312)', 'lecture_outlines', '/__l5e/assets-v1/8ae3a232-cfc6-4c49-82c3-474346a634fd/GPBR_312_Agricultural_Biotechnology_Outlines.pdf'),
  (3, 6, 'Crop Improvement (Rabi Crops) - II', 'Crop Improvement (Rabi Crops) - II — Course Outlines (GPBR 313)', 'lecture_outlines', '/__l5e/assets-v1/5bf64291-70e3-4e93-b5a9-1c9612b286b2/GPBR_313_Crop_Improvement_Rabi_Crops_II_Outlines.pdf'),
  (3, 6, 'Fundamentals of Seed Science & Technology', 'Fundamentals of Seed Science & Technology — Course Outlines (GPBR 314)', 'lecture_outlines', '/__l5e/assets-v1/801f3374-e5a5-43b9-b1bd-b29593af7c98/GPBR_314_Fundamentals_of_Seed_Science_Technology_Outlines.pdf'),
  (3, 6, 'Agricultural Microbiology and Phyto-remediation', 'Agricultural Microbiology and Phyto-remediation — Course Outlines (PATH 372)', 'lecture_outlines', '/__l5e/assets-v1/4cf46b60-e6c0-4b4d-b550-9349fdab93c3/PATH_372_Agricultural_Microbiology_Phytoremediation_Outlines.pdf'),
  (3, 6, 'Basic and Applied Agril Statistics', 'Basic & Applied Agricultural Statistics — Course Outlines (STAT 301)', 'lecture_outlines', '/__l5e/assets-v1/bb5c829d-8f83-4b73-bf2d-a1fb1b78fd6b/STAT_301_Agricultural_Statistics_Outlines.pdf');
// Real, final curriculum content for the B.Sc (Hons) Agriculture programme.
// Resource uploads are tagged by Year -> Semester -> Course name (see the
// `resources` table), so keep course names here stable.

export type Course = {
  code: string;
  name: string;
  credits: string;
  note?: string;
};

export type Semester = {
  number: number;
  roman: string;
  year: number;
  yearLabel: string;
  total: string | null;
  courses: Course[];
};

export const YEAR_LABELS: Record<number, string> = {
  1: "1st Year",
  2: "2nd Year",
  3: "3rd Year",
  4: "Final Year",
};

export const SEMESTERS: Semester[] = [
  {
    number: 1,
    roman: "I",
    year: 1,
    yearLabel: "1st Year",
    total: "21 (11+10)",
    courses: [
      { code: "—", name: "Deeksharambh (Induction cum Foundation Course)", credits: "1 week", note: "Non-gradial" },
      { code: "—", name: "Skill Enhancement Course-I*", credits: "2(0+2)" },
      { code: "—", name: "Skill Enhancement Course-II*", credits: "2(0+2)" },
      { code: "AEC 191", name: "Communication Skills", credits: "2(1+1)" },
      { code: "MDC 100", name: "Farming Based Livelihood Systems", credits: "3(2+1)" },
      { code: "AEXT 192", name: "Rural Sociology and Educational Psychology", credits: "2(2+0)" },
      { code: "AGRO 101", name: "Fundamentals of Agronomy", credits: "3(2+1)" },
      { code: "SSAC 121", name: "Fundamentals of Soil Science", credits: "3(2+1)" },
      { code: "HORT 181", name: "Fundamentals of Horticulture", credits: "3(2+1)" },
      { code: "—", name: "National Service Scheme (NSS-I) / National Cadet Corps (NCC-I)", credits: "1(0+1)" },
      { code: "STAM 101", name: "Introductory Mathematics (need based)", credits: "1(1+0)", note: "Non-gradial" },
    ],
  },
  {
    number: 2,
    roman: "II",
    year: 1,
    yearLabel: "1st Year",
    total: "21 (10+11)",
    courses: [
      { code: "—", name: "Skill Enhancement Course-III*", credits: "2(0+2)" },
      { code: "—", name: "Skill Enhancement Course-IV*", credits: "2(0+2)" },
      { code: "AEC 193", name: "Personality Development", credits: "2(1+1)" },
      { code: "VAC 161", name: "Environmental Studies and Disaster Management", credits: "3(2+1)" },
      { code: "SSAC 122", name: "Soil Fertility Management", credits: "3(2+1)" },
      { code: "ENTO 131", name: "Fundamentals of Entomology", credits: "3(2+1)" },
      { code: "LSPM 101", name: "Livestock and Poultry Management", credits: "2(1+1)" },
      { code: "PATH 171", name: "Fundamentals of Plant Pathology", credits: "3(2+1)" },
      { code: "—", name: "NCC-II / NSS-II", credits: "1(0+1)" },
    ],
  },
  {
    number: 3,
    roman: "III",
    year: 2,
    yearLabel: "2nd Year",
    total: "21 (9+12)",
    courses: [
      { code: "—", name: "Skill Enhancement Course-V*", credits: "2(0+2)" },
      { code: "MPC 291", name: "Entrepreneurship Development and Business Communication", credits: "3(2+1)" },
      { code: "—", name: "Physical Education, First Aid, Yoga Practices and Meditation", credits: "2(0+2)" },
      { code: "GPBR 211", name: "Principles of Genetics", credits: "3(2+1)" },
      { code: "AGRO 201", name: "Crop Production Technology-I (Kharif Crops)", credits: "3(1+2)" },
      { code: "HORT 281", name: "Production Technology of Fruit and Plantation Crops", credits: "2(1+1)" },
      { code: "AEXT 292", name: "Fundamentals of Extension Education", credits: "2(1+1)" },
      { code: "PATH 271", name: "Fundamentals of Nematology", credits: "2(1+1)" },
      { code: "AGRO 202", name: "Principles and Practices of Natural Farming", credits: "2(1+1)" },
    ],
  },
  {
    number: 4,
    roman: "IV",
    year: 2,
    yearLabel: "2nd Year",
    total: null,
    courses: [
      { code: "VAC 202 / STAT 202", name: "Agricultural Informatics and Artificial Intelligence", credits: "" },
      { code: "AGRO 203", name: "Crop Production Technology-II (Rabi Crops)", credits: "" },
      { code: "AGRO 204", name: "Water Management", credits: "" },
      { code: "GPBR 212", name: "Basics of Plant Breeding", credits: "" },
      { code: "SSAC 221", name: "Problematic Soils and Their Management", credits: "" },
      { code: "AECO 241", name: "Principles of Agricultural Economics and Farm Management", credits: "" },
      { code: "AENG 251", name: "Farm Machinery and Power", credits: "" },
      { code: "HORT 282", name: "Production Technology of Vegetables and Spices", credits: "" },
    ],
  },
  {
    number: 5,
    roman: "V",
    year: 3,
    yearLabel: "3rd Year",
    total: "22 (13+9)",
    courses: [
      { code: "MDC 341", name: "Agricultural Marketing and Trade", credits: "3(2+1)" },
      { code: "AGMT 301", name: "Introduction to Agro-meteorology", credits: "2(1+1)" },
      { code: "CPHY 361", name: "Fundamentals of Crop Physiology", credits: "3(2+1)" },
      { code: "ENTO 351", name: "Pest Management in Crops and Stored Grains", credits: "3(2+1)" },
      { code: "PATH 371", name: "Diseases of Field & Horticultural Crops & their Management", credits: "3(2+1)" },
      { code: "GPBR 311", name: "Crop Improvement (Kharif Crops) - I", credits: "2(1+1)" },
      { code: "AGRO 301", name: "Weed Management", credits: "2(1+1)" },
      { code: "—", name: "Ornamental Crops, MAPs and Landscaping", credits: "2(1+1)" },
      { code: "AGRO 302", name: "Introductory Agroforestry", credits: "2(1+1)" },
    ],
  },
  {
    number: 6,
    roman: "VI",
    year: 3,
    yearLabel: "3rd Year",
    total: "21 (12+9)",
    courses: [
      { code: "GPBR 312", name: "Fundamentals of Agri Biotechnology", credits: "3(2+1)" },
      { code: "STAT 301", name: "Basic and Applied Agril Statistics", credits: "3(2+1)" },
      { code: "GPBR 313", name: "Crop Improvement (Rabi Crops) - II", credits: "2(1+1)" },
      { code: "AENG 351", name: "Renewable Energy in Agriculture and Allied Sector", credits: "2(1+1)" },
      { code: "AGRO 303", name: "Dryland Agriculture / Rainfed Agriculture and Watershed Management", credits: "2(1+1)" },
      { code: "PATH 372", name: "Agricultural Microbiology and Phyto-remediation", credits: "2(1+1)" },
      { code: "AECO 341", name: "Agricultural Finance & Cooperation", credits: "2(1+1)" },
      { code: "—", name: "Essentials of Plant Biochemistry", credits: "3(2+1)" },
      { code: "GPBR 314", name: "Fundamentals of Seed Science & Technology", credits: "2(1+1)" },
      // The source lists this separately; confirm its intended Semester VI placement.
      { code: "ENTO 332", name: "Insect Pest Management in Horticultural Crops and Stored Grains", credits: "" },
    ],
  },
  {
    number: 7,
    roman: "VII",
    year: 4,
    yearLabel: "Final Year",
    total: "20 (15+5)",
    courses: [
      {
        code: "—",
        name: "5 Elective Courses (major or minor), each of 4(3+1) credits, for B.Sc (Hons) Agriculture degree",
        credits: "20 (15+5)",
      },
    ],
  },
  {
    number: 8,
    roman: "VIII",
    year: 4,
    yearLabel: "Final Year",
    total: "20",
    courses: [
      {
        code: "—",
        name: "For B.Sc (Hons) Agriculture Degree — Student READY: RAWE / Industrial Attachment / Experiential Learning / Hands-on Training / Project Work / Internship",
        credits: "20",
      },
    ],
  },
];

export const PROGRAM_TOTALS = {
  coreCredits: "167",
  onlineCredits: "10",
  grandTotal: "167 + 10*",
};

// Canonical resource categories shown under each course (except Final Year).
// `key` is stored in the resources.resource_type column; `label` is shown in UI.
export const RESOURCE_CATEGORIES = [
  { key: "lecture_outlines", label: "Lecture Outlines" },
  { key: "semester_exam", label: "Semester Exam Resources" },
  { key: "practicals", label: "Practicals Resources" },
  { key: "pyqs", label: "Previous Year Question Papers (PYQs)" },
] as const;

export type ResourceCategoryKey = (typeof RESOURCE_CATEGORIES)[number]["key"];

export const YEARS = [1, 2, 3, 4].map((year) => ({
  year,
  label: YEAR_LABELS[year]!,
  semesters: SEMESTERS.filter((s) => s.year === year),
}));

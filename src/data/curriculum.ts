// Real, final curriculum content for the B.Sc (Hons) Agriculture programme.
// Resource uploads are tagged by Year -> Semester -> Course name (see the
// `resources` table), so keep course names here stable.

export type Course = {
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
      { name: "Deeksharambh (Induction cum Foundation Course)", credits: "1 week", note: "Non-gradial" },
      { name: "Skill Enhancement Course-I*", credits: "2(0+2)" },
      { name: "Skill Enhancement Course-II*", credits: "2(0+2)" },
      { name: "Communication Skills", credits: "2(1+1)" },
      { name: "Farming Based Livelihood Systems", credits: "3(2+1)" },
      { name: "Rural Sociology and Educational Psychology", credits: "2(2+0)" },
      { name: "Fundamentals of Agronomy", credits: "3(2+1)" },
      { name: "Fundamentals of Soil Science", credits: "3(2+1)" },
      { name: "Fundamentals of Horticulture", credits: "3(2+1)" },
      { name: "National Service Scheme (NSS-I) / National Cadet Corps (NCC-I)", credits: "1(0+1)" },
      { name: "Introductory Mathematics (need based)", credits: "1(1+0)", note: "Non-gradial" },
    ],
  },
  {
    number: 2,
    roman: "II",
    year: 1,
    yearLabel: "1st Year",
    total: "21 (10+11)",
    courses: [
      { name: "Skill Enhancement Course-III*", credits: "2(0+2)" },
      { name: "Skill Enhancement Course-IV*", credits: "2(0+2)" },
      { name: "Personality Development", credits: "2(1+1)" },
      { name: "Environmental Studies and Disaster Management", credits: "3(2+1)" },
      { name: "Soil Fertility Management", credits: "3(2+1)" },
      { name: "Fundamentals of Entomology", credits: "3(2+1)" },
      { name: "Livestock and Poultry Management", credits: "2(1+1)" },
      { name: "Fundamentals of Plant Pathology", credits: "3(2+1)" },
      { name: "NCC-II / NSS-II", credits: "1(0+1)" },
    ],
  },
  {
    number: 3,
    roman: "III",
    year: 2,
    yearLabel: "2nd Year",
    total: "21 (9+12)",
    courses: [
      { name: "Skill Enhancement Course-V*", credits: "2(0+2)" },
      { name: "Entrepreneurship Development and Business Communication", credits: "3(2+1)" },
      { name: "Physical Education, First Aid, Yoga Practices and Meditation", credits: "2(0+2)" },
      { name: "Principles of Genetics", credits: "3(2+1)" },
      { name: "Crop Production Technology-I (Kharif Crops)", credits: "3(1+2)" },
      { name: "Production Technology of Fruit and Plantation Crops", credits: "2(1+1)" },
      { name: "Fundamentals of Extension Education", credits: "2(1+1)" },
      { name: "Fundamentals of Nematology", credits: "2(1+1)" },
      { name: "Principles and Practices of Natural Farming", credits: "2(1+1)" },
    ],
  },
  {
    number: 4,
    roman: "IV",
    year: 2,
    yearLabel: "2nd Year",
    total: null,
    courses: [],
  },
  {
    number: 5,
    roman: "V",
    year: 3,
    yearLabel: "3rd Year",
    total: "22 (13+9)",
    courses: [
      { name: "Agricultural Marketing and Trade", credits: "3(2+1)" },
      { name: "Introduction to Agro-meteorology", credits: "2(1+1)" },
      { name: "Fundamentals of Crop Physiology", credits: "3(2+1)" },
      { name: "Pest Management in Crops and Stored Grains", credits: "3(2+1)" },
      { name: "Diseases of Field & Horticultural Crops & their Management", credits: "3(2+1)" },
      { name: "Crop Improvement (Kharif Crops) - I", credits: "2(1+1)" },
      { name: "Weed Management", credits: "2(1+1)" },
      { name: "Ornamental Crops, MAPs and Landscaping", credits: "2(1+1)" },
      { name: "Introductory Agroforestry", credits: "2(1+1)" },
    ],
  },
  {
    number: 6,
    roman: "VI",
    year: 3,
    yearLabel: "3rd Year",
    total: "21 (12+9)",
    courses: [
      { name: "Fundamentals of Agri Biotechnology", credits: "3(2+1)" },
      { name: "Basic and Applied Agril Statistics", credits: "3(2+1)" },
      { name: "Crop Improvement (Rabi Crops) - II", credits: "2(1+1)" },
      { name: "Renewable Energy in Agriculture and Allied Sector", credits: "2(1+1)" },
      { name: "Dryland Agriculture / Rainfed Agriculture and Watershed Management", credits: "2(1+1)" },
      { name: "Agricultural Microbiology and Phyto-remediation", credits: "2(1+1)" },
      { name: "Agricultural Finance & Cooperation", credits: "2(1+1)" },
      { name: "Essentials of Plant Biochemistry", credits: "3(2+1)" },
      { name: "Fundamentals of Seed Science & Technology", credits: "2(1+1)" },
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

export const YEARS = [1, 2, 3, 4].map((year) => ({
  year,
  label: YEAR_LABELS[year]!,
  semesters: SEMESTERS.filter((s) => s.year === year),
}));

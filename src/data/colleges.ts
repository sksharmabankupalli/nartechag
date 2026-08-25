export type College = {
  name: string;
  location: string;
  category: "Government" | "Affiliated";
};

export const COLLEGES: College[] = [
  { name: "Agricultural College, Bapatla", location: "Bapatla District", category: "Government" },
  { name: "S.V. Agricultural College, Tirupati", location: "Tirupati District", category: "Government" },
  { name: "Agricultural College, Naira", location: "Srikakulam District", category: "Government" },
  { name: "Agricultural College, Mahanandi", location: "Nandyal District", category: "Government" },
  {
    name: "Agricultural College, Rajamahendravaram",
    location: "East Godavari District",
    category: "Government",
  },
  {
    name: "Mekapati Gowtham Reddy Agricultural College, Udayagiri",
    location: "SPSR Nellore District",
    category: "Government",
  },
  { name: "Agricultural College, Pulivendula", location: "YSR Kadapa District", category: "Government" },
  { name: "Agricultural College, Vinukonda", location: "Palnadu / Guntur District", category: "Government" },
  {
    name: "Sri Kinjarapu Yerran Naidu College of Agricultural Sciences",
    location: "Etcherla, Srikakulam District",
    category: "Affiliated",
  },
  {
    name: "Kadiri Babu Rao College of Agriculture",
    location: "C.S. Puram, Kanigiri, Prakasam District",
    category: "Affiliated",
  },
  { name: "N.S. Agricultural College", location: "Markapur, Prakasam District", category: "Affiliated" },
  { name: "SBVR Agricultural College", location: "Badvel, YSR Kadapa District", category: "Affiliated" },
  {
    name: "Sri Krishna Devaraya College of Agricultural Sciences",
    location: "Anantapuramu, Anantapur District",
    category: "Affiliated",
  },
  {
    name: "J.C. Diwakar Reddy Agricultural College",
    location: "Tadipatri, Anantapur District",
    category: "Affiliated",
  },
];

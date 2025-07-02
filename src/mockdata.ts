import type { IUser } from "./redux/slices/usersSlice";

export const mockUsers: IUser[] = [  
  
     { id: 1,
      firstName: "Alice",
      lastName: "Johnson",
      email: "alice.johnson@example.com",
      phone: "9876543210",
      age: 28,
      gender: "Female",
      eyeColor: "Blue",
      bloodGroup: "A+",
      university: "Oxford",
      company: { department: "HR", title: "HR Manager" },
      address: { city: "London", state: "England" },
      image: "https://dummyjson.com/icon/alice/128"
    },
  
  {
    id: 2,
    firstName: "Bob",
    lastName: "Smith",
    email: "bob.smith@example.com",
    phone: "8765432109",
    age: 35,
    gender: "Male",
    eyeColor: "Brown",
    bloodGroup: "B+",
    university: "Harvard",
    company: { department: "Engineer", title: "Backend Developer" },
    address: { city: "New York", state: "NY" },
    image: "https://dummyjson.com/icon/bob/128"
  },
  {
    id: 3,
    firstName: "Charlie",
    lastName: "Lee",
    email: "charlie.lee@example.com",
    phone: "7654321098",
    age: 30,
    gender: "Male",
    eyeColor: "Green",
    bloodGroup: "O-",
    university: "Stanford",
    company: { department: "Support", title: "Tech Support" },
    address: { city: "Los Angeles", state: "CA" },
    image: "https://dummyjson.com/icon/charlie/128"
  },
  {
    id: 4,
    firstName: "Diana",
    lastName: "Ray",
    email: "diana.ray@example.com",
    phone: "6543210987",
    age: 32,
    gender: "Female",
    eyeColor: "Black",
    bloodGroup: "AB+",
    university: "MIT",
    company: { department: "Marketing", title: "SEO Analyst" },
    address: { city: "Boston", state: "MA" },
    image: "https://dummyjson.com/icon/diana/128"
  },
  {
    id: 5,
    firstName: "Ethan",
    lastName: "Mills",
    email: "ethan.mills@example.com",
    phone: "5432109876",
    age: 29,
    gender: "Male",
    eyeColor: "Hazel",
    bloodGroup: "B-",
    university: "IIT Delhi",
    company: { department: "Research and Develop", title: "Data Scientist" },
    address: { city: "Delhi", state: "Delhi" },
    image: "https://dummyjson.com/icon/ethan/128"
  },
  {
    id: 6,
    firstName: "Fiona",
    lastName: "Stone",
    email: "fiona.stone@example.com",
    phone: "4321098765",
    age: 27,
    gender: "Female",
    eyeColor: "Blue",
    bloodGroup: "A-",
    university: "Anna University",
    company: { department: "Engineer", title: "Frontend Developer" },
    address: { city: "Chennai", state: "TN" },
    image: "https://dummyjson.com/icon/fiona/128"
  },
  {
    id: 7,
    firstName: "George",
    lastName: "Clark",
    email: "george.clark@example.com",
    phone: "3210987654",
    age: 40,
    gender: "Male",
    eyeColor: "Brown",
    bloodGroup: "O+",
    university: "UCLA",
    company: { department: "Sales", title: "Sales Executive" },
    address: { city: "San Francisco", state: "CA" },
    image: "https://dummyjson.com/icon/george/128"
  },
  {
    id: 8,
    firstName: "Hannah",
    lastName: "Green",
    email: "hannah.green@example.com",
    phone: "2109876543",
    age: 24,
    gender: "Female",
    eyeColor: "Gray",
    bloodGroup: "A+",
    university: "SRM University",
    company: { department: "Support", title: "Helpdesk Associate" },
    address: { city: "Bangalore", state: "Karnataka" },
    image: "https://dummyjson.com/icon/hannah/128"
  },
  {
    id: 9,
    firstName: "Ian",
    lastName: "White",
    email: "ian.white@example.com",
    phone: "1098765432",
    age: 33,
    gender: "Male",
    eyeColor: "Black",
    bloodGroup: "AB-",
    university: "NIT Trichy",
    company: { department: "Engineer", title: "DevOps Engineer" },
    address: { city: "Hyderabad", state: "Telangana" },
    image: "https://dummyjson.com/icon/ian/128"
  },
  {
    id: 10,
    firstName: "Jenna",
    lastName: "Black",
    email: "jenna.black@example.com",
    phone: "9988776655",
    age: 26,
    gender: "Female",
    eyeColor: "Brown",
    bloodGroup: "B+",
    university: "BITS Pilani",
    company: { department: "Research and Develop", title: "AI Researcher" },
    address: { city: "Mumbai", state: "Maharashtra" },
    image: "https://dummyjson.com/icon/jenna/128"
  },
  {
    id: 11,
    firstName: "Emily",
    lastName: "Johnson",
    email: "emily.johnson@x.dummyjson.com",
    phone: "+81 965-431-3024",
    age: 28,
    gender: "female",
    eyeColor: "Green",
    bloodGroup: "O-",
    university: "University of Wisconsin--Madison",
    company: {
      department: "Engineering",
      title: "Sales Manager"
    },
    address: {
      city: "Phoenix",
      state: "Mississippi"
    },
    image: "https://dummyjson.com/icon/emilys/128"
  },
  {
    id: 12,
    firstName: "Michael",
    lastName: "Williams",
    email: "michael.williams@x.dummyjson.com",
    phone: "+49 258-627-6644",
    age: 35,
    gender: "male",
    eyeColor: "Red",
    bloodGroup: "B+",
    university: "Ohio State University",
    company: {
      department: "Support",
      title: "Support Specialist"
    },
    address: {
      city: "Houston",
      state: "Alabama"
    },
    image: "https://dummyjson.com/icon/michaelw/128"
  },
  {
    id: 13,
    firstName: "Sophia",
    lastName: "Brown",
    email: "sophia.brown@x.dummyjson.com",
    phone: "+81 210-652-2785",
    age: 42,
    gender: "female",
    eyeColor: "Hazel",
    bloodGroup: "O-",
    university: "Pepperdine University",
    company: {
      department: "Research and Development",
      title: "Accountant"
    },
    address: {
      city: "Washington",
      state: "Alabama"
    },
    image: "https://dummyjson.com/icon/sophiab/128"
  },
  {
    id: 14,
    firstName: "James",
    lastName: "Davis",
    email: "james.davis@x.dummyjson.com",
    phone: "+49 614-958-9364",
    age: 45,
    gender: "male",
    eyeColor: "Amber",
    bloodGroup: "AB+",
    university: "University of Southern California",
    company: {
      department: "Support",
      title: "Research Analyst"
    },
    address: {
      city: "Seattle",
      state: "Pennsylvania"
    },
    image: "https://dummyjson.com/icon/jamesd/128"
  },
  {
    id: 15,
    firstName: "Emma",
    lastName: "Miller",
    email: "emma.miller@x.dummyjson.com",
    phone: "+91 759-776-1614",
    age: 30,
    gender: "female",
    eyeColor: "Green",
    bloodGroup: "AB-",
    university: "Northeastern University",
    company: {
      department: "Human Resources",
      title: "Quality Assurance Engineer"
    },
    address: {
      city: "Jacksonville",
      state: "Colorado"
    },
    image: "https://dummyjson.com/icon/emmaj/128"
  },
  {
    id: 16,
    firstName: "Olivia",
    lastName: "Wilson",
    email: "olivia.wilson@x.dummyjson.com",
    phone: "+91 607-295-6448",
    age: 22,
    gender: "female",
    eyeColor: "Hazel",
    bloodGroup: "B+",
    university: "University of North Carolina--Chapel Hill",
    company: {
      department: "Product Management",
      title: "Research Analyst"
    },
    address: {
      city: "Fort Worth",
      state: "Tennessee"
    },
    image: "https://dummyjson.com/icon/oliviaw/128"
  },
  {
    id: 17,
    firstName: "Alexander",
    lastName: "Jones",
    email: "alexander.jones@x.dummyjson.com",
    phone: "+61 260-824-4986",
    age: 38,
    gender: "male",
    eyeColor: "Blue",
    bloodGroup: "AB-",
    university: "University of Illinois--Urbana-Champaign",
    company: {
      department: "Engineering",
      title: "Web Developer"
    },
    address: {
      city: "Indianapolis",
      state: "Delaware"
    },
    image: "https://dummyjson.com/icon/alexanderj/128"
  },
  {
    id: 18,
    firstName: "Ava",
    lastName: "Taylor",
    email: "ava.taylor@x.dummyjson.com",
    phone: "+1 458-853-7877",
    age: 27,
    gender: "female",
    eyeColor: "Hazel",
    bloodGroup: "AB-",
    university: "University of Wisconsin--Madison",
    company: {
      department: "Marketing",
      title: "Chief Executive Officer"
    },
    address: {
      city: "Fort Worth",
      state: "Rhode Island"
    },
    image: "https://dummyjson.com/icon/avat/128"
  },
  {
    id: 19,
    firstName: "Ethan",
    lastName: "Martinez",
    email: "ethan.martinez@x.dummyjson.com",
    phone: "+92 933-608-5081",
    age: 33,
    gender: "male",
    eyeColor: "Hazel",
    bloodGroup: "AB+",
    university: "Syracuse University",
    company: {
      department: "Support",
      title: "Legal Counsel"
    },
    address: {
      city: "San Antonio",
      state: "Louisiana"
    },
    image: "https://dummyjson.com/icon/ethanm/128"
  },
  {
    id: 20,
    firstName: "Isabella",
    lastName: "Anderson",
    email: "isabella.anderson@x.dummyjson.com",
    phone: "+49 770-658-4885",
    age: 31,
    gender: "female",
    eyeColor: "Brown",
    bloodGroup: "A-",
    university: "California Institute of Technology (Caltech)",
    company: {
      department: "Marketing",
      title: "Chief Financial Officer"
    },
    address: {
      city: "New York",
      state: "Utah"
    },
    image: "https://dummyjson.com/icon/isabellad/128"
  },
]
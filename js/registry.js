/**
 * TrustChain Verify - Authoritative Simulated Registries & Fuzzy Matching Engine
 * Pre-seeded with 42 NSDL, 42 UIDAI, and 42 University Records.
 */

const SEED_REGISTRIES = {
  "nsdl": [
    {
      "pan": "ABCPS1234F",
      "name": "RAJESH KUMAR SHARMA",
      "fatherName": "SURESH SHARMA",
      "dob": "1988-08-15",
      "status": "ACTIVE",
      "category": "INDIVIDUAL"
    },
    {
      "pan": "BKTPR5678K",
      "name": "PRIYA VERMA",
      "fatherName": "RAMESH VERMA",
      "dob": "1995-04-22",
      "status": "ACTIVE",
      "category": "INDIVIDUAL"
    },
    {
      "pan": "AAAPG9012E",
      "name": "AMIT GUPTA",
      "fatherName": "VINOD GUPTA",
      "dob": "1985-11-10",
      "status": "ACTIVE",
      "category": "INDIVIDUAL"
    },
    {
      "pan": "CPRPN3456L",
      "name": "NEHA PATEL",
      "fatherName": "CHETAN PATEL",
      "dob": "1992-01-05",
      "status": "ACTIVE",
      "category": "INDIVIDUAL"
    },
    {
      "pan": "DELPM7890Q",
      "name": "MANOJ DESHMUKH",
      "fatherName": "ANAND DESHMUKH",
      "dob": "1980-07-19",
      "status": "ACTIVE",
      "category": "INDIVIDUAL"
    },
    {
      "pan": "EFSPS1122R",
      "name": "SUNITA SHARMA",
      "fatherName": "JAGDISH SHARMA",
      "dob": "1989-03-14",
      "status": "ACTIVE",
      "category": "INDIVIDUAL"
    },
    {
      "pan": "FGTPK3344S",
      "name": "KARAN TIWARI",
      "fatherName": "SATISH TIWARI",
      "dob": "1994-09-28",
      "status": "ACTIVE",
      "category": "INDIVIDUAL"
    },
    {
      "pan": "GHYPR5566T",
      "name": "RITU YADAV",
      "fatherName": "MAHESH YADAV",
      "dob": "1996-12-12",
      "status": "ACTIVE",
      "category": "INDIVIDUAL"
    },
    {
      "pan": "HIJPC7788U",
      "name": "CHIRAG JOSHI",
      "fatherName": "HEMANT JOSHI",
      "dob": "1991-06-03",
      "status": "ACTIVE",
      "category": "INDIVIDUAL"
    },
    {
      "pan": "IJKPS9900V",
      "name": "SWATI SINGH",
      "fatherName": "INDRAJIT SINGH",
      "dob": "1993-05-25",
      "status": "ACTIVE",
      "category": "INDIVIDUAL"
    },
    {
      "pan": "JKLPM2233W",
      "name": "MOHIT MEHTA",
      "fatherName": "JITENDRA MEHTA",
      "dob": "1987-02-18",
      "status": "ACTIVE",
      "category": "INDIVIDUAL"
    },
    {
      "pan": "KLMPC4455X",
      "name": "CHETAN CHOUDHARY",
      "fatherName": "KISHORE CHOUDHARY",
      "dob": "1984-10-30",
      "status": "ACTIVE",
      "category": "INDIVIDUAL"
    },
    {
      "pan": "LMNDS6677Y",
      "name": "SANDEEP DUBEY",
      "fatherName": "LALIT DUBEY",
      "dob": "1990-08-08",
      "status": "ACTIVE",
      "category": "INDIVIDUAL"
    },
    {
      "pan": "MNERS8899Z",
      "name": "ROHIT RAWAT",
      "fatherName": "MUKESH RAWAT",
      "dob": "1995-04-17",
      "status": "ACTIVE",
      "category": "INDIVIDUAL"
    },
    {
      "pan": "NEFPG0011A",
      "name": "GAURAV NEGI",
      "fatherName": "NARESH NEGI",
      "dob": "1993-01-21",
      "status": "ACTIVE",
      "category": "INDIVIDUAL"
    },
    {
      "pan": "OFGPM2233B",
      "name": "MEENAKSHI OJHA",
      "fatherName": "OMPRAKASH OJHA",
      "dob": "1992-09-11",
      "status": "ACTIVE",
      "category": "INDIVIDUAL"
    },
    {
      "pan": "PGHPN4455C",
      "name": "NIKHIL PANDEY",
      "fatherName": "PRADEEP PANDEY",
      "dob": "1991-07-04",
      "status": "ACTIVE",
      "category": "INDIVIDUAL"
    },
    {
      "pan": "QHIPM6677D",
      "name": "MANISH QURESHI",
      "fatherName": "QUASIM QURESHI",
      "dob": "1986-06-16",
      "status": "ACTIVE",
      "category": "INDIVIDUAL"
    },
    {
      "pan": "RIJPS8899E",
      "name": "SHALINI RATHORE",
      "fatherName": "RAJENDRA RATHORE",
      "dob": "1997-03-29",
      "status": "ACTIVE",
      "category": "INDIVIDUAL"
    },
    {
      "pan": "SJKPK0011F",
      "name": "KAVITA SAXENA",
      "fatherName": "SANJAY SAXENA",
      "dob": "1990-11-07",
      "status": "ACTIVE",
      "category": "INDIVIDUAL"
    },
    {
      "pan": "TKLPA2233G",
      "name": "ANKIT TRIPATHI",
      "fatherName": "TARUN TRIPATHI",
      "dob": "1994-05-13",
      "status": "ACTIVE",
      "category": "INDIVIDUAL"
    },
    {
      "pan": "ULMPB4455H",
      "name": "BHAVNA UPADHYAY",
      "fatherName": "UMESH UPADHYAY",
      "dob": "1995-08-24",
      "status": "ACTIVE",
      "category": "INDIVIDUAL"
    },
    {
      "pan": "VMNPS6677I",
      "name": "SAURABH VERMA",
      "fatherName": "VIJAY VERMA",
      "dob": "1992-02-09",
      "status": "ACTIVE",
      "category": "INDIVIDUAL"
    },
    {
      "pan": "WNOPS8899J",
      "name": "SUMIT WAGHMARE",
      "fatherName": "WASUDEV WAGHMARE",
      "dob": "1989-10-15",
      "status": "ACTIVE",
      "category": "INDIVIDUAL"
    },
    {
      "pan": "XOPPN0011K",
      "name": "NEELAM XAVIER",
      "fatherName": "XAVIER PINTO",
      "dob": "1991-12-01",
      "status": "ACTIVE",
      "category": "INDIVIDUAL"
    },
    {
      "pan": "YPQPA2233L",
      "name": "ANANYA YADAV",
      "fatherName": "YOGESH YADAV",
      "dob": "1996-09-20",
      "status": "ACTIVE",
      "category": "INDIVIDUAL"
    },
    {
      "pan": "ZQRPS4455M",
      "name": "SNEHA ZAGADE",
      "fatherName": "ZAFAR ZAGADE",
      "dob": "1993-04-06",
      "status": "ACTIVE",
      "category": "INDIVIDUAL"
    },
    {
      "pan": "ABCPK6677N",
      "name": "KISHORE BANSAL",
      "fatherName": "ASHOK BANSAL",
      "dob": "1983-07-14",
      "status": "ACTIVE",
      "category": "INDIVIDUAL"
    },
    {
      "pan": "BCDPG8899O",
      "name": "GEETA BHATIA",
      "fatherName": "BHAGWAN BHATIA",
      "dob": "1988-02-27",
      "status": "ACTIVE",
      "category": "INDIVIDUAL"
    },
    {
      "pan": "CDEPD0011P",
      "name": "DEEPAK CHAWLA",
      "fatherName": "CHAMAN CHAWLA",
      "dob": "1990-08-19",
      "status": "ACTIVE",
      "category": "INDIVIDUAL"
    },
    {
      "pan": "DEFPT2233Q",
      "name": "TARUN DIXIT",
      "fatherName": "DEVENDRA DIXIT",
      "dob": "1992-03-03",
      "status": "ACTIVE",
      "category": "INDIVIDUAL"
    },
    {
      "pan": "EFGPA4455R",
      "name": "AJEET EKKA",
      "fatherName": "EDWARD EKKA",
      "dob": "1991-10-22",
      "status": "ACTIVE",
      "category": "INDIVIDUAL"
    },
    {
      "pan": "FGHPS6677S",
      "name": "SIMRAN FAROOQUI",
      "fatherName": "FAROOQ FAROOQUI",
      "dob": "1994-05-11",
      "status": "ACTIVE",
      "category": "INDIVIDUAL"
    },
    {
      "pan": "GHIPA8899T",
      "name": "ALOK GARG",
      "fatherName": "GIRISH GARG",
      "dob": "1986-01-16",
      "status": "ACTIVE",
      "category": "INDIVIDUAL"
    },
    {
      "pan": "HIJPR0011U",
      "name": "RAHUL HARIKRISHNAN",
      "fatherName": "HARI HARIKRISHNAN",
      "dob": "1993-06-28",
      "status": "ACTIVE",
      "category": "INDIVIDUAL"
    },
    {
      "pan": "IJKPS2233V",
      "name": "SHIKHA IYER",
      "fatherName": "ISHWAR IYER",
      "dob": "1995-12-09",
      "status": "ACTIVE",
      "category": "INDIVIDUAL"
    },
    {
      "pan": "JKLPN4455W",
      "name": "NITIN JAIN",
      "fatherName": "JAGMOHAN JAIN",
      "dob": "1987-07-31",
      "status": "ACTIVE",
      "category": "INDIVIDUAL"
    },
    {
      "pan": "KLMPK6677X",
      "name": "KAMAL KAUSHIK",
      "fatherName": "KRISHNA KAUSHIK",
      "dob": "1991-03-18",
      "status": "ACTIVE",
      "category": "INDIVIDUAL"
    },
    {
      "pan": "LMNPL8899Y",
      "name": "LAKSHMI LOHIA",
      "fatherName": "LOKESH LOHIA",
      "dob": "1992-09-25",
      "status": "ACTIVE",
      "category": "INDIVIDUAL"
    },
    {
      "pan": "MNOPM0011Z",
      "name": "MADHAVI MISHRA",
      "fatherName": "MANOHAR MISHRA",
      "dob": "1989-04-12",
      "status": "ACTIVE",
      "category": "INDIVIDUAL"
    },
    {
      "pan": "NOPPN2233A",
      "name": "NAVEEN NAGAR",
      "fatherName": "NANDKISHORE NAGAR",
      "dob": "1994-08-05",
      "status": "ACTIVE",
      "category": "INDIVIDUAL"
    },
    {
      "pan": "OPQPO4455B",
      "name": "OMKAR OBEROI",
      "fatherName": "OMPRAKASH OBEROI",
      "dob": "1985-11-17",
      "status": "ACTIVE",
      "category": "INDIVIDUAL"
    }
  ],
  "uidai": [
    {
      "aadhaar": "999941057004",
      "name": "RAJESH KUMAR SHARMA",
      "dob": "1988-08-15",
      "gender": "MALE",
      "address": "B-42, Malviya Nagar, New Delhi 110017",
      "mobileLinked": true,
      "status": "ACTIVE"
    },
    {
      "aadhaar": "999941057138",
      "name": "PRIYA VERMA",
      "dob": "1995-04-22",
      "gender": "FEMALE",
      "address": "12/4, MP Nagar Zone 2, Bhopal 462011",
      "mobileLinked": true,
      "status": "ACTIVE"
    },
    {
      "aadhaar": "999941057268",
      "name": "AMIT GUPTA",
      "dob": "1985-11-10",
      "gender": "MALE",
      "address": "Flat 302, Green Glen, Bangalore 560103",
      "mobileLinked": true,
      "status": "ACTIVE"
    },
    {
      "aadhaar": "999941057397",
      "name": "NEHA PATEL",
      "dob": "1992-01-05",
      "gender": "FEMALE",
      "address": "88, Navrangpura, Ahmedabad 380009",
      "mobileLinked": true,
      "status": "ACTIVE"
    },
    {
      "aadhaar": "999941057528",
      "name": "MANOJ DESHMUKH",
      "dob": "1980-07-19",
      "gender": "MALE",
      "address": "Plot 14, Shivaji Nagar, Pune 411005",
      "mobileLinked": true,
      "status": "ACTIVE"
    },
    {
      "aadhaar": "999941057657",
      "name": "SUNITA SHARMA",
      "dob": "1989-03-14",
      "gender": "FEMALE",
      "address": "21-A, Civil Lines, Jaipur 302006",
      "mobileLinked": true,
      "status": "ACTIVE"
    },
    {
      "aadhaar": "999941057782",
      "name": "KARAN TIWARI",
      "dob": "1994-09-28",
      "gender": "MALE",
      "address": "H-19, Gomti Nagar, Lucknow 226010",
      "mobileLinked": true,
      "status": "ACTIVE"
    },
    {
      "aadhaar": "999941057912",
      "name": "RITU YADAV",
      "dob": "1996-12-12",
      "gender": "FEMALE",
      "address": "B-9, Sector 14, Gurugram 122001",
      "mobileLinked": true,
      "status": "ACTIVE"
    },
    {
      "aadhaar": "999941058045",
      "name": "CHIRAG JOSHI",
      "dob": "1991-06-03",
      "gender": "MALE",
      "address": "45, Alkapuri, Vadodara 390007",
      "mobileLinked": true,
      "status": "ACTIVE"
    },
    {
      "aadhaar": "999941058176",
      "name": "SWATI SINGH",
      "dob": "1993-05-25",
      "gender": "FEMALE",
      "address": "70, Kankarbagh, Patna 800020",
      "mobileLinked": true,
      "status": "ACTIVE"
    },
    {
      "aadhaar": "999941058304",
      "name": "MOHIT MEHTA",
      "dob": "1987-02-18",
      "gender": "MALE",
      "address": "Flat 5A, Marine Drive, Mumbai 400020",
      "mobileLinked": true,
      "status": "ACTIVE"
    },
    {
      "aadhaar": "999941058434",
      "name": "CHETAN CHOUDHARY",
      "dob": "1984-10-30",
      "gender": "MALE",
      "address": "15, Shastri Nagar, Jodhpur 342003",
      "mobileLinked": true,
      "status": "ACTIVE"
    },
    {
      "aadhaar": "999941058565",
      "name": "SANDEEP DUBEY",
      "dob": "1990-08-08",
      "gender": "MALE",
      "address": "82, Pandu Nagar, Kanpur 208005",
      "mobileLinked": true,
      "status": "ACTIVE"
    },
    {
      "aadhaar": "999941058698",
      "name": "ROHIT RAWAT",
      "dob": "1995-04-17",
      "gender": "MALE",
      "address": "Rajpur Road, Dehradun 248001",
      "mobileLinked": true,
      "status": "ACTIVE"
    },
    {
      "aadhaar": "999941058826",
      "name": "GAURAV NEGI",
      "dob": "1993-01-21",
      "gender": "MALE",
      "address": "Mall Road, Shimla 171001",
      "mobileLinked": true,
      "status": "ACTIVE"
    },
    {
      "aadhaar": "999941058959",
      "name": "MEENAKSHI OJHA",
      "dob": "1992-09-11",
      "gender": "FEMALE",
      "address": "Lanka, Varanasi 221005",
      "mobileLinked": true,
      "status": "ACTIVE"
    },
    {
      "aadhaar": "999941059086",
      "name": "NIKHIL PANDEY",
      "dob": "1991-07-04",
      "gender": "MALE",
      "address": "George Town, Prayagraj 211002",
      "mobileLinked": true,
      "status": "ACTIVE"
    },
    {
      "aadhaar": "999941059212",
      "name": "MANISH QURESHI",
      "dob": "1986-06-16",
      "gender": "MALE",
      "address": "Banjara Hills, Hyderabad 500034",
      "mobileLinked": true,
      "status": "ACTIVE"
    },
    {
      "aadhaar": "999941059347",
      "name": "SHALINI RATHORE",
      "dob": "1997-03-29",
      "gender": "FEMALE",
      "address": "C-Scheme, Jaipur 302001",
      "mobileLinked": true,
      "status": "ACTIVE"
    },
    {
      "aadhaar": "999941059470",
      "name": "KAVITA SAXENA",
      "dob": "1990-11-07",
      "gender": "FEMALE",
      "address": "Arera Colony, Bhopal 462016",
      "mobileLinked": true,
      "status": "ACTIVE"
    },
    {
      "aadhaar": "999941059600",
      "name": "ANKIT TRIPATHI",
      "dob": "1994-05-13",
      "gender": "MALE",
      "address": "Boring Road, Patna 800001",
      "mobileLinked": true,
      "status": "ACTIVE"
    },
    {
      "aadhaar": "999941059732",
      "name": "BHAVNA UPADHYAY",
      "dob": "1995-08-24",
      "gender": "FEMALE",
      "address": "Koramangala, Bangalore 560034",
      "mobileLinked": true,
      "status": "ACTIVE"
    },
    {
      "aadhaar": "999941059869",
      "name": "SAURABH VERMA",
      "dob": "1992-02-09",
      "gender": "MALE",
      "address": "Indira Nagar, Lucknow 226016",
      "mobileLinked": true,
      "status": "ACTIVE"
    },
    {
      "aadhaar": "999941059998",
      "name": "SUMIT WAGHMARE",
      "dob": "1989-10-15",
      "gender": "MALE",
      "address": "Dharampeth, Nagpur 440010",
      "mobileLinked": true,
      "status": "ACTIVE"
    },
    {
      "aadhaar": "999941060121",
      "name": "NEELAM XAVIER",
      "dob": "1991-12-01",
      "gender": "FEMALE",
      "address": "Panjim, Goa 403001",
      "mobileLinked": true,
      "status": "ACTIVE"
    },
    {
      "aadhaar": "999941060258",
      "name": "ANANYA YADAV",
      "dob": "1996-09-20",
      "gender": "FEMALE",
      "address": "Kalyani Nagar, Pune 411006",
      "mobileLinked": true,
      "status": "ACTIVE"
    },
    {
      "aadhaar": "999941060386",
      "name": "SNEHA ZAGADE",
      "dob": "1993-04-06",
      "gender": "FEMALE",
      "address": "Vashi, Navi Mumbai 400703",
      "mobileLinked": true,
      "status": "ACTIVE"
    },
    {
      "aadhaar": "999941060514",
      "name": "KISHORE BANSAL",
      "dob": "1983-07-14",
      "gender": "MALE",
      "address": "Sector 17, Chandigarh 160017",
      "mobileLinked": true,
      "status": "ACTIVE"
    },
    {
      "aadhaar": "999941060648",
      "name": "GEETA BHATIA",
      "dob": "1988-02-27",
      "gender": "FEMALE",
      "address": "Lajpat Nagar, New Delhi 110024",
      "mobileLinked": true,
      "status": "ACTIVE"
    },
    {
      "aadhaar": "999941060774",
      "name": "DEEPAK CHAWLA",
      "dob": "1990-08-19",
      "gender": "MALE",
      "address": "Model Town, Ludhiana 141002",
      "mobileLinked": true,
      "status": "ACTIVE"
    },
    {
      "aadhaar": "999941060902",
      "name": "TARUN DIXIT",
      "dob": "1992-03-03",
      "gender": "MALE",
      "address": "Sanjay Place, Agra 282002",
      "mobileLinked": true,
      "status": "ACTIVE"
    },
    {
      "aadhaar": "999941061033",
      "name": "AJEET EKKA",
      "dob": "1991-10-22",
      "gender": "MALE",
      "address": "Morabadi, Ranchi 834008",
      "mobileLinked": true,
      "status": "ACTIVE"
    },
    {
      "aadhaar": "999941061165",
      "name": "SIMRAN FAROOQUI",
      "dob": "1994-05-11",
      "gender": "FEMALE",
      "address": "Sadhu Vaswani Road, Rajkot 360005",
      "mobileLinked": true,
      "status": "ACTIVE"
    },
    {
      "aadhaar": "999941061290",
      "name": "ALOK GARG",
      "dob": "1986-01-16",
      "gender": "MALE",
      "address": "Rajnagar, Ghaziabad 201002",
      "mobileLinked": true,
      "status": "ACTIVE"
    },
    {
      "aadhaar": "999941061424",
      "name": "RAHUL HARIKRISHNAN",
      "dob": "1993-06-28",
      "gender": "MALE",
      "address": "Kowdiar, Thiruvananthapuram 695003",
      "mobileLinked": true,
      "status": "ACTIVE"
    },
    {
      "aadhaar": "999941061550",
      "name": "SHIKHA IYER",
      "dob": "1995-12-09",
      "gender": "FEMALE",
      "address": "Mylapore, Chennai 600004",
      "mobileLinked": true,
      "status": "ACTIVE"
    },
    {
      "aadhaar": "999941061681",
      "name": "NITIN JAIN",
      "dob": "1987-07-31",
      "gender": "MALE",
      "address": "Palasia, Indore 452001",
      "mobileLinked": true,
      "status": "ACTIVE"
    },
    {
      "aadhaar": "999941061815",
      "name": "KAMAL KAUSHIK",
      "dob": "1991-03-18",
      "gender": "MALE",
      "address": "Vaishali Nagar, Jaipur 302021",
      "mobileLinked": true,
      "status": "ACTIVE"
    },
    {
      "aadhaar": "999941061940",
      "name": "LAKSHMI LOHIA",
      "dob": "1992-09-25",
      "gender": "FEMALE",
      "address": "Salt Lake, Kolkata 700064",
      "mobileLinked": true,
      "status": "ACTIVE"
    },
    {
      "aadhaar": "999941062074",
      "name": "MADHAVI MISHRA",
      "dob": "1989-04-12",
      "gender": "FEMALE",
      "address": "Ashok Nagar, Ranchi 834002",
      "mobileLinked": true,
      "status": "ACTIVE"
    },
    {
      "aadhaar": "999941062205",
      "name": "NAVEEN NAGAR",
      "dob": "1994-08-05",
      "gender": "MALE",
      "address": "Mansarovar, Jaipur 302020",
      "mobileLinked": true,
      "status": "ACTIVE"
    },
    {
      "aadhaar": "999941062331",
      "name": "OMKAR OBEROI",
      "dob": "1985-11-17",
      "gender": "MALE",
      "address": "Jubilee Hills, Hyderabad 500033",
      "mobileLinked": true,
      "status": "ACTIVE"
    }
  ],
  "university": [
    {
      "rollNo": "2021CS8901",
      "name": "PRIYA VERMA",
      "university": "Rajiv Gandhi Technical University, Bhopal",
      "course": "B.Tech (Computer Science & Engineering)",
      "year": 2024,
      "semester": "VI",
      "subjects": [
        {
          "code": "CS601",
          "name": "Data Structures & Algorithms",
          "marks": 84,
          "max": 100
        },
        {
          "code": "CS602",
          "name": "Operating Systems",
          "marks": 79,
          "max": 100
        },
        {
          "code": "CS603",
          "name": "Blockchain Technologies",
          "marks": 92,
          "max": 100
        },
        {
          "code": "CS604",
          "name": "Computer Networks",
          "marks": 86,
          "max": 100
        },
        {
          "code": "CS605",
          "name": "Software Engineering",
          "marks": 89,
          "max": 100
        }
      ],
      "totalMarks": 430,
      "maxMarks": 500,
      "percentage": 86.0,
      "cgpa": 8.6,
      "grade": "A+",
      "division": "FIRST WITH DISTINCTION",
      "certificateNo": "RGTU-2024-CS-8901",
      "status": "VERIFIED"
    },
    {
      "rollNo": "2020ME4412",
      "name": "RAJESH KUMAR SHARMA",
      "university": "Rajiv Gandhi Technical University, Bhopal",
      "course": "B.Tech (Computer Science & Engineering)",
      "year": 2024,
      "semester": "VI",
      "subjects": [
        {
          "code": "SUB601",
          "name": "Advanced Subject I",
          "marks": 81,
          "max": 100
        },
        {
          "code": "SUB602",
          "name": "Core Engineering II",
          "marks": 74,
          "max": 100
        },
        {
          "code": "SUB603",
          "name": "Applied Systems III",
          "marks": 88,
          "max": 100
        },
        {
          "code": "SUB604",
          "name": "Elective Domain IV",
          "marks": 80,
          "max": 100
        },
        {
          "code": "SUB605",
          "name": "Project & Practical V",
          "marks": 85,
          "max": 100
        }
      ],
      "totalMarks": 408,
      "maxMarks": 500,
      "percentage": 81.6,
      "cgpa": 8.2,
      "grade": "A",
      "division": "FIRST WITH DISTINCTION",
      "certificateNo": "Raji-2024-ME4412",
      "status": "VERIFIED"
    },
    {
      "rollNo": "2019IT1102",
      "name": "AMIT GUPTA",
      "university": "University of Delhi",
      "course": "B.Tech (Information Technology)",
      "year": 2023,
      "semester": "VI",
      "subjects": [
        {
          "code": "SUB601",
          "name": "Advanced Subject I",
          "marks": 90,
          "max": 100
        },
        {
          "code": "SUB602",
          "name": "Core Engineering II",
          "marks": 88,
          "max": 100
        },
        {
          "code": "SUB603",
          "name": "Applied Systems III",
          "marks": 85,
          "max": 100
        },
        {
          "code": "SUB604",
          "name": "Elective Domain IV",
          "marks": 92,
          "max": 100
        },
        {
          "code": "SUB605",
          "name": "Project & Practical V",
          "marks": 87,
          "max": 100
        }
      ],
      "totalMarks": 442,
      "maxMarks": 500,
      "percentage": 88.4,
      "cgpa": 8.8,
      "grade": "A+",
      "division": "FIRST WITH DISTINCTION",
      "certificateNo": "Univ-2023-IT1102",
      "status": "VERIFIED"
    },
    {
      "rollNo": "2021EC3304",
      "name": "NEHA PATEL",
      "university": "Anna University, Chennai",
      "course": "B.Tech (Electronics & Communication)",
      "year": 2025,
      "semester": "VI",
      "subjects": [
        {
          "code": "SUB601",
          "name": "Advanced Subject I",
          "marks": 78,
          "max": 100
        },
        {
          "code": "SUB602",
          "name": "Core Engineering II",
          "marks": 82,
          "max": 100
        },
        {
          "code": "SUB603",
          "name": "Applied Systems III",
          "marks": 80,
          "max": 100
        },
        {
          "code": "SUB604",
          "name": "Elective Domain IV",
          "marks": 79,
          "max": 100
        },
        {
          "code": "SUB605",
          "name": "Project & Practical V",
          "marks": 81,
          "max": 100
        }
      ],
      "totalMarks": 400,
      "maxMarks": 500,
      "percentage": 80.0,
      "cgpa": 8.0,
      "grade": "A",
      "division": "FIRST WITH DISTINCTION",
      "certificateNo": "Anna-2025-EC3304",
      "status": "VERIFIED"
    },
    {
      "rollNo": "2018CS5519",
      "name": "MANOJ DESHMUKH",
      "university": "University of Mumbai",
      "course": "B.Tech (Computer Science & Engineering)",
      "year": 2022,
      "semester": "VI",
      "subjects": [
        {
          "code": "SUB601",
          "name": "Advanced Subject I",
          "marks": 85,
          "max": 100
        },
        {
          "code": "SUB602",
          "name": "Core Engineering II",
          "marks": 87,
          "max": 100
        },
        {
          "code": "SUB603",
          "name": "Applied Systems III",
          "marks": 89,
          "max": 100
        },
        {
          "code": "SUB604",
          "name": "Elective Domain IV",
          "marks": 84,
          "max": 100
        },
        {
          "code": "SUB605",
          "name": "Project & Practical V",
          "marks": 86,
          "max": 100
        }
      ],
      "totalMarks": 431,
      "maxMarks": 500,
      "percentage": 86.2,
      "cgpa": 8.6,
      "grade": "A+",
      "division": "FIRST WITH DISTINCTION",
      "certificateNo": "Univ-2022-CS5519",
      "status": "VERIFIED"
    },
    {
      "rollNo": "2020BC2210",
      "name": "SUNITA SHARMA",
      "university": "Visvesvaraya Technological University, Belagavi",
      "course": "Bachelor of Commerce (Honours)",
      "year": 2023,
      "semester": "VI",
      "subjects": [
        {
          "code": "SUB601",
          "name": "Advanced Subject I",
          "marks": 75,
          "max": 100
        },
        {
          "code": "SUB602",
          "name": "Core Engineering II",
          "marks": 78,
          "max": 100
        },
        {
          "code": "SUB603",
          "name": "Applied Systems III",
          "marks": 80,
          "max": 100
        },
        {
          "code": "SUB604",
          "name": "Elective Domain IV",
          "marks": 72,
          "max": 100
        },
        {
          "code": "SUB605",
          "name": "Project & Practical V",
          "marks": 79,
          "max": 100
        }
      ],
      "totalMarks": 384,
      "maxMarks": 500,
      "percentage": 76.8,
      "cgpa": 7.7,
      "grade": "A",
      "division": "FIRST DIVISION",
      "certificateNo": "Visv-2023-BC2210",
      "status": "VERIFIED"
    },
    {
      "rollNo": "2021MB9901",
      "name": "KARAN TIWARI",
      "university": "Dr. A.P.J. Abdul Kalam Technical University, Lucknow",
      "course": "Master of Business Administration",
      "year": 2023,
      "semester": "VI",
      "subjects": [
        {
          "code": "SUB601",
          "name": "Advanced Subject I",
          "marks": 88,
          "max": 100
        },
        {
          "code": "SUB602",
          "name": "Core Engineering II",
          "marks": 91,
          "max": 100
        },
        {
          "code": "SUB603",
          "name": "Applied Systems III",
          "marks": 84,
          "max": 100
        },
        {
          "code": "SUB604",
          "name": "Elective Domain IV",
          "marks": 86,
          "max": 100
        },
        {
          "code": "SUB605",
          "name": "Project & Practical V",
          "marks": 90,
          "max": 100
        }
      ],
      "totalMarks": 439,
      "maxMarks": 500,
      "percentage": 87.8,
      "cgpa": 8.8,
      "grade": "A+",
      "division": "FIRST WITH DISTINCTION",
      "certificateNo": "Dr.-2023-MB9901",
      "status": "VERIFIED"
    },
    {
      "rollNo": "2022CS7714",
      "name": "RITU YADAV",
      "university": "Savitribai Phule Pune University",
      "course": "B.Tech (Computer Science & Engineering)",
      "year": 2026,
      "semester": "VI",
      "subjects": [
        {
          "code": "SUB601",
          "name": "Advanced Subject I",
          "marks": 92,
          "max": 100
        },
        {
          "code": "SUB602",
          "name": "Core Engineering II",
          "marks": 90,
          "max": 100
        },
        {
          "code": "SUB603",
          "name": "Applied Systems III",
          "marks": 94,
          "max": 100
        },
        {
          "code": "SUB604",
          "name": "Elective Domain IV",
          "marks": 88,
          "max": 100
        },
        {
          "code": "SUB605",
          "name": "Project & Practical V",
          "marks": 91,
          "max": 100
        }
      ],
      "totalMarks": 455,
      "maxMarks": 500,
      "percentage": 91.0,
      "cgpa": 9.1,
      "grade": "A+",
      "division": "FIRST WITH DISTINCTION",
      "certificateNo": "Savi-2026-CS7714",
      "status": "VERIFIED"
    },
    {
      "rollNo": "2020IT3319",
      "name": "CHIRAG JOSHI",
      "university": "Rajiv Gandhi Technical University, Bhopal",
      "course": "B.Tech (Information Technology)",
      "year": 2024,
      "semester": "VI",
      "subjects": [
        {
          "code": "SUB601",
          "name": "Advanced Subject I",
          "marks": 80,
          "max": 100
        },
        {
          "code": "SUB602",
          "name": "Core Engineering II",
          "marks": 83,
          "max": 100
        },
        {
          "code": "SUB603",
          "name": "Applied Systems III",
          "marks": 79,
          "max": 100
        },
        {
          "code": "SUB604",
          "name": "Elective Domain IV",
          "marks": 82,
          "max": 100
        },
        {
          "code": "SUB605",
          "name": "Project & Practical V",
          "marks": 81,
          "max": 100
        }
      ],
      "totalMarks": 405,
      "maxMarks": 500,
      "percentage": 81.0,
      "cgpa": 8.1,
      "grade": "A",
      "division": "FIRST WITH DISTINCTION",
      "certificateNo": "Raji-2024-IT3319",
      "status": "VERIFIED"
    },
    {
      "rollNo": "2021EC8820",
      "name": "SWATI SINGH",
      "university": "University of Delhi",
      "course": "B.Tech (Electronics & Communication)",
      "year": 2025,
      "semester": "VI",
      "subjects": [
        {
          "code": "SUB601",
          "name": "Advanced Subject I",
          "marks": 86,
          "max": 100
        },
        {
          "code": "SUB602",
          "name": "Core Engineering II",
          "marks": 89,
          "max": 100
        },
        {
          "code": "SUB603",
          "name": "Applied Systems III",
          "marks": 84,
          "max": 100
        },
        {
          "code": "SUB604",
          "name": "Elective Domain IV",
          "marks": 88,
          "max": 100
        },
        {
          "code": "SUB605",
          "name": "Project & Practical V",
          "marks": 87,
          "max": 100
        }
      ],
      "totalMarks": 434,
      "maxMarks": 500,
      "percentage": 86.8,
      "cgpa": 8.7,
      "grade": "A+",
      "division": "FIRST WITH DISTINCTION",
      "certificateNo": "Univ-2025-EC8820",
      "status": "VERIFIED"
    },
    {
      "rollNo": "2019CS1209",
      "name": "MOHIT MEHTA",
      "university": "Anna University, Chennai",
      "course": "B.Tech (Computer Science & Engineering)",
      "year": 2023,
      "semester": "VI",
      "subjects": [
        {
          "code": "SUB601",
          "name": "Advanced Subject I",
          "marks": 79,
          "max": 100
        },
        {
          "code": "SUB602",
          "name": "Core Engineering II",
          "marks": 81,
          "max": 100
        },
        {
          "code": "SUB603",
          "name": "Applied Systems III",
          "marks": 83,
          "max": 100
        },
        {
          "code": "SUB604",
          "name": "Elective Domain IV",
          "marks": 80,
          "max": 100
        },
        {
          "code": "SUB605",
          "name": "Project & Practical V",
          "marks": 82,
          "max": 100
        }
      ],
      "totalMarks": 405,
      "maxMarks": 500,
      "percentage": 81.0,
      "cgpa": 8.1,
      "grade": "A",
      "division": "FIRST WITH DISTINCTION",
      "certificateNo": "Anna-2023-CS1209",
      "status": "VERIFIED"
    },
    {
      "rollNo": "2020ME6611",
      "name": "CHETAN CHOUDHARY",
      "university": "University of Mumbai",
      "course": "B.Tech (Computer Science & Engineering)",
      "year": 2024,
      "semester": "VI",
      "subjects": [
        {
          "code": "SUB601",
          "name": "Advanced Subject I",
          "marks": 77,
          "max": 100
        },
        {
          "code": "SUB602",
          "name": "Core Engineering II",
          "marks": 75,
          "max": 100
        },
        {
          "code": "SUB603",
          "name": "Applied Systems III",
          "marks": 80,
          "max": 100
        },
        {
          "code": "SUB604",
          "name": "Elective Domain IV",
          "marks": 78,
          "max": 100
        },
        {
          "code": "SUB605",
          "name": "Project & Practical V",
          "marks": 76,
          "max": 100
        }
      ],
      "totalMarks": 386,
      "maxMarks": 500,
      "percentage": 77.2,
      "cgpa": 7.7,
      "grade": "A",
      "division": "FIRST DIVISION",
      "certificateNo": "Univ-2024-ME6611",
      "status": "VERIFIED"
    },
    {
      "rollNo": "2021CS4402",
      "name": "SANDEEP DUBEY",
      "university": "Visvesvaraya Technological University, Belagavi",
      "course": "B.Tech (Computer Science & Engineering)",
      "year": 2025,
      "semester": "VI",
      "subjects": [
        {
          "code": "SUB601",
          "name": "Advanced Subject I",
          "marks": 89,
          "max": 100
        },
        {
          "code": "SUB602",
          "name": "Core Engineering II",
          "marks": 91,
          "max": 100
        },
        {
          "code": "SUB603",
          "name": "Applied Systems III",
          "marks": 87,
          "max": 100
        },
        {
          "code": "SUB604",
          "name": "Elective Domain IV",
          "marks": 90,
          "max": 100
        },
        {
          "code": "SUB605",
          "name": "Project & Practical V",
          "marks": 88,
          "max": 100
        }
      ],
      "totalMarks": 445,
      "maxMarks": 500,
      "percentage": 89.0,
      "cgpa": 8.9,
      "grade": "A+",
      "division": "FIRST WITH DISTINCTION",
      "certificateNo": "Visv-2025-CS4402",
      "status": "VERIFIED"
    },
    {
      "rollNo": "2022IT5511",
      "name": "ROHIT RAWAT",
      "university": "Dr. A.P.J. Abdul Kalam Technical University, Lucknow",
      "course": "B.Tech (Information Technology)",
      "year": 2026,
      "semester": "VI",
      "subjects": [
        {
          "code": "SUB601",
          "name": "Advanced Subject I",
          "marks": 84,
          "max": 100
        },
        {
          "code": "SUB602",
          "name": "Core Engineering II",
          "marks": 86,
          "max": 100
        },
        {
          "code": "SUB603",
          "name": "Applied Systems III",
          "marks": 85,
          "max": 100
        },
        {
          "code": "SUB604",
          "name": "Elective Domain IV",
          "marks": 83,
          "max": 100
        },
        {
          "code": "SUB605",
          "name": "Project & Practical V",
          "marks": 87,
          "max": 100
        }
      ],
      "totalMarks": 425,
      "maxMarks": 500,
      "percentage": 85.0,
      "cgpa": 8.5,
      "grade": "A+",
      "division": "FIRST WITH DISTINCTION",
      "certificateNo": "Dr.-2026-IT5511",
      "status": "VERIFIED"
    },
    {
      "rollNo": "2020EC7710",
      "name": "GAURAV NEGI",
      "university": "Savitribai Phule Pune University",
      "course": "B.Tech (Electronics & Communication)",
      "year": 2024,
      "semester": "VI",
      "subjects": [
        {
          "code": "SUB601",
          "name": "Advanced Subject I",
          "marks": 81,
          "max": 100
        },
        {
          "code": "SUB602",
          "name": "Core Engineering II",
          "marks": 79,
          "max": 100
        },
        {
          "code": "SUB603",
          "name": "Applied Systems III",
          "marks": 82,
          "max": 100
        },
        {
          "code": "SUB604",
          "name": "Elective Domain IV",
          "marks": 80,
          "max": 100
        },
        {
          "code": "SUB605",
          "name": "Project & Practical V",
          "marks": 83,
          "max": 100
        }
      ],
      "totalMarks": 405,
      "maxMarks": 500,
      "percentage": 81.0,
      "cgpa": 8.1,
      "grade": "A",
      "division": "FIRST WITH DISTINCTION",
      "certificateNo": "Savi-2024-EC7710",
      "status": "VERIFIED"
    },
    {
      "rollNo": "2021BC8801",
      "name": "MEENAKSHI OJHA",
      "university": "Rajiv Gandhi Technical University, Bhopal",
      "course": "Bachelor of Commerce (Honours)",
      "year": 2024,
      "semester": "VI",
      "subjects": [
        {
          "code": "SUB601",
          "name": "Advanced Subject I",
          "marks": 88,
          "max": 100
        },
        {
          "code": "SUB602",
          "name": "Core Engineering II",
          "marks": 90,
          "max": 100
        },
        {
          "code": "SUB603",
          "name": "Applied Systems III",
          "marks": 86,
          "max": 100
        },
        {
          "code": "SUB604",
          "name": "Elective Domain IV",
          "marks": 89,
          "max": 100
        },
        {
          "code": "SUB605",
          "name": "Project & Practical V",
          "marks": 91,
          "max": 100
        }
      ],
      "totalMarks": 444,
      "maxMarks": 500,
      "percentage": 88.8,
      "cgpa": 8.9,
      "grade": "A+",
      "division": "FIRST WITH DISTINCTION",
      "certificateNo": "Raji-2024-BC8801",
      "status": "VERIFIED"
    },
    {
      "rollNo": "2019CS3312",
      "name": "NIKHIL PANDEY",
      "university": "University of Delhi",
      "course": "B.Tech (Computer Science & Engineering)",
      "year": 2023,
      "semester": "VI",
      "subjects": [
        {
          "code": "SUB601",
          "name": "Advanced Subject I",
          "marks": 83,
          "max": 100
        },
        {
          "code": "SUB602",
          "name": "Core Engineering II",
          "marks": 85,
          "max": 100
        },
        {
          "code": "SUB603",
          "name": "Applied Systems III",
          "marks": 82,
          "max": 100
        },
        {
          "code": "SUB604",
          "name": "Elective Domain IV",
          "marks": 87,
          "max": 100
        },
        {
          "code": "SUB605",
          "name": "Project & Practical V",
          "marks": 84,
          "max": 100
        }
      ],
      "totalMarks": 421,
      "maxMarks": 500,
      "percentage": 84.2,
      "cgpa": 8.4,
      "grade": "A",
      "division": "FIRST WITH DISTINCTION",
      "certificateNo": "Univ-2023-CS3312",
      "status": "VERIFIED"
    },
    {
      "rollNo": "2020IT9914",
      "name": "MANISH QURESHI",
      "university": "Anna University, Chennai",
      "course": "B.Tech (Information Technology)",
      "year": 2024,
      "semester": "VI",
      "subjects": [
        {
          "code": "SUB601",
          "name": "Advanced Subject I",
          "marks": 78,
          "max": 100
        },
        {
          "code": "SUB602",
          "name": "Core Engineering II",
          "marks": 80,
          "max": 100
        },
        {
          "code": "SUB603",
          "name": "Applied Systems III",
          "marks": 77,
          "max": 100
        },
        {
          "code": "SUB604",
          "name": "Elective Domain IV",
          "marks": 81,
          "max": 100
        },
        {
          "code": "SUB605",
          "name": "Project & Practical V",
          "marks": 79,
          "max": 100
        }
      ],
      "totalMarks": 395,
      "maxMarks": 500,
      "percentage": 79.0,
      "cgpa": 7.9,
      "grade": "A",
      "division": "FIRST DIVISION",
      "certificateNo": "Anna-2024-IT9914",
      "status": "VERIFIED"
    },
    {
      "rollNo": "2021CS6618",
      "name": "SHALINI RATHORE",
      "university": "University of Mumbai",
      "course": "B.Tech (Computer Science & Engineering)",
      "year": 2025,
      "semester": "VI",
      "subjects": [
        {
          "code": "SUB601",
          "name": "Advanced Subject I",
          "marks": 91,
          "max": 100
        },
        {
          "code": "SUB602",
          "name": "Core Engineering II",
          "marks": 93,
          "max": 100
        },
        {
          "code": "SUB603",
          "name": "Applied Systems III",
          "marks": 89,
          "max": 100
        },
        {
          "code": "SUB604",
          "name": "Elective Domain IV",
          "marks": 94,
          "max": 100
        },
        {
          "code": "SUB605",
          "name": "Project & Practical V",
          "marks": 92,
          "max": 100
        }
      ],
      "totalMarks": 459,
      "maxMarks": 500,
      "percentage": 91.8,
      "cgpa": 9.2,
      "grade": "A+",
      "division": "FIRST WITH DISTINCTION",
      "certificateNo": "Univ-2025-CS6618",
      "status": "VERIFIED"
    },
    {
      "rollNo": "2022EC2209",
      "name": "KAVITA SAXENA",
      "university": "Visvesvaraya Technological University, Belagavi",
      "course": "B.Tech (Electronics & Communication)",
      "year": 2026,
      "semester": "VI",
      "subjects": [
        {
          "code": "SUB601",
          "name": "Advanced Subject I",
          "marks": 85,
          "max": 100
        },
        {
          "code": "SUB602",
          "name": "Core Engineering II",
          "marks": 87,
          "max": 100
        },
        {
          "code": "SUB603",
          "name": "Applied Systems III",
          "marks": 86,
          "max": 100
        },
        {
          "code": "SUB604",
          "name": "Elective Domain IV",
          "marks": 84,
          "max": 100
        },
        {
          "code": "SUB605",
          "name": "Project & Practical V",
          "marks": 88,
          "max": 100
        }
      ],
      "totalMarks": 430,
      "maxMarks": 500,
      "percentage": 86.0,
      "cgpa": 8.6,
      "grade": "A+",
      "division": "FIRST WITH DISTINCTION",
      "certificateNo": "Visv-2026-EC2209",
      "status": "VERIFIED"
    },
    {
      "rollNo": "2020ME1105",
      "name": "ANKIT TRIPATHI",
      "university": "Dr. A.P.J. Abdul Kalam Technical University, Lucknow",
      "course": "B.Tech (Computer Science & Engineering)",
      "year": 2024,
      "semester": "VI",
      "subjects": [
        {
          "code": "SUB601",
          "name": "Advanced Subject I",
          "marks": 76,
          "max": 100
        },
        {
          "code": "SUB602",
          "name": "Core Engineering II",
          "marks": 78,
          "max": 100
        },
        {
          "code": "SUB603",
          "name": "Applied Systems III",
          "marks": 80,
          "max": 100
        },
        {
          "code": "SUB604",
          "name": "Elective Domain IV",
          "marks": 77,
          "max": 100
        },
        {
          "code": "SUB605",
          "name": "Project & Practical V",
          "marks": 79,
          "max": 100
        }
      ],
      "totalMarks": 390,
      "maxMarks": 500,
      "percentage": 78.0,
      "cgpa": 7.8,
      "grade": "A",
      "division": "FIRST DIVISION",
      "certificateNo": "Dr.-2024-ME1105",
      "status": "VERIFIED"
    },
    {
      "rollNo": "2021CS9912",
      "name": "BHAVNA UPADHYAY",
      "university": "Savitribai Phule Pune University",
      "course": "B.Tech (Computer Science & Engineering)",
      "year": 2025,
      "semester": "VI",
      "subjects": [
        {
          "code": "SUB601",
          "name": "Advanced Subject I",
          "marks": 90,
          "max": 100
        },
        {
          "code": "SUB602",
          "name": "Core Engineering II",
          "marks": 88,
          "max": 100
        },
        {
          "code": "SUB603",
          "name": "Applied Systems III",
          "marks": 92,
          "max": 100
        },
        {
          "code": "SUB604",
          "name": "Elective Domain IV",
          "marks": 89,
          "max": 100
        },
        {
          "code": "SUB605",
          "name": "Project & Practical V",
          "marks": 91,
          "max": 100
        }
      ],
      "totalMarks": 450,
      "maxMarks": 500,
      "percentage": 90.0,
      "cgpa": 9.0,
      "grade": "A+",
      "division": "FIRST WITH DISTINCTION",
      "certificateNo": "Savi-2025-CS9912",
      "status": "VERIFIED"
    },
    {
      "rollNo": "2019IT4415",
      "name": "SAURABH VERMA",
      "university": "Rajiv Gandhi Technical University, Bhopal",
      "course": "B.Tech (Information Technology)",
      "year": 2023,
      "semester": "VI",
      "subjects": [
        {
          "code": "SUB601",
          "name": "Advanced Subject I",
          "marks": 82,
          "max": 100
        },
        {
          "code": "SUB602",
          "name": "Core Engineering II",
          "marks": 84,
          "max": 100
        },
        {
          "code": "SUB603",
          "name": "Applied Systems III",
          "marks": 81,
          "max": 100
        },
        {
          "code": "SUB604",
          "name": "Elective Domain IV",
          "marks": 85,
          "max": 100
        },
        {
          "code": "SUB605",
          "name": "Project & Practical V",
          "marks": 83,
          "max": 100
        }
      ],
      "totalMarks": 415,
      "maxMarks": 500,
      "percentage": 83.0,
      "cgpa": 8.3,
      "grade": "A",
      "division": "FIRST WITH DISTINCTION",
      "certificateNo": "Raji-2023-IT4415",
      "status": "VERIFIED"
    },
    {
      "rollNo": "2020EC5519",
      "name": "SUMIT WAGHMARE",
      "university": "University of Delhi",
      "course": "B.Tech (Electronics & Communication)",
      "year": 2024,
      "semester": "VI",
      "subjects": [
        {
          "code": "SUB601",
          "name": "Advanced Subject I",
          "marks": 79,
          "max": 100
        },
        {
          "code": "SUB602",
          "name": "Core Engineering II",
          "marks": 81,
          "max": 100
        },
        {
          "code": "SUB603",
          "name": "Applied Systems III",
          "marks": 80,
          "max": 100
        },
        {
          "code": "SUB604",
          "name": "Elective Domain IV",
          "marks": 78,
          "max": 100
        },
        {
          "code": "SUB605",
          "name": "Project & Practical V",
          "marks": 82,
          "max": 100
        }
      ],
      "totalMarks": 400,
      "maxMarks": 500,
      "percentage": 80.0,
      "cgpa": 8.0,
      "grade": "A",
      "division": "FIRST WITH DISTINCTION",
      "certificateNo": "Univ-2024-EC5519",
      "status": "VERIFIED"
    },
    {
      "rollNo": "2021BC7712",
      "name": "NEELAM XAVIER",
      "university": "Anna University, Chennai",
      "course": "Bachelor of Commerce (Honours)",
      "year": 2024,
      "semester": "VI",
      "subjects": [
        {
          "code": "SUB601",
          "name": "Advanced Subject I",
          "marks": 87,
          "max": 100
        },
        {
          "code": "SUB602",
          "name": "Core Engineering II",
          "marks": 89,
          "max": 100
        },
        {
          "code": "SUB603",
          "name": "Applied Systems III",
          "marks": 85,
          "max": 100
        },
        {
          "code": "SUB604",
          "name": "Elective Domain IV",
          "marks": 88,
          "max": 100
        },
        {
          "code": "SUB605",
          "name": "Project & Practical V",
          "marks": 90,
          "max": 100
        }
      ],
      "totalMarks": 439,
      "maxMarks": 500,
      "percentage": 87.8,
      "cgpa": 8.8,
      "grade": "A+",
      "division": "FIRST WITH DISTINCTION",
      "certificateNo": "Anna-2024-BC7712",
      "status": "VERIFIED"
    },
    {
      "rollNo": "2022CS3301",
      "name": "ANANYA YADAV",
      "university": "University of Mumbai",
      "course": "B.Tech (Computer Science & Engineering)",
      "year": 2026,
      "semester": "VI",
      "subjects": [
        {
          "code": "SUB601",
          "name": "Advanced Subject I",
          "marks": 93,
          "max": 100
        },
        {
          "code": "SUB602",
          "name": "Core Engineering II",
          "marks": 91,
          "max": 100
        },
        {
          "code": "SUB603",
          "name": "Applied Systems III",
          "marks": 95,
          "max": 100
        },
        {
          "code": "SUB604",
          "name": "Elective Domain IV",
          "marks": 92,
          "max": 100
        },
        {
          "code": "SUB605",
          "name": "Project & Practical V",
          "marks": 94,
          "max": 100
        }
      ],
      "totalMarks": 465,
      "maxMarks": 500,
      "percentage": 93.0,
      "cgpa": 9.3,
      "grade": "A+",
      "division": "FIRST WITH DISTINCTION",
      "certificateNo": "Univ-2026-CS3301",
      "status": "VERIFIED"
    },
    {
      "rollNo": "2020IT2214",
      "name": "SNEHA ZAGADE",
      "university": "Visvesvaraya Technological University, Belagavi",
      "course": "B.Tech (Information Technology)",
      "year": 2024,
      "semester": "VI",
      "subjects": [
        {
          "code": "SUB601",
          "name": "Advanced Subject I",
          "marks": 84,
          "max": 100
        },
        {
          "code": "SUB602",
          "name": "Core Engineering II",
          "marks": 86,
          "max": 100
        },
        {
          "code": "SUB603",
          "name": "Applied Systems III",
          "marks": 83,
          "max": 100
        },
        {
          "code": "SUB604",
          "name": "Elective Domain IV",
          "marks": 87,
          "max": 100
        },
        {
          "code": "SUB605",
          "name": "Project & Practical V",
          "marks": 85,
          "max": 100
        }
      ],
      "totalMarks": 425,
      "maxMarks": 500,
      "percentage": 85.0,
      "cgpa": 8.5,
      "grade": "A+",
      "division": "FIRST WITH DISTINCTION",
      "certificateNo": "Visv-2024-IT2214",
      "status": "VERIFIED"
    },
    {
      "rollNo": "2019EC8810",
      "name": "KISHORE BANSAL",
      "university": "Dr. A.P.J. Abdul Kalam Technical University, Lucknow",
      "course": "B.Tech (Electronics & Communication)",
      "year": 2023,
      "semester": "VI",
      "subjects": [
        {
          "code": "SUB601",
          "name": "Advanced Subject I",
          "marks": 80,
          "max": 100
        },
        {
          "code": "SUB602",
          "name": "Core Engineering II",
          "marks": 82,
          "max": 100
        },
        {
          "code": "SUB603",
          "name": "Applied Systems III",
          "marks": 79,
          "max": 100
        },
        {
          "code": "SUB604",
          "name": "Elective Domain IV",
          "marks": 83,
          "max": 100
        },
        {
          "code": "SUB605",
          "name": "Project & Practical V",
          "marks": 81,
          "max": 100
        }
      ],
      "totalMarks": 405,
      "maxMarks": 500,
      "percentage": 81.0,
      "cgpa": 8.1,
      "grade": "A",
      "division": "FIRST WITH DISTINCTION",
      "certificateNo": "Dr.-2023-EC8810",
      "status": "VERIFIED"
    },
    {
      "rollNo": "2021CS1109",
      "name": "GEETA BHATIA",
      "university": "Savitribai Phule Pune University",
      "course": "B.Tech (Computer Science & Engineering)",
      "year": 2025,
      "semester": "VI",
      "subjects": [
        {
          "code": "SUB601",
          "name": "Advanced Subject I",
          "marks": 88,
          "max": 100
        },
        {
          "code": "SUB602",
          "name": "Core Engineering II",
          "marks": 90,
          "max": 100
        },
        {
          "code": "SUB603",
          "name": "Applied Systems III",
          "marks": 87,
          "max": 100
        },
        {
          "code": "SUB604",
          "name": "Elective Domain IV",
          "marks": 89,
          "max": 100
        },
        {
          "code": "SUB605",
          "name": "Project & Practical V",
          "marks": 91,
          "max": 100
        }
      ],
      "totalMarks": 445,
      "maxMarks": 500,
      "percentage": 89.0,
      "cgpa": 8.9,
      "grade": "A+",
      "division": "FIRST WITH DISTINCTION",
      "certificateNo": "Savi-2025-CS1109",
      "status": "VERIFIED"
    },
    {
      "rollNo": "2020ME3317",
      "name": "DEEPAK CHAWLA",
      "university": "Rajiv Gandhi Technical University, Bhopal",
      "course": "B.Tech (Computer Science & Engineering)",
      "year": 2024,
      "semester": "VI",
      "subjects": [
        {
          "code": "SUB601",
          "name": "Advanced Subject I",
          "marks": 77,
          "max": 100
        },
        {
          "code": "SUB602",
          "name": "Core Engineering II",
          "marks": 79,
          "max": 100
        },
        {
          "code": "SUB603",
          "name": "Applied Systems III",
          "marks": 81,
          "max": 100
        },
        {
          "code": "SUB604",
          "name": "Elective Domain IV",
          "marks": 78,
          "max": 100
        },
        {
          "code": "SUB605",
          "name": "Project & Practical V",
          "marks": 80,
          "max": 100
        }
      ],
      "totalMarks": 395,
      "maxMarks": 500,
      "percentage": 79.0,
      "cgpa": 7.9,
      "grade": "A",
      "division": "FIRST DIVISION",
      "certificateNo": "Raji-2024-ME3317",
      "status": "VERIFIED"
    },
    {
      "rollNo": "2022IT6619",
      "name": "TARUN DIXIT",
      "university": "University of Delhi",
      "course": "B.Tech (Information Technology)",
      "year": 2026,
      "semester": "VI",
      "subjects": [
        {
          "code": "SUB601",
          "name": "Advanced Subject I",
          "marks": 86,
          "max": 100
        },
        {
          "code": "SUB602",
          "name": "Core Engineering II",
          "marks": 88,
          "max": 100
        },
        {
          "code": "SUB603",
          "name": "Applied Systems III",
          "marks": 85,
          "max": 100
        },
        {
          "code": "SUB604",
          "name": "Elective Domain IV",
          "marks": 87,
          "max": 100
        },
        {
          "code": "SUB605",
          "name": "Project & Practical V",
          "marks": 89,
          "max": 100
        }
      ],
      "totalMarks": 435,
      "maxMarks": 500,
      "percentage": 87.0,
      "cgpa": 8.7,
      "grade": "A+",
      "division": "FIRST WITH DISTINCTION",
      "certificateNo": "Univ-2026-IT6619",
      "status": "VERIFIED"
    },
    {
      "rollNo": "2021EC4411",
      "name": "AJEET EKKA",
      "university": "Anna University, Chennai",
      "course": "B.Tech (Electronics & Communication)",
      "year": 2025,
      "semester": "VI",
      "subjects": [
        {
          "code": "SUB601",
          "name": "Advanced Subject I",
          "marks": 81,
          "max": 100
        },
        {
          "code": "SUB602",
          "name": "Core Engineering II",
          "marks": 83,
          "max": 100
        },
        {
          "code": "SUB603",
          "name": "Applied Systems III",
          "marks": 80,
          "max": 100
        },
        {
          "code": "SUB604",
          "name": "Elective Domain IV",
          "marks": 82,
          "max": 100
        },
        {
          "code": "SUB605",
          "name": "Project & Practical V",
          "marks": 84,
          "max": 100
        }
      ],
      "totalMarks": 410,
      "maxMarks": 500,
      "percentage": 82.0,
      "cgpa": 8.2,
      "grade": "A",
      "division": "FIRST WITH DISTINCTION",
      "certificateNo": "Anna-2025-EC4411",
      "status": "VERIFIED"
    },
    {
      "rollNo": "2020BC9915",
      "name": "SIMRAN FAROOQUI",
      "university": "University of Mumbai",
      "course": "Bachelor of Commerce (Honours)",
      "year": 2023,
      "semester": "VI",
      "subjects": [
        {
          "code": "SUB601",
          "name": "Advanced Subject I",
          "marks": 89,
          "max": 100
        },
        {
          "code": "SUB602",
          "name": "Core Engineering II",
          "marks": 91,
          "max": 100
        },
        {
          "code": "SUB603",
          "name": "Applied Systems III",
          "marks": 88,
          "max": 100
        },
        {
          "code": "SUB604",
          "name": "Elective Domain IV",
          "marks": 90,
          "max": 100
        },
        {
          "code": "SUB605",
          "name": "Project & Practical V",
          "marks": 92,
          "max": 100
        }
      ],
      "totalMarks": 450,
      "maxMarks": 500,
      "percentage": 90.0,
      "cgpa": 9.0,
      "grade": "A+",
      "division": "FIRST WITH DISTINCTION",
      "certificateNo": "Univ-2023-BC9915",
      "status": "VERIFIED"
    },
    {
      "rollNo": "2019CS5518",
      "name": "ALOK GARG",
      "university": "Visvesvaraya Technological University, Belagavi",
      "course": "B.Tech (Computer Science & Engineering)",
      "year": 2023,
      "semester": "VI",
      "subjects": [
        {
          "code": "SUB601",
          "name": "Advanced Subject I",
          "marks": 85,
          "max": 100
        },
        {
          "code": "SUB602",
          "name": "Core Engineering II",
          "marks": 87,
          "max": 100
        },
        {
          "code": "SUB603",
          "name": "Applied Systems III",
          "marks": 84,
          "max": 100
        },
        {
          "code": "SUB604",
          "name": "Elective Domain IV",
          "marks": 88,
          "max": 100
        },
        {
          "code": "SUB605",
          "name": "Project & Practical V",
          "marks": 86,
          "max": 100
        }
      ],
      "totalMarks": 430,
      "maxMarks": 500,
      "percentage": 86.0,
      "cgpa": 8.6,
      "grade": "A+",
      "division": "FIRST WITH DISTINCTION",
      "certificateNo": "Visv-2023-CS5518",
      "status": "VERIFIED"
    },
    {
      "rollNo": "2021IT7710",
      "name": "RAHUL HARIKRISHNAN",
      "university": "Dr. A.P.J. Abdul Kalam Technical University, Lucknow",
      "course": "B.Tech (Information Technology)",
      "year": 2025,
      "semester": "VI",
      "subjects": [
        {
          "code": "SUB601",
          "name": "Advanced Subject I",
          "marks": 83,
          "max": 100
        },
        {
          "code": "SUB602",
          "name": "Core Engineering II",
          "marks": 85,
          "max": 100
        },
        {
          "code": "SUB603",
          "name": "Applied Systems III",
          "marks": 82,
          "max": 100
        },
        {
          "code": "SUB604",
          "name": "Elective Domain IV",
          "marks": 86,
          "max": 100
        },
        {
          "code": "SUB605",
          "name": "Project & Practical V",
          "marks": 84,
          "max": 100
        }
      ],
      "totalMarks": 420,
      "maxMarks": 500,
      "percentage": 84.0,
      "cgpa": 8.4,
      "grade": "A",
      "division": "FIRST WITH DISTINCTION",
      "certificateNo": "Dr.-2025-IT7710",
      "status": "VERIFIED"
    },
    {
      "rollNo": "2022EC1104",
      "name": "SHIKHA IYER",
      "university": "Savitribai Phule Pune University",
      "course": "B.Tech (Electronics & Communication)",
      "year": 2026,
      "semester": "VI",
      "subjects": [
        {
          "code": "SUB601",
          "name": "Advanced Subject I",
          "marks": 92,
          "max": 100
        },
        {
          "code": "SUB602",
          "name": "Core Engineering II",
          "marks": 94,
          "max": 100
        },
        {
          "code": "SUB603",
          "name": "Applied Systems III",
          "marks": 91,
          "max": 100
        },
        {
          "code": "SUB604",
          "name": "Elective Domain IV",
          "marks": 93,
          "max": 100
        },
        {
          "code": "SUB605",
          "name": "Project & Practical V",
          "marks": 95,
          "max": 100
        }
      ],
      "totalMarks": 465,
      "maxMarks": 500,
      "percentage": 93.0,
      "cgpa": 9.3,
      "grade": "A+",
      "division": "FIRST WITH DISTINCTION",
      "certificateNo": "Savi-2026-EC1104",
      "status": "VERIFIED"
    },
    {
      "rollNo": "2020CS8816",
      "name": "NITIN JAIN",
      "university": "Rajiv Gandhi Technical University, Bhopal",
      "course": "B.Tech (Computer Science & Engineering)",
      "year": 2024,
      "semester": "VI",
      "subjects": [
        {
          "code": "SUB601",
          "name": "Advanced Subject I",
          "marks": 87,
          "max": 100
        },
        {
          "code": "SUB602",
          "name": "Core Engineering II",
          "marks": 89,
          "max": 100
        },
        {
          "code": "SUB603",
          "name": "Applied Systems III",
          "marks": 86,
          "max": 100
        },
        {
          "code": "SUB604",
          "name": "Elective Domain IV",
          "marks": 90,
          "max": 100
        },
        {
          "code": "SUB605",
          "name": "Project & Practical V",
          "marks": 88,
          "max": 100
        }
      ],
      "totalMarks": 440,
      "maxMarks": 500,
      "percentage": 88.0,
      "cgpa": 8.8,
      "grade": "A+",
      "division": "FIRST WITH DISTINCTION",
      "certificateNo": "Raji-2024-CS8816",
      "status": "VERIFIED"
    },
    {
      "rollNo": "2019ME2219",
      "name": "KAMAL KAUSHIK",
      "university": "University of Delhi",
      "course": "B.Tech (Computer Science & Engineering)",
      "year": 2023,
      "semester": "VI",
      "subjects": [
        {
          "code": "SUB601",
          "name": "Advanced Subject I",
          "marks": 78,
          "max": 100
        },
        {
          "code": "SUB602",
          "name": "Core Engineering II",
          "marks": 80,
          "max": 100
        },
        {
          "code": "SUB603",
          "name": "Applied Systems III",
          "marks": 77,
          "max": 100
        },
        {
          "code": "SUB604",
          "name": "Elective Domain IV",
          "marks": 81,
          "max": 100
        },
        {
          "code": "SUB605",
          "name": "Project & Practical V",
          "marks": 79,
          "max": 100
        }
      ],
      "totalMarks": 395,
      "maxMarks": 500,
      "percentage": 79.0,
      "cgpa": 7.9,
      "grade": "A",
      "division": "FIRST DIVISION",
      "certificateNo": "Univ-2023-ME2219",
      "status": "VERIFIED"
    },
    {
      "rollNo": "2021IT3315",
      "name": "LAKSHMI LOHIA",
      "university": "Anna University, Chennai",
      "course": "B.Tech (Information Technology)",
      "year": 2025,
      "semester": "VI",
      "subjects": [
        {
          "code": "SUB601",
          "name": "Advanced Subject I",
          "marks": 88,
          "max": 100
        },
        {
          "code": "SUB602",
          "name": "Core Engineering II",
          "marks": 90,
          "max": 100
        },
        {
          "code": "SUB603",
          "name": "Applied Systems III",
          "marks": 87,
          "max": 100
        },
        {
          "code": "SUB604",
          "name": "Elective Domain IV",
          "marks": 89,
          "max": 100
        },
        {
          "code": "SUB605",
          "name": "Project & Practical V",
          "marks": 91,
          "max": 100
        }
      ],
      "totalMarks": 445,
      "maxMarks": 500,
      "percentage": 89.0,
      "cgpa": 8.9,
      "grade": "A+",
      "division": "FIRST WITH DISTINCTION",
      "certificateNo": "Anna-2025-IT3315",
      "status": "VERIFIED"
    },
    {
      "rollNo": "2020EC6612",
      "name": "MADHAVI MISHRA",
      "university": "University of Mumbai",
      "course": "B.Tech (Electronics & Communication)",
      "year": 2024,
      "semester": "VI",
      "subjects": [
        {
          "code": "SUB601",
          "name": "Advanced Subject I",
          "marks": 84,
          "max": 100
        },
        {
          "code": "SUB602",
          "name": "Core Engineering II",
          "marks": 86,
          "max": 100
        },
        {
          "code": "SUB603",
          "name": "Applied Systems III",
          "marks": 83,
          "max": 100
        },
        {
          "code": "SUB604",
          "name": "Elective Domain IV",
          "marks": 85,
          "max": 100
        },
        {
          "code": "SUB605",
          "name": "Project & Practical V",
          "marks": 87,
          "max": 100
        }
      ],
      "totalMarks": 425,
      "maxMarks": 500,
      "percentage": 85.0,
      "cgpa": 8.5,
      "grade": "A+",
      "division": "FIRST WITH DISTINCTION",
      "certificateNo": "Univ-2024-EC6612",
      "status": "VERIFIED"
    },
    {
      "rollNo": "2022BC5511",
      "name": "NAVEEN NAGAR",
      "university": "Visvesvaraya Technological University, Belagavi",
      "course": "Bachelor of Commerce (Honours)",
      "year": 2025,
      "semester": "VI",
      "subjects": [
        {
          "code": "SUB601",
          "name": "Advanced Subject I",
          "marks": 82,
          "max": 100
        },
        {
          "code": "SUB602",
          "name": "Core Engineering II",
          "marks": 84,
          "max": 100
        },
        {
          "code": "SUB603",
          "name": "Applied Systems III",
          "marks": 81,
          "max": 100
        },
        {
          "code": "SUB604",
          "name": "Elective Domain IV",
          "marks": 83,
          "max": 100
        },
        {
          "code": "SUB605",
          "name": "Project & Practical V",
          "marks": 85,
          "max": 100
        }
      ],
      "totalMarks": 415,
      "maxMarks": 500,
      "percentage": 83.0,
      "cgpa": 8.3,
      "grade": "A",
      "division": "FIRST WITH DISTINCTION",
      "certificateNo": "Visv-2025-BC5511",
      "status": "VERIFIED"
    },
    {
      "rollNo": "2019MB7709",
      "name": "OMKAR OBEROI",
      "university": "Dr. A.P.J. Abdul Kalam Technical University, Lucknow",
      "course": "Master of Business Administration",
      "year": 2021,
      "semester": "VI",
      "subjects": [
        {
          "code": "SUB601",
          "name": "Advanced Subject I",
          "marks": 89,
          "max": 100
        },
        {
          "code": "SUB602",
          "name": "Core Engineering II",
          "marks": 91,
          "max": 100
        },
        {
          "code": "SUB603",
          "name": "Applied Systems III",
          "marks": 88,
          "max": 100
        },
        {
          "code": "SUB604",
          "name": "Elective Domain IV",
          "marks": 90,
          "max": 100
        },
        {
          "code": "SUB605",
          "name": "Project & Practical V",
          "marks": 92,
          "max": 100
        }
      ],
      "totalMarks": 450,
      "maxMarks": 500,
      "percentage": 90.0,
      "cgpa": 9.0,
      "grade": "A+",
      "division": "FIRST WITH DISTINCTION",
      "certificateNo": "Dr.-2021-MB7709",
      "status": "VERIFIED"
    }
  ]
};

const RegistryEngine = {
  currentTab: 'nsdl',

  getRegistries() {
    const stored = localStorage.getItem("trustchain_registries");
    return stored ? JSON.parse(stored) : SEED_REGISTRIES;
  },

  saveRegistries(data) {
    localStorage.setItem("trustchain_registries", JSON.stringify(data));
  },

  levenshtein(a, b) {
    const m = a.length, n = b.length;
    const d = [];
    for (let i = 0; i <= m; i++) d[i] = [i];
    for (let j = 0; j <= n; j++) d[0][j] = j;
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      }
    }
    return d[m][n];
  },

  stringSimilarity(s1, s2) {
    if (!s1 || !s2) return 0;
    const str1 = s1.toUpperCase().trim();
    const str2 = s2.toUpperCase().trim();
    if (str1 === str2) return 1.0;
    const maxLen = Math.max(str1.length, str2.length);
    if (maxLen === 0) return 1.0;
    const dist = this.levenshtein(str1, str2);
    return Math.max(0, (maxLen - dist) / maxLen);
  },

  async queryNSDL(panNumber, extractedName) {
    await new Promise(r => setTimeout(r, 450)); // Simulated API Latency
    const registries = this.getRegistries();
    const record = registries.nsdl.find(r => r.pan.toUpperCase() === panNumber.toUpperCase().trim());
    if (!record) {
      return { found: false, record: null, similarity: 0, reason: "PAN not found in NSDL master registry" };
    }
    const similarity = this.stringSimilarity(extractedName, record.name);
    return { 
      found: true, 
      record, 
      similarity, 
      reason: similarity > 0.8 ? "NSDL Record matched" : "Name mismatch in NSDL" 
    };
  },

  async queryUIDAI(aadhaarNumber, extractedName) {
    await new Promise(r => setTimeout(r, 450));
    const clean = aadhaarNumber.replace(/\s+/g, '');
    const registries = this.getRegistries();
    const record = registries.uidai.find(r => r.aadhaar.replace(/\s+/g, '') === clean);
    if (!record) {
      return { found: false, record: null, similarity: 0, reason: "Aadhaar not found in UIDAI registry" };
    }
    const similarity = this.stringSimilarity(extractedName, record.name);
    return { 
      found: true, 
      record, 
      similarity, 
      reason: similarity > 0.8 ? "UIDAI Record matched" : "Name mismatch in UIDAI" 
    };
  },

  async queryUniversity(rollNumber, extractedName) {
    await new Promise(r => setTimeout(r, 500));
    const clean = rollNumber.toUpperCase().trim();
    const registries = this.getRegistries();
    const record = registries.university.find(r => r.rollNo.toUpperCase().trim() === clean);
    if (!record) {
      return { found: false, record: null, similarity: 0, reason: "Roll Number not found in University Board records" };
    }
    const similarity = this.stringSimilarity(extractedName, record.name);
    return { 
      found: true, 
      record, 
      similarity, 
      reason: similarity > 0.8 ? "Academic Record matched" : "Student name mismatch" 
    };
  },

  switchTab(tabName) {
    this.currentTab = tabName;
    document.querySelectorAll('[id^="btn-reg-"]').forEach(btn => {
      btn.className = 'btn btn-outline btn-sm';
    });
    const activeBtn = document.getElementById(`btn-reg-${tabName}`);
    if (activeBtn) activeBtn.className = 'btn btn-primary btn-sm';
    this.renderTable();
  },

  renderTable() {
    const registries = this.getRegistries();
    const thead = document.getElementById('registry-thead');
    const tbody = document.getElementById('registry-tbody');
    if (!thead || !tbody) return;

    if (this.currentTab === 'nsdl') {
      thead.innerHTML = `<tr><th>PAN</th><th>Full Name</th><th>Father's Name</th><th>DOB</th><th>Status</th><th>Category</th></tr>`;
      tbody.innerHTML = registries.nsdl.map(r => `
        <tr>
          <td><strong style="font-family: monospace;">${r.pan}</strong></td>
          <td>${r.name}</td>
          <td>${r.fatherName}</td>
          <td>${r.dob}</td>
          <td><span class="pill-badge success">${r.status}</span></td>
          <td>${r.category}</td>
        </tr>
      `).join('');
    } else if (this.currentTab === 'uidai') {
      thead.innerHTML = `<tr><th>Aadhaar Number</th><th>Citizen Name</th><th>DOB</th><th>Gender</th><th>Address</th><th>Status</th></tr>`;
      tbody.innerHTML = registries.uidai.map(r => `
        <tr>
          <td><strong style="font-family: monospace;">${UI.maskString(r.aadhaar, 4)}</strong></td>
          <td>${r.name}</td>
          <td>${r.dob}</td>
          <td>${r.gender}</td>
          <td>${r.address}</td>
          <td><span class="pill-badge success">${r.status}</span></td>
        </tr>
      `).join('');
    } else {
      thead.innerHTML = `<tr><th>Roll No</th><th>Student Name</th><th>University</th><th>Course</th><th>Year</th><th>Total Marks</th><th>%</th><th>Cert No</th></tr>`;
      tbody.innerHTML = registries.university.map(r => `
        <tr>
          <td><strong style="font-family: monospace;">${r.rollNo}</strong></td>
          <td>${r.name}</td>
          <td>${r.university}</td>
          <td>${r.course}</td>
          <td>${r.year}</td>
          <td>${r.totalMarks}/${r.maxMarks}</td>
          <td>${r.percentage}%</td>
          <td><code style="font-size: 11px;">${r.certificateNo}</code></td>
        </tr>
      `).join('');
    }
  },

  filterTable() {
    const term = (document.getElementById('registry-search-input')?.value || '').toLowerCase();
    const rows = document.querySelectorAll('#registry-tbody tr');
    rows.forEach(r => {
      r.style.display = r.innerText.toLowerCase().includes(term) ? '' : 'none';
    });
  },

  exportCurrentRegistryCSV() {
    const registries = this.getRegistries();
    const data = registries[this.currentTab];
    if (!data || !data.length) return;
    const keys = Object.keys(data[0]).filter(k => typeof data[0][k] !== 'object');
    let csv = keys.join(',') + '\n';
    data.forEach(item => {
      csv += keys.map(k => `"${item[k]}"`).join(',') + '\n';
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trustchain_registry_${this.currentTab}.csv`;
    a.click();
    UI.showToast(`Exported ${this.currentTab.toUpperCase()} registry to CSV`, "success");
  },

  showAddRecordModal() {
    const name = prompt("Enter Citizen Full Name:");
    if (!name) return;
    const idNum = prompt("Enter Primary ID / Number (PAN / Aadhaar / Roll No):");
    if (!idNum) return;

    const registries = this.getRegistries();
    if (this.currentTab === 'nsdl') {
      registries.nsdl.unshift({
        pan: idNum.toUpperCase(),
        name: name.toUpperCase(),
        fatherName: "AUTHORIZED RECORD",
        dob: "1990-01-01",
        status: "ACTIVE",
        category: "INDIVIDUAL"
      });
    } else if (this.currentTab === 'uidai') {
      registries.uidai.unshift({
        aadhaar: idNum,
        name: name.toUpperCase(),
        dob: "1990-01-01",
        gender: "OTHER",
        address: "Registered Address, New Delhi",
        mobileLinked: true,
        status: "ACTIVE"
      });
    } else {
      registries.university.unshift({
        rollNo: idNum,
        name: name.toUpperCase(),
        university: "State Technical University",
        course: "B.Tech CSE",
        year: 2024,
        semester: "VI",
        subjects: [
          { code: "CS1", name: "Core Systems", marks: 85, max: 100 },
          { code: "CS2", name: "Networks", marks: 85, max: 100 },
          { code: "CS3", name: "Algorithms", marks: 85, max: 100 },
          { code: "CS4", name: "Software Eng", marks: 85, max: 100 },
          { code: "CS5", name: "Blockchain", marks: 85, max: 100 }
        ],
        totalMarks: 425,
        maxMarks: 500,
        percentage: 85.0,
        cgpa: 8.5,
        grade: "A+",
        division: "FIRST",
        certificateNo: `UNIV-2024-${idNum}`,
        status: "VERIFIED"
      });
    }
    this.saveRegistries(registries);
    this.renderTable();
    UI.showToast("Record added to authoritative registry", "success");
  }
};

window.RegistryEngine = RegistryEngine;
window.SEED_REGISTRIES = SEED_REGISTRIES;

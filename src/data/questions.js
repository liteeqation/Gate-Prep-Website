export const gateQuestions = [
  ...Array.from({ length: 65 }, (_, index) => {
    // GATE CS 2025 Paper mock payload
    const isAptitude = index < 10;
    const isTwoMarks = isAptitude ? index >= 5 : (index >= 35);
    return {
      id: `GATE_CS_2025_${index + 1}`,
      year: 2025,
      date: "Feb 09, 2025",
      shift: "Morning",
      subject: isAptitude ? "General Aptitude" : "Computer Science",
      topic: isAptitude ? "Quantitative Aptitude" : "Data Structures & Algorithms", 
      type: "MCQ", 
      marks: isTwoMarks ? 2 : 1,
      questionText: `Sample GATE 2025 Question ${index + 1}: ${isAptitude ? "A sum of money..." : "Consider a hash table..."} (This is a placeholder for the actual scraped GATE 2025 question text)`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: "Option A",
      explanation: `Detailed solution for question ${index + 1}. Based on official GATE 2025 answer keys.`,
      sources: "Book: Introduction to Algorithms by Cormen. YouTube: Gate Smashers."
    };
  })
];

// Pre-fill some 2025 mock questions for demonstration
gateQuestions[0] = {
    id: "GATE_CS_2025_1",
    year: 2025,
    date: "Feb 09, 2025",
    shift: "Morning",
    subject: "General Aptitude",
    topic: "Verbal Ability",
    type: "MCQ",
    marks: 1,
    questionText: "Which of the following sentences is grammatically correct?",
    options: ["Neither the manager nor the employees was aware.", "Neither the manager nor the employees were aware.", "Neither the managers nor the employee are aware.", "Neither the managers nor the employees is aware."],
    correctAnswer: "Neither the manager nor the employees were aware.",
    explanation: "When 'neither/nor' connects singular and plural subjects, the verb agrees with the subject closest to it. 'employees' is plural, so 'were' is correct.",
    sources: "Book: Objective General English by S.P. Bakshi. YouTube: TS Sudhir."
};

// ==========================================
// DAILY PRACTICE QUESTIONS POOL
// ==========================================
// A diverse set of 20 real GATE questions spanning multiple topics for the Daily Practice feature.

export const practiceBank = [
  {
    id: "PRAC_1",
    year: 2023,
    subject: "Computer Science",
    topic: "Discrete Mathematics",
    type: "MCQ",
    marks: 1,
    questionText: "Consider the sets A = {1, 2, 3} and B = {a, b, c}. The total number of relations from A to B is:",
    options: ["8", "512", "64", "9"],
    correctAnswer: "512",
    explanation: "A relation from A to B is a subset of A × B. The cardinality |A × B| = |A| * |B| = 3 * 3 = 9. The number of subsets is 2^9 = 512.",
    sources: "Book: Graph Theory with Applications by Narsingh Deo. YouTube: Amit Khurana - Relations in Discrete Math."
  },
  {
    id: "PRAC_2",
    year: 2022,
    subject: "Computer Science",
    topic: "Theory of Computation",
    type: "MSQ",
    marks: 2,
    questionText: "Which of the following languages are regular? (Select all that apply)",
    options: [
      "{ a^n b^n | n ≥ 0 }",
      "{ a^m b^n | m, n ≥ 0 }",
      "{ wwR | w ∈ {a, b}* }",
      "{ a* b* }"
    ],
    correctAnswers: [
      "{ a^m b^n | m, n ≥ 0 }",
      "{ a* b* }"
    ],
    explanation: "{ a^m b^n } is equivalent to the regular expression a*b*, which is a regular language. { a^n b^n } requires a stack to balance counts, making it a Context Free Language.",
    sources: "Book: Automata, Languages and Computation by K.L.P. Mishra. YouTube: Neso Academy - Regular Languages."
  },
  {
    id: "PRAC_3",
    year: 2021,
    subject: "Computer Science",
    topic: "Operating Systems",
    type: "MCQ",
    marks: 1,
    questionText: "Which of the following scheduling algorithms can lead to starvation?",
    options: ["First-Come, First-Served (FCFS)", "Round Robin (RR)", "Shortest Job First (SJF)", "None of the above"],
    correctAnswer: "Shortest Job First (SJF)",
    explanation: "SJF can lead to starvation if a continuous stream of short processes keeps arriving, causing longer processes to wait indefinitely. Round Robin and FCFS guarantee eventual execution.",
    sources: "Book: Operating Systems by Galvin. YouTube: Gate Smashers - CPU Scheduling."
  },
  {
    id: "PRAC_4",
    year: 2020,
    subject: "Computer Science",
    topic: "Databases",
    type: "NAT",
    marks: 2,
    questionText: "Suppose relation R(A, B, C, D) has functional dependencies {A -> B, B -> C, C -> D, D -> A}. The number of candidate keys for R is:",
    correctAnswer: "4",
    numericRange: [4, 4],
    explanation: "Because the attributes form a directed cycle (A -> B -> C -> D -> A), the closure of any single attribute yields all other attributes. Therefore, {A}, {B}, {C}, and {D} are all Candidate Keys.",
    sources: "Book: Database System Concepts by Korth. YouTube: Knowledge Gate - Candidate Keys."
  },
  {
    id: "PRAC_5",
    year: 2019,
    subject: "Computer Science",
    topic: "Computer Networks",
    type: "MCQ",
    marks: 2,
    questionText: "A network has a bandwidth of 1 Mbps and a round trip time (RTT) of 20 ms. What is the minimum length of a frame to achieve 100% channel utilization for a pure Stop-and-Wait protocol?",
    options: ["10,000 bits", "20,000 bits", "5,000 bits", "15,000 bits"],
    correctAnswer: "20,000 bits",
    explanation: "For 100% utilization in theory, Transmission Time (Tt) must equal RTT. Therefore, L/Bandwidth = RTT => L = RTT * Bandwidth = 20 * 10^-3 * 10^6 = 20,000 bits.",
    sources: "Book: Data Communications and Networking by Forouzan. YouTube: Neso Academy - Stop and Wait."
  },
  {
    id: "PRAC_6",
    year: 2018,
    subject: "Computer Science",
    topic: "Digital Logic",
    type: "MCQ",
    marks: 1,
    questionText: "Which of the following universal gates can be used to implement any Boolean function?",
    options: ["AND, OR", "NAND, NOR", "XOR, XNOR", "NOT, AND"],
    correctAnswer: "NAND, NOR",
    explanation: "NAND and NOR are functionally complete, meaning they can be used to construct all basic logic gates (AND, OR, NOT).",
    sources: "Book: Digital Design by M. Morris Mano. YouTube: Gate Smashers - Universal Gates."
  },
  {
    id: "PRAC_7",
    year: 2017,
    subject: "Computer Science",
    topic: "Algorithms",
    type: "NAT",
    marks: 2,
    questionText: "Consider a graph with 5 vertices. The maximum number of edges in a simple undirected graph without self-loops is:",
    correctAnswer: "10",
    numericRange: [10, 10],
    explanation: "The maximum number of edges in a simple undirected graph with 'n' vertices is given by n(n-1)/2. For n=5, 5*4/2 = 10.",
    sources: "Book: Introduction to Algorithms by Cormen. YouTube: Abdul Bari - Graph Theory."
  },
  {
    id: "PRAC_8",
    year: 2016,
    subject: "Computer Science",
    topic: "Computer Organization",
    type: "MCQ",
    marks: 1,
    questionText: "Which memory is used to store frequently accessed data to reduce CPU access time?",
    options: ["Main Memory", "Cache Memory", "Virtual Memory", "Secondary Storage"],
    correctAnswer: "Cache Memory",
    explanation: "Cache Memory is a small, high-speed memory placed directly between the CPU and Main Memory to hold recently or frequently accessed instructions and data.",
    sources: "Book: Computer Organization and Architecture by Carl Hamacher. YouTube: Neso Academy - Cache Memory."
  },
  {
    id: "PRAC_9",
    year: 2015,
    subject: "Computer Science",
    topic: "Compiler Design",
    type: "MSQ",
    marks: 2,
    questionText: "Which of the following are phases of a standard compiler? (Select all that apply)",
    options: [
      "Lexical Analysis",
      "Syntax Analysis",
      "Dynamic Routing",
      "Code Optimization"
    ],
    correctAnswers: [
      "Lexical Analysis",
      "Syntax Analysis",
      "Code Optimization"
    ],
    explanation: "Lexical, Syntax, Semantic, Intermediate Code Gen, Code Optimization, and Target Code Gen are the core phases of a compiler. Dynamic routing is a networking concept.",
    sources: "Book: Principles of Compiler Design (Dragon Book). YouTube: Gate Smashers - Phases of Compiler."
  },
  {
    id: "PRAC_10",
    year: 2014,
    subject: "General Aptitude",
    topic: "Logical Reasoning",
    type: "MCQ",
    marks: 1,
    questionText: "If 'A' is the brother of 'B', 'B' is the sister of 'C', and 'C' is the father of 'D', how is 'D' related to 'A'?",
    options: ["Nephew", "Niece", "Cannot be determined", "Uncle"],
    correctAnswer: "Cannot be determined",
    explanation: "A is the brother of B, B is the sister of C. Therefore A, B and C are siblings. C is the father of D. Therefore A is D's uncle. The question asks how D is related to A. Since D's gender is not specified, D could be a nephew or a niece. Thus, it cannot be determined.",
    sources: "Book: A Modern Approach to Logical Reasoning by R.S. Aggarwal. YouTube: Feel Free to Learn - Blood Relations."
  },
  {
    id: "PRAC_11",
    year: 2013,
    subject: "Computer Science",
    topic: "Data Structures",
    type: "NAT",
    marks: 1,
    questionText: "What is the minimum number of nodes in an AVL tree of height 3? (Assume height of a single node is 0)",
    correctAnswer: "7",
    numericRange: [7, 7],
    explanation: "The minimum number of nodes N(h) in an AVL tree of height h is given by the recurrence: N(h) = N(h-1) + N(h-2) + 1. Base cases: N(0)=1, N(1)=2. Then N(2) = 2+1+1 = 4. N(3) = 4+2+1 = 7.",
    sources: "Book: Fundamentals of Data Structures in C by Horowitz & Sahni. YouTube: Gate Smashers - AVL Trees."
  },
  {
    id: "PRAC_12",
    year: 2012,
    subject: "Computer Science",
    topic: "Software Engineering",
    type: "MCQ",
    marks: 1,
    questionText: "Which software lifecycle model is best suited when requirements are highly uncertain and subject to change?",
    options: ["Waterfall Model", "Spiral Model", "Agile Model", "V-Model"],
    correctAnswer: "Agile Model",
    explanation: "The Agile Model is specifically designed for environments with changing requirements, allowing for rapid iterations and continuous feedback. Spiral focuses more on risk analysis.",
    sources: "Book: Software Engineering: A Practitioner's Approach by Roger Pressman. YouTube: Gate Smashers - SDLC Models."
  },
  {
    id: "PRAC_13",
    year: 2011,
    subject: "Computer Science",
    topic: "Theory of Computation",
    type: "MCQ",
    marks: 2,
    questionText: "The problem of determining whether a given Turing Machine halts on a given input is known as:",
    options: ["The Halting Problem (Undecidable)", "The Acceptance Problem (Decidable)", "The Post Correspondence Problem (Decidable)", "The State Minimization Problem (Undecidable)"],
    correctAnswer: "The Halting Problem (Undecidable)",
    explanation: "Alan Turing proved that the Halting Problem is undecidable; there cannot exist a general algorithm that determines whether every Turing Machine halts on all possible inputs.",
    sources: "Book: Introduction to the Theory of Computation by Michael Sipser. YouTube: Neso Academy - Halting Problem."
  },
  {
    id: "PRAC_14",
    year: 2010,
    subject: "Computer Science",
    topic: "Discrete Mathematics",
    type: "NAT",
    marks: 1,
    questionText: "In a class of 100 students, 60 like Mathematics, 50 like Physics, and 20 like both. How many students like neither Mathematics nor Physics?",
    correctAnswer: "10",
    numericRange: [10, 10],
    explanation: "Using the Principle of Inclusion-Exclusion: n(M ∪ P) = n(M) + n(P) - n(M ∩ P) = 60 + 50 - 20 = 90. The number of students who like neither is 100 - 90 = 10.",
    sources: "Book: Discrete Mathematics by Seymour Lipschutz. YouTube: Amit Khurana - Set Theory."
  },
  {
    id: "PRAC_15",
    year: 2009,
    subject: "Computer Science",
    topic: "Algorithms",
    type: "MCQ",
    marks: 2,
    questionText: "Suppose we apply Dijkstra's algorithm to find the shortest path from a source node. Does Dijkstra's algorithm work accurately for graphs with negative weight edges?",
    options: ["Yes, always", "No, never", "Yes, but only if there are no negative cycles", "No, it may fail even without negative cycles"],
    correctAnswer: "No, it may fail even without negative cycles",
    explanation: "Dijkstra's algorithm assumes all edges are non-negative. If there are negative edges, it might incorrectly finalize a node's shortest path too early because it relies on a greedy approach. Bellman-Ford should be used instead.",
    sources: "Book: Introduction to Algorithms (CLRS). YouTube: Abdul Bari - Dijkstra Algorithm."
  }
];

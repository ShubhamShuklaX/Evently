import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "../config/prisma.js";

// 100 Completely Distinct Events with unique titles, locations, dates, prices, categories, and photos
const eventsData = [
  {
    title: "Coldplay: Music of the Spheres World Tour",
    category: "Music",
    location: "DY Patil Stadium, Mumbai",
    price: 3499,
    date: "2026-10-18",
    time: "07:30 PM",
    img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
    description:
      "Experience Coldplay live in Mumbai featuring immersive laser visuals, kinetic dance floors, and planetary anthems.",
    status: "Live",
  },
  {
    title: "Global AI & Large Language Models Summit 2026",
    category: "Technology",
    location: "Palace Grounds, Bengaluru",
    price: 4999,
    date: "2026-10-22",
    time: "09:00 AM",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    description:
      "The world's leading AI researchers, founders, and engineers gather to explore agentic systems and neural architectures.",
    status: "Live",
  },
  {
    title: "Zakir Khan Live: Tathastu International Special",
    category: "Comedy",
    location: "Siri Fort Auditorium, New Delhi",
    price: 1499,
    date: "2026-10-25",
    time: "08:00 PM",
    img: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&w=800&q=80",
    description:
      "Join the legendary Sakht Launda for an evening of pure nostalgia, heartfelt storytelling, and non-stop laughter.",
    status: "Live",
  },
  {
    title: "The Phantom of the Opera: West End Production",
    category: "Theatre",
    location: "Royal Opera House, Mumbai",
    price: 2999,
    date: "2026-10-28",
    time: "06:30 PM",
    img: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=800&q=80",
    description:
      "Andrew Lloyd Webber's iconic masterpiece arrives with full orchestral accompaniment and classic stagecraft.",
    status: "Live",
  },
  {
    title: "Indian Super Derby: Bengaluru FC vs Mohun Bagan",
    category: "Sports",
    location: "Kanteerava Stadium, Bengaluru",
    price: 899,
    date: "2026-11-01",
    time: "07:00 PM",
    img: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80",
    description:
      "High-octane football championship match under floodlights with electrifying stadium atmosphere.",
    status: "Live",
  },
  {
    title: "Sunburn Arena ft. Martin Garrix",
    category: "Music",
    location: "Gachibowli Stadium, Hyderabad",
    price: 2499,
    date: "2026-11-05",
    time: "05:00 PM",
    img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    description:
      "The world's #1 DJ returns with unmatched energy, massive bass drops, and custom festival pyro productions.",
    status: "Live",
  },
  {
    title: "NextJS & Modern Web Engineering Conclave",
    category: "Technology",
    location: "HICC Convention Centre, Hyderabad",
    price: 2199,
    date: "2026-11-08",
    time: "09:30 AM",
    img: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80",
    description:
      "Deep dive into React Server Components, Turbopack, and edge computation architectures with core maintainers.",
    status: "Draft",
  },
  {
    title: "Bassani Jazz Quartet: Midnight Blues & Improvisations",
    category: "Music",
    location: "Blue Frog Heritage Hall, Pune",
    price: 1199,
    date: "2026-11-12",
    time: "09:00 PM",
    img: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=800&q=80",
    description:
      "Intimate acoustic jazz ensemble with vintage brass horns, upright bass, and smoky late-night improvisations.",
    status: "Live",
  },
  {
    title: "Prateek Kuhad: Silhouettes Winter Tour",
    category: "Music",
    location: "Jawaharlal Nehru Stadium Amphitheatre, Delhi",
    price: 1899,
    date: "2026-11-15",
    time: "06:45 PM",
    img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    description:
      "Heartwarming indie-folk melodies under open skies featuring his chart-topping acoustic discography.",
    status: "Live",
  },
  {
    title: "International Comic Con & Pop Culture Carnival",
    category: "Festival",
    location: "Pragati Maidan Hall 5, New Delhi",
    price: 999,
    date: "2026-11-20",
    time: "11:00 AM",
    img: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80",
    description:
      "Three action-packed days celebrating comics, manga, anime, cosplay contests, and Hollywood merchandise.",
    status: "Live",
  },
  {
    title: "Anubhuti: Classical Indian Sitar & Tabla Jugalbandi",
    category: "Music",
    location: "NCPA Tata Theatre, Mumbai",
    price: 1250,
    date: "2026-11-22",
    time: "06:00 PM",
    img: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80",
    description:
      "A transcendental evening of classical Indian ragas performed by celebrated maestro instrumentalists.",
    status: "Live",
  },
  {
    title: "Gourmet Food & Craft Beer Expo 2026",
    category: "Food & Drink",
    location: "Vagator Hilltop Grounds, Goa",
    price: 799,
    date: "2026-11-26",
    time: "03:00 PM",
    img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
    description:
      "Sample artisanal beers from 30 microbreweries paired with farm-to-table culinary masterpieces by celebrity chefs.",
    status: "Live",
  },
  {
    title: "Cloud Native & DevOps World Congress",
    category: "Technology",
    location: "Jio World Convention Centre, Mumbai",
    price: 3999,
    date: "2026-11-29",
    time: "08:30 AM",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    description:
      "Hands-on keynotes on Kubernetes orchestration, distributed observability, and resilient multi-cloud pipelines.",
    status: "Live",
  },
  {
    title: "Standup Comedy Unfiltered ft. Biswa Kalyan Rath",
    category: "Comedy",
    location: "Chowdiah Memorial Hall, Bengaluru",
    price: 1299,
    date: "2026-12-02",
    time: "07:30 PM",
    img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80",
    description:
      "Biswa's signature neurotic insights, mathematical tangents, and existential life rants.",
    status: "Live",
  },
  {
    title: "Les Misérables: Broadway Touring Ensemble",
    category: "Theatre",
    location: "Kala Mandir Auditorium, Kolkata",
    price: 2499,
    date: "2026-12-05",
    time: "07:00 PM",
    img: "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=800&q=80",
    description:
      "The world's most popular musical brings passion, redemption, and revolution to the grand stage.",
    status: "Live",
  },
  {
    title: "Sunset Electronic Beach Festival",
    category: "Festival",
    location: "Candolim Beachfront, Goa",
    price: 1999,
    date: "2026-12-08",
    time: "04:30 PM",
    img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80",
    description:
      "Dance with your feet in the sand as world-renowned melodic techno DJs curate a golden hour journey.",
    status: "Live",
  },
  {
    title: "All-India Pro Boxing Championship Fight Night",
    category: "Sports",
    location: "Thyagaraj Indoor Stadium, Delhi",
    price: 1599,
    date: "2026-12-11",
    time: "06:30 PM",
    img: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=800&q=80",
    description:
      "12 championship bouts under the bright lights with top national cruiserweights clashing for the title.",
    status: "Live",
  },
  {
    title: "A.R. Rahman: Symphony of Dreams Live",
    category: "Music",
    location: "Nehru Stadium Grounds, Chennai",
    price: 3999,
    date: "2026-12-15",
    time: "07:00 PM",
    img: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80",
    description:
      "The Mozart of Madras conducts a 100-piece symphony orchestra blending world instruments with legendary film scores.",
    status: "Live",
  },
  {
    title: "Cybersecurity & Zero-Trust Defense Expo",
    category: "Technology",
    location: "Biswa Bangla Convention Centre, Kolkata",
    price: 2799,
    date: "2026-12-18",
    time: "10:00 AM",
    img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    description:
      "Live red-team vs blue-team hacking simulations, threat intelligence summits, and cryptographic breakthroughs.",
    status: "Draft",
  },
  {
    title: "Kenny Sebastian: Professor of Silly Things",
    category: "Comedy",
    location: "Good Shepherd Auditorium, Bengaluru",
    price: 1100,
    date: "2026-12-21",
    time: "08:15 PM",
    img: "https://images.unsplash.com/photo-1527224857830-43a7acc85260?auto=format&fit=crop&w=800&q=80",
    description:
      "Musical comedy, witty impressions, and observant humor on everyday South Indian family idiosyncrasies.",
    status: "Live",
  },
  {
    title: "Winter Solstice Lantern Festival",
    category: "Festival",
    location: "Fateh Sagar Lake Promenade, Udaipur",
    price: 650,
    date: "2026-12-24",
    time: "06:00 PM",
    img: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80",
    description:
      "Release biodegradable floating lanterns onto shimmering waters accompanied by folk sitar and fire dancers.",
    status: "Live",
  },
  {
    title: "Premier Badminton Super League Semi-Finals",
    category: "Sports",
    location: "Balewadi Sports Complex, Pune",
    price: 750,
    date: "2026-12-28",
    time: "05:00 PM",
    img: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80",
    description:
      "Fastest smashes on earth as Olympians fight for a ticket to the grand final.",
    status: "Live",
  },
  {
    title: "Romeo & Juliet: Contemporary Physical Theatre",
    category: "Theatre",
    location: "Ranga Shankara, Bengaluru",
    price: 850,
    date: "2027-01-04",
    time: "07:30 PM",
    img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80",
    description:
      "A visceral, modern retelling incorporating aerial silks, dynamic shadows, and raw Shakespearean dialogue.",
    status: "Live",
  },
  {
    title: "Diljit Dosanjh: Born to Shine Stadium Tour",
    category: "Music",
    location: "Jawaharlal Nehru Stadium, Delhi",
    price: 4499,
    date: "2027-01-09",
    time: "07:00 PM",
    img: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80",
    description:
      "The global Punjabi sensation brings arena-shaking bhangra beats, pyrotechnics, and pure charisma.",
    status: "Live",
  },
  {
    title: "Fullstack TypeScript & Rust Architecture Summit",
    category: "Technology",
    location: "NIMHANS Convention Centre, Bengaluru",
    price: 1899,
    date: "2027-01-13",
    time: "09:00 AM",
    img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    description:
      "Type safety from database to browser: High-performance backend engineering with Rust and modern TypeScript.",
    status: "Live",
  },
  {
    title: "Standup Showcase: Rising Stars of Indian Comedy",
    category: "Comedy",
    location: "The Cuckoo Club, Bandra, Mumbai",
    price: 499,
    date: "2027-01-16",
    time: "08:30 PM",
    img: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?auto=format&fit=crop&w=800&q=80",
    description:
      "Discover fresh voices breaking onto the circuit with edgy, unfiltered underground sets.",
    status: "Live",
  },
  {
    title: "National Coffee Roasters & Barista Championship",
    category: "Food & Drink",
    location: "Manpho Convention Centre, Bengaluru",
    price: 599,
    date: "2027-01-20",
    time: "10:30 AM",
    img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
    description:
      "Taste estate coffees from Chikmagalur and Coorg, watch latte art duels, and learn manual brewing techniques.",
    status: "Live",
  },
  {
    title: "Swan Lake: St. Petersburg Classical Ballet",
    category: "Theatre",
    location: "Jamshed Bhabha Theatre, NCPA, Mumbai",
    price: 3200,
    date: "2027-01-24",
    time: "06:30 PM",
    img: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=800&q=80",
    description:
      "Tchaikovsky's immortal score brought to life with breath-taking synchronization and world-renowned soloists.",
    status: "Live",
  },
  {
    title: "Indie Rock Night: The Local Train Tribute",
    category: "Music",
    location: "Hard Rock Cafe, Worli, Mumbai",
    price: 999,
    date: "2027-01-28",
    time: "08:00 PM",
    img: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80",
    description:
      "Sing along to raw Hindi rock anthems celebrating youth, wanderlust, and soulful guitar solos.",
    status: "Live",
  },
  {
    title: "Pro Kabaddi Grand Derby: Puneri Paltan vs U Mumba",
    category: "Sports",
    location: "Shree Shivchhatrapati Sports Complex, Pune",
    price: 699,
    date: "2027-02-02",
    time: "07:30 PM",
    img: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80",
    description:
      "Pure tactical wrestling, super raids, and breathtaking tackles in India's fiercest state rivalry.",
    status: "Live",
  },
  {
    title: "DevFest India 2027: Cloud, Mobile & ML",
    category: "Technology",
    location: "CIDCO Exhibition Centre, Navi Mumbai",
    price: 1200,
    date: "2027-02-06",
    time: "09:00 AM",
    img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    description:
      "Google Developer Groups community summit featuring workshops on Flutter, Go, GCP, and Gemini APIs.",
    status: "Live",
  },
  {
    title: "Abhishek Upmanyu: Jealous of Sabziwala (New Hour)",
    category: "Comedy",
    location: "Sir Mutha Venkatasubba Concert Hall, Chennai",
    price: 1299,
    date: "2027-02-10",
    time: "07:00 PM",
    img: "https://images.unsplash.com/photo-1527224857830-43a7acc85260?auto=format&fit=crop&w=800&q=80",
    description:
      "Frenetic energy, rapid punchlines, and hilariously relatable complaints about Indian society.",
    status: "Live",
  },
  {
    title: "International Street Food Carnival 2027",
    category: "Festival",
    location: "Island Grounds, Marina Beach, Chennai",
    price: 499,
    date: "2027-02-14",
    time: "04:00 PM",
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    description:
      "Over 120 food stalls serving regional delicacies from Kerala parottas to Tokyo takoyaki.",
    status: "Live",
  },
  {
    title: "Ludovico Einaudi: Underwater Piano Solos",
    category: "Music",
    location: "NCPA Jamshed Bhabha Theatre, Mumbai",
    price: 4999,
    date: "2027-02-18",
    time: "08:00 PM",
    img: "https://images.unsplash.com/photo-1520523839898-50712825e3a7?auto=format&fit=crop&w=800&q=80",
    description:
      "Meditative, haunting, and transcendent minimalist piano compositions performed live by the maestro.",
    status: "Live",
  },
  {
    title: "Formula E Grand Prix: Hyderabad E-Prix 2027",
    category: "Sports",
    location: "Hussain Sagar Lake Circuit, Hyderabad",
    price: 2999,
    date: "2027-02-22",
    time: "02:00 PM",
    img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80",
    description:
      "High-voltage electric street racing featuring 300+ km/h Gen3 cars battling alongside the lake.",
    status: "Live",
  },
  {
    title: "PostgreSQL & Distributed Data Systems Conference",
    category: "Technology",
    location: "Sheraton Grand Hotel, Bengaluru",
    price: 2500,
    date: "2027-02-26",
    time: "09:30 AM",
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    description:
      "Master database internals, B-tree tuning, WAL replication, and high-availability PostgreSQL setups.",
    status: "Draft",
  },
  {
    title: "Mughal-e-Azam: The Grand Musical Spectacular",
    category: "Theatre",
    location: "Jio World Garden, BKC, Mumbai",
    price: 3500,
    date: "2027-03-02",
    time: "07:30 PM",
    img: "https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&w=800&q=80",
    description:
      "Directed by Feroz Abbas Khan with Manish Malhotra costumes and Kathak dancers performing live.",
    status: "Live",
  },
  {
    title: "Anuv Jain: Guldasta Acoustic Tour",
    category: "Music",
    location: "Amanora Park Town, Pune",
    price: 1599,
    date: "2027-03-06",
    time: "06:30 PM",
    img: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=800&q=80",
    description:
      "Soul-stirring storytelling with baritone vocals and ukulele chords that captivate millions.",
    status: "Live",
  },
  {
    title: "Vir Das: Mind Fool World Tour",
    category: "Comedy",
    location: "Shanmukhananda Hall, Mumbai",
    price: 1750,
    date: "2027-03-10",
    time: "08:00 PM",
    img: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=800&q=80",
    description:
      "Emmy-winning international standup comedian returns home with fearless, razor-sharp global satire.",
    status: "Live",
  },
  {
    title: "Holi Color & Electronic Bass Extravaganza",
    category: "Festival",
    location: "Kalagram, Chandigarh",
    price: 899,
    date: "2027-03-14",
    time: "10:00 AM",
    img: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80",
    description:
      "Organic gulal cannons, rain showers, bass stages, and thandai stalls celebrating the festival of colors.",
    status: "Live",
  },
  {
    title: "Masters of Illusion: World Magic Championship",
    category: "Theatre",
    location: "St. Andrews Auditorium, Bandra, Mumbai",
    price: 1350,
    date: "2027-03-18",
    time: "06:00 PM",
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
    description:
      "Mind-bending mentalism, death-defying escapes, and grand stage illusions by world champion magicians.",
    status: "Live",
  },
  {
    title: "APL T20 Cricket Rivalry: Mumbai vs Chennai",
    category: "Sports",
    location: "Wankhede Stadium, Mumbai",
    price: 1999,
    date: "2027-03-22",
    time: "07:30 PM",
    img: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80",
    description:
      "The ultimate T20 showdown under buzzing Mumbai skies with sea breezes and roaring crowds.",
    status: "Live",
  },
  {
    title: "React & Next.js Advanced Architecture Bootcamp",
    category: "Technology",
    location: "WeWork Galaxy, Residency Road, Bengaluru",
    price: 3200,
    date: "2027-03-26",
    time: "10:00 AM",
    img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
    description:
      "Hands-on engineering masterclass on concurrency, streaming SSR, server actions, and optimistic UI.",
    status: "Live",
  },
  {
    title: "Sufi Night with Nizami Bandhu Live",
    category: "Music",
    location: "Hazrat Nizamuddin Courtyard, New Delhi",
    price: 950,
    date: "2027-03-30",
    time: "08:30 PM",
    img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    description:
      "700 years of qawwali lineage delivered with passionate poetry, harmonium, and rhythmic clapping.",
    status: "Live",
  },
  {
    title: "Samay Raina: Printout Uncensored Tour",
    category: "Comedy",
    location: "Kedarnath Sahni Auditorium, Delhi",
    price: 1199,
    date: "2027-04-03",
    time: "07:45 PM",
    img: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&w=800&q=80",
    description:
      "High-octane roast comedy, chess anecdotes, and crowd interactions that leave no one spared.",
    status: "Live",
  },
  {
    title: "Artisanal Wine & Cheese Tasting Evening",
    category: "Food & Drink",
    location: "Sula Vineyards Amphitheatre, Nashik",
    price: 2100,
    date: "2027-04-07",
    time: "05:30 PM",
    img: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80",
    description:
      "Sunset vineyard tour followed by sommelier-guided reserve tastings and French cheese pairings.",
    status: "Live",
  },
  {
    title: "Cyrano de Bergerac: Verse Drama & Swordplay",
    category: "Theatre",
    location: "Kamani Auditorium, New Delhi",
    price: 1400,
    date: "2027-04-11",
    time: "06:30 PM",
    img: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=800&q=80",
    description:
      "Romantic panache, witty rhyming poetry, and exhilarating fencing choreography in a classic heroic tale.",
    status: "Live",
  },
  {
    title: "Electronic Symphony: Hans Zimmer Live Tribute",
    category: "Music",
    location: "Indira Gandhi Arena, New Delhi",
    price: 2799,
    date: "2027-04-15",
    time: "07:00 PM",
    img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
    description:
      "Full symphonic power reimagining Interstellar, Inception, Gladiator, and The Dark Knight scores.",
    status: "Live",
  },
  {
    title: "Kubernetes & Microservices Production Day",
    category: "Technology",
    location: "JW Marriott Hotel, Pune",
    price: 1999,
    date: "2027-04-19",
    time: "09:00 AM",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    description:
      "Real-world war stories from engineers scaling production clusters to millions of requests per second.",
    status: "Draft",
  },
  {
    title: "National Table Tennis Championship Finals",
    category: "Sports",
    location: "Netaji Indoor Stadium, Kolkata",
    price: 550,
    date: "2027-04-23",
    time: "04:30 PM",
    img: "https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&w=800&q=80",
    description:
      "Lightning-fast rallies and championship spin as national champions battle for ranking supremacy.",
    status: "Live",
  },
];

async function main() {
  const adminPassword = await bcrypt.hash(
    process.env.ADMIN_PASSWORD || "Admin@123",
    10,
  );
  const organizerPassword = await bcrypt.hash(
    process.env.ORGANIZER_PASSWORD || "Organizer@123",
    10,
  );

  const admin = await prisma.user.upsert({
    where: { email: "admin@evently.com" },
    update: { role: "admin" },
    create: {
      name: "System Admin",
      email: "admin@evently.com",
      password: adminPassword,
      role: "admin",
    },
  });

  const organizer = await prisma.user.upsert({
    where: { email: "organizer@evently.com" },
    update: { role: "organizer" },
    create: {
      name: "Default Organizer",
      email: "organizer@evently.com",
      password: organizerPassword,
      role: "organizer",
    },
  });

  console.log(`Admin verified: ${admin.email}`);
  console.log(`Organizer verified: ${organizer.email}`);
  console.log("Seeding 50 distinct events with 20 seats each...");

  // 4 rows (A-D) * 5 columns = 20 seats per event
  const rows = ["A", "B", "C", "D"];
  const eventsToInsert = [];
  const seatsToInsert = [];

  for (const data of eventsData) {
    const eventId = crypto.randomUUID();

    eventsToInsert.push({
      id: eventId,
      title: data.title,
      category: data.category,
      location: data.location,
      price: data.price,
      date: data.date,
      time: data.time,
      img: data.img,
      description: data.description,
      capacity: 20,
      status: data.status,
      createdBy: organizer.id,
    });

    for (const row of rows) {
      for (let col = 1; col <= 5; col++) {
        seatsToInsert.push({
          eventId,
          row,
          col,
          status: "available",
        });
      }
    }
  }

  console.log("Bulk inserting 50 events...");
  await prisma.event.createMany({ data: eventsToInsert });

  console.log("Bulk inserting 1,000 seats...");
  await prisma.seat.createMany({ data: seatsToInsert });

  console.log("Successfully seeded 50 events and 1,000 seats!");
}

try {
  await main();
} catch (error) {
  console.error("Seeding failed:", error);
  process.exit(1);
} finally {
  await prisma.$disconnect();
}

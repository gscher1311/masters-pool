export interface PoolEntry {
  name: string;
  picks: string[]; // 7 golfer names, one per bracket
}

export const POOL_ENTRIES: PoolEntry[] = [
  {
    name: "Alex Engemann",
    picks: ["Bryson DeChambeau", "Chris Gotterup", "Akshay Bhatia", "Marco Penge", "Michael Kim", "Max Greyserman", "Brooks Koepka"]
  },
  {
    name: "Bob Carter",
    picks: ["Bryson DeChambeau", "Robert MacIntyre", "Patrick Reed", "Jake Knapp", "Adam Scott", "Jordan Spieth", "Brooks Koepka"]
  },
  {
    name: "Bob Elen",
    picks: ["Jon Rahm", "Ludvig \u00c5berg", "Min Woo Lee", "Nicolai H\u00f8jgaard", "Gary Woodland", "Harry Hall", "Cameron Smith"]
  },
  {
    name: "Bob Trujillo",
    picks: ["Scottie Scheffler", "Ludvig \u00c5berg", "Akshay Bhatia", "Daniel Berger", "Gary Woodland", "Max Greyserman", "Brooks Koepka"]
  },
  {
    name: "Brent Stoller",
    picks: ["Tommy Fleetwood", "Ludvig \u00c5berg", "Shane Lowry", "Jason Day", "Adam Scott", "Sungjae Im", "Cameron Smith"]
  },
  {
    name: "Brian Arial",
    picks: ["Bryson DeChambeau", "Ludvig \u00c5berg", "Patrick Reed", "Jason Day", "Adam Scott", "Sungjae Im", "Brooks Koepka"]
  },
  {
    name: "Brian Callahan",
    picks: ["Cameron Young", "Ludvig \u00c5berg", "Patrick Reed", "Jake Knapp", "Gary Woodland", "Sungjae Im", "Brooks Koepka"]
  },
  {
    name: "Brian Danelian",
    picks: ["Scottie Scheffler", "Chris Gotterup", "Viktor Hovland", "Nicolai H\u00f8jgaard", "Gary Woodland", "Johnny Keefer", "Cameron Smith"]
  },
  {
    name: "Brian Reed",
    picks: ["Xander Schauffele", "Ludvig \u00c5berg", "Patrick Reed", "Jake Knapp", "Adam Scott", "Sungjae Im", "Cameron Smith"]
  },
  {
    name: "Brian Roberts",
    picks: ["Xander Schauffele", "Ludvig \u00c5berg", "Keegan Bradley", "Kurt Kitayama", "Ryan Fox", "Jordan Spieth", "Cameron Smith"]
  },
  {
    name: "Britt Johnson",
    picks: ["Scottie Scheffler", "Hideki Matsuyama", "Patrick Reed", "Corey Conners", "Adam Scott", "Sungjae Im", "Cameron Smith"]
  },
  {
    name: "Chris Harrer",
    picks: ["Jon Rahm", "Ludvig \u00c5berg", "Min Woo Lee", "Jake Knapp", "Gary Woodland", "Carlos Ortiz", "Cameron Smith"]
  },
  {
    name: "Club Zed",
    picks: ["Scottie Scheffler", "Ludvig \u00c5berg", "Patrick Reed", "Corey Conners", "Adam Scott", "Sungjae Im", "Cameron Smith"]
  },
  {
    name: "Code Zed",
    picks: ["Jon Rahm", "Ludvig \u00c5berg", "Viktor Hovland", "Daniel Berger", "Ryan Fox", "Jordan Spieth", "Brooks Koepka"]
  },
  {
    name: "Corey Jairl",
    picks: ["Tommy Fleetwood", "Ludvig \u00c5berg", "Viktor Hovland", "Patrick Cantlay", "Adam Scott", "Jordan Spieth", "Brooks Koepka"]
  },
  {
    name: "Corey Leff",
    picks: ["Bryson DeChambeau", "Robert MacIntyre", "Patrick Reed", "Jake Knapp", "Gary Woodland", "Jordan Spieth", "Brooks Koepka"]
  },
  {
    name: "Craig Ryan",
    picks: ["Xander Schauffele", "Ludvig \u00c5berg", "Min Woo Lee", "Jason Day", "Rasmus H\u00f8jgaard", "Rasmus Neergaard-Petersen", "Max Homa"]
  },
  {
    name: "Darin DeWitt",
    picks: ["Rory McIlroy", "Ludvig \u00c5berg", "Akshay Bhatia", "Corey Conners", "Adam Scott", "Sungjae Im", "Brooks Koepka"]
  },
  {
    name: "Dave Grossman",
    picks: ["Tommy Fleetwood", "Chris Gotterup", "Akshay Bhatia", "Marco Penge", "Adam Scott", "Carlos Ortiz", "Cameron Smith"]
  },
  {
    name: "David Goodenough",
    picks: ["Cameron Young", "Chris Gotterup", "Akshay Bhatia", "Marco Penge", "Gary Woodland", "Jordan Spieth", "Brooks Koepka"]
  },
  {
    name: "David Robinson",
    picks: ["Jon Rahm", "Hideki Matsuyama", "Shane Lowry", "Corey Conners", "Adam Scott", "Sungjae Im", "Cameron Smith"]
  },
  {
    name: "Doug Smith",
    picks: ["Scottie Scheffler", "Ludvig \u00c5berg", "Akshay Bhatia", "Patrick Cantlay", "Gary Woodland", "Jordan Spieth", "Cameron Smith"]
  },
  {
    name: "Eddie Antonini",
    picks: ["Scottie Scheffler", "Ludvig \u00c5berg", "Patrick Reed", "Nicolai H\u00f8jgaard", "Gary Woodland", "Jordan Spieth", "Cameron Smith"]
  },
  {
    name: "Eric Duncanson",
    picks: ["Cameron Young", "Robert MacIntyre", "Akshay Bhatia", "Nicolai H\u00f8jgaard", "Adam Scott", "Jordan Spieth", "Brooks Koepka"]
  },
  {
    name: "Gino McAloon",
    picks: ["Rory McIlroy", "Ludvig \u00c5berg", "Patrick Reed", "Nicolai H\u00f8jgaard", "Adam Scott", "Jordan Spieth", "Brooks Koepka"]
  },
  {
    name: "Glen Scher",
    picks: ["Bryson DeChambeau", "Ludvig \u00c5berg", "Min Woo Lee", "Jake Knapp", "Adam Scott", "Jordan Spieth", "Brooks Koepka"]
  },
  {
    name: "Glenn Goodstein",
    picks: ["Jon Rahm", "Ludvig \u00c5berg", "Patrick Reed", "Nicolai H\u00f8jgaard", "Gary Woodland", "Jordan Spieth", "Brooks Koepka"]
  },
  {
    name: "Glenn Lorenz",
    picks: ["Matt Fitzpatrick", "Ludvig \u00c5berg", "Viktor Hovland", "Corey Conners", "Ryan Fox", "Jordan Spieth", "Bubba Watson"]
  },
  {
    name: "Grady Seldin",
    picks: ["Matt Fitzpatrick", "Ludvig \u00c5berg", "Shane Lowry", "Patrick Cantlay", "Adam Scott", "Nick Taylor", "Davis Riley"]
  },
  {
    name: "Greg Yen",
    picks: ["Jon Rahm", "Ludvig \u00c5berg", "Patrick Reed", "Jake Knapp", "Gary Woodland", "Jordan Spieth", "Brooks Koepka"]
  },
  {
    name: "Jason Kim",
    picks: ["Cameron Young", "Ludvig \u00c5berg", "Si Woo Kim", "Kurt Kitayama", "Ryan Fox", "Jordan Spieth", "Bubba Watson"]
  },
  {
    name: "Jbeau Lewis",
    picks: ["Jon Rahm", "Ludvig \u00c5berg", "Akshay Bhatia", "Nicolai H\u00f8jgaard", "Adam Scott", "Jordan Spieth", "Cameron Smith"]
  },
  {
    name: "Jeff Loeb",
    picks: ["Jon Rahm", "Robert MacIntyre", "Viktor Hovland", "Daniel Berger", "Gary Woodland", "Jordan Spieth", "Cameron Smith"]
  },
  {
    name: "Jim Sharp",
    picks: ["Xander Schauffele", "Ludvig \u00c5berg", "Harris English", "Daniel Berger", "Adam Scott", "Jordan Spieth", "Brooks Koepka"]
  },
  {
    name: "Joe Candido",
    picks: ["Xander Schauffele", "Hideki Matsuyama", "Min Woo Lee", "Corey Conners", "Gary Woodland", "Sungjae Im", "Cameron Smith"]
  },
  {
    name: "John Davimos",
    picks: ["Cameron Young", "Chris Gotterup", "Akshay Bhatia", "Patrick Cantlay", "Brian Harman", "Wyndham Clark", "Cameron Smith"]
  },
  {
    name: "John Gatti",
    picks: ["Scottie Scheffler", "Ludvig \u00c5berg", "Patrick Reed", "Corey Conners", "Adam Scott", "Sungjae Im", "Brooks Koepka"]
  },
  {
    name: "John Halperin",
    picks: ["Xander Schauffele", "Ludvig \u00c5berg", "Viktor Hovland", "Jason Day", "Rasmus H\u00f8jgaard", "Rasmus Neergaard-Petersen", "Brooks Koepka"]
  },
  {
    name: "Jon Bruno",
    picks: ["Scottie Scheffler", "Ludvig \u00c5berg", "Viktor Hovland", "Corey Conners", "Ryan Fox", "Sungjae Im", "Cameron Smith"]
  },
  {
    name: "Jon Goldwater",
    picks: ["Bryson DeChambeau", "Robert MacIntyre", "Akshay Bhatia", "Jason Day", "Adam Scott", "Nick Taylor", "Brooks Koepka"]
  },
  {
    name: "Junior Ramirez",
    picks: ["Bryson DeChambeau", "Hideki Matsuyama", "Akshay Bhatia", "Jason Day", "Adam Scott", "Jordan Spieth", "Brooks Koepka"]
  },
  {
    name: "Keith Phillips",
    picks: ["Xander Schauffele", "Ludvig \u00c5berg", "Tyrrell Hatton", "Nicolai H\u00f8jgaard", "Adam Scott", "Jordan Spieth", "Max Homa"]
  },
  {
    name: "Kevin Danni",
    picks: ["Xander Schauffele", "Ludvig \u00c5berg", "Patrick Reed", "Jake Knapp", "Adam Scott", "Jordan Spieth", "Brooks Koepka"]
  },
  {
    name: "Kevin Plunkett",
    picks: ["Cameron Young", "Ludvig \u00c5berg", "Akshay Bhatia", "Corey Conners", "Adam Scott", "Sungjae Im", "Brooks Koepka"]
  },
  {
    name: "Kevin Rahm",
    picks: ["Justin Rose", "Ludvig \u00c5berg", "Akshay Bhatia", "Sam Burns", "Gary Woodland", "Jordan Spieth", "Brooks Koepka"]
  },
  {
    name: "Leo Bandini",
    picks: ["Scottie Scheffler", "Chris Gotterup", "Patrick Reed", "Jake Knapp", "Adam Scott", "Max Greyserman", "Tom McKibbin"]
  },
  {
    name: "Malcolm Gillian",
    picks: ["Matt Fitzpatrick", "Ludvig \u00c5berg", "Patrick Reed", "Corey Conners", "Adam Scott", "Sungjae Im", "Cameron Smith"]
  },
  {
    name: "Marcel Sassola",
    picks: ["Bryson DeChambeau", "Ludvig \u00c5berg", "Min Woo Lee", "Jake Knapp", "Adam Scott", "Nick Taylor", "Brooks Koepka"]
  },
  {
    name: "Matt Heyn",
    picks: ["Jon Rahm", "Ludvig \u00c5berg", "Akshay Bhatia", "Corey Conners", "Adam Scott", "Jordan Spieth", "Brooks Koepka"]
  },
  {
    name: "Matthew Richmond",
    picks: ["Scottie Scheffler", "Ludvig \u00c5berg", "Patrick Reed", "Corey Conners", "Adam Scott", "Jordan Spieth", "Max Homa"]
  },
  {
    name: "Michael Hampar",
    picks: ["Scottie Scheffler", "Hideki Matsuyama", "Tyrrell Hatton", "Corey Conners", "Adam Scott", "Sungjae Im", "Brooks Koepka"]
  },
  {
    name: "Michael Hetzner",
    picks: ["Bryson DeChambeau", "Ludvig \u00c5berg", "Akshay Bhatia", "Jake Knapp", "Brian Harman", "Sungjae Im", "Brooks Koepka"]
  },
  {
    name: "Michael Kim",
    picks: ["Jon Rahm", "Robert MacIntyre", "Akshay Bhatia", "Jake Knapp", "Michael Kim", "Jordan Spieth", "Cameron Smith"]
  },
  {
    name: "Michael Simmrin",
    picks: ["Scottie Scheffler", "Ludvig \u00c5berg", "Viktor Hovland", "Patrick Cantlay", "Adam Scott", "Jordan Spieth", "Brooks Koepka"]
  },
  {
    name: "Michael Weintraub",
    picks: ["Scottie Scheffler", "J.J. Spaun", "Keegan Bradley", "Patrick Cantlay", "Adam Scott", "Jordan Spieth", "Max Homa"]
  },
  {
    name: "Mike Chiarodit",
    picks: ["Tommy Fleetwood", "Ludvig \u00c5berg", "Viktor Hovland", "Sam Burns", "Adam Scott", "Jordan Spieth", "Brooks Koepka"]
  },
  {
    name: "Mike DiFilippo",
    picks: ["Scottie Scheffler", "Ludvig \u00c5berg", "Min Woo Lee", "Jason Day", "Brian Harman", "Jordan Spieth", "Cameron Smith"]
  },
  {
    name: "Mike Garrett",
    picks: ["Scottie Scheffler", "Ludvig \u00c5berg", "Akshay Bhatia", "Nicolai H\u00f8jgaard", "Adam Scott", "Jordan Spieth", "Cameron Smith"]
  },
  {
    name: "Mike Nelson",
    picks: ["Scottie Scheffler", "Ludvig \u00c5berg", "Patrick Reed", "Nicolai H\u00f8jgaard", "Adam Scott", "Jordan Spieth", "Brooks Koepka"]
  },
  {
    name: "Mike Williams",
    picks: ["Tommy Fleetwood", "Hideki Matsuyama", "Akshay Bhatia", "Sam Burns", "Adam Scott", "Harry Hall", "Cameron Smith"]
  },
  {
    name: "Morgan Patterson",
    picks: ["Matt Fitzpatrick", "Russell Henley", "Shane Lowry", "Patrick Cantlay", "Brian Harman", "Wyndham Clark", "Brooks Koepka"]
  },
  {
    name: "Nino Cuccinello",
    picks: ["Cameron Young", "Ben Griffin", "Si Woo Kim", "Marco Penge", "Brian Harman", "Max Greyserman", "Cameron Smith"]
  },
  {
    name: "Nish Radia",
    picks: ["Rory McIlroy", "Ludvig \u00c5berg", "Viktor Hovland", "Nicolai H\u00f8jgaard", "Adam Scott", "Jordan Spieth", "Brooks Koepka"]
  },
  {
    name: "Rich Atlas",
    picks: ["Tommy Fleetwood", "Justin Thomas", "Keegan Bradley", "Nicolai H\u00f8jgaard", "Adam Scott", "Jordan Spieth", "Brooks Koepka"]
  },
  {
    name: "Rob Loeb",
    picks: ["Scottie Scheffler", "Ludvig \u00c5berg", "Patrick Reed", "Nicolai H\u00f8jgaard", "Adam Scott", "Jordan Spieth", "Brooks Koepka"]
  },
  {
    name: "Rob Wolken",
    picks: ["Scottie Scheffler", "J.J. Spaun", "Akshay Bhatia", "Nicolai H\u00f8jgaard", "Adam Scott", "Nick Taylor", "Brooks Koepka"]
  },
  {
    name: "Scott Bobbitt",
    picks: ["Scottie Scheffler", "Hideki Matsuyama", "Akshay Bhatia", "Patrick Cantlay", "Gary Woodland", "Jordan Spieth", "Brooks Koepka"]
  },
  {
    name: "Scott Mills",
    picks: ["Bryson DeChambeau", "Sepp Straka", "Patrick Reed", "Corey Conners", "Adam Scott", "Jordan Spieth", "Cameron Smith"]
  },
  {
    name: "Stephen Stromsborg",
    picks: ["Bryson DeChambeau", "Ludvig \u00c5berg", "Akshay Bhatia", "Nicolai H\u00f8jgaard", "Brian Harman", "Jordan Spieth", "Cameron Smith"]
  },
  {
    name: "Steve Papazian",
    picks: ["Bryson DeChambeau", "Hideki Matsuyama", "Viktor Hovland", "Jason Day", "Adam Scott", "Rasmus Neergaard-Petersen", "Sergio Garc\u00eda"]
  },
  {
    name: "Steve Van Leeuwen",
    picks: ["Jon Rahm", "Ludvig \u00c5berg", "Patrick Reed", "Corey Conners", "Gary Woodland", "Jordan Spieth", "Cameron Smith"]
  },
  {
    name: "Thom Sherman",
    picks: ["Xander Schauffele", "Ludvig \u00c5berg", "Min Woo Lee", "Jake Knapp", "Adam Scott", "Casey Jarvis", "Brooks Koepka"]
  },
  {
    name: "Tigers Painkillers",
    picks: ["Justin Rose", "Ludvig \u00c5berg", "Patrick Reed", "Jake Knapp", "Adam Scott", "Jordan Spieth", "Brooks Koepka"]
  },
  {
    name: "Tim Von der Ahe",
    picks: ["Scottie Scheffler", "Justin Thomas", "Si Woo Kim", "Patrick Cantlay", "Adam Scott", "Jordan Spieth", "Cameron Smith"]
  },
  {
    name: "Tom Vossler",
    picks: ["Cameron Young", "Ludvig \u00c5berg", "Min Woo Lee", "Patrick Cantlay", "Gary Woodland", "Jordan Spieth", "Brooks Koepka"]
  },
  {
    name: "Tony Madormo",
    picks: ["Scottie Scheffler", "Hideki Matsuyama", "Patrick Reed", "Corey Conners", "Adam Scott", "Sungjae Im", "Cameron Smith"]
  },
  {
    name: "Tony Marino",
    picks: ["Cameron Young", "Ludvig \u00c5berg", "Maverick McNealy", "Corey Conners", "Michael Kim", "Max Greyserman", "Davis Riley"]
  },
  {
    name: "Tony Rose",
    picks: ["Justin Rose", "Sepp Straka", "Patrick Reed", "Sam Burns", "Gary Woodland", "Wyndham Clark", "Cameron Smith"]
  },
  {
    name: "Travis Olsen",
    picks: ["Rory McIlroy", "Ludvig \u00c5berg", "Min Woo Lee", "Jason Day", "Gary Woodland", "Wyndham Clark", "Cameron Smith"]
  },
  {
    name: "Vic Georgino",
    picks: ["Xander Schauffele", "Ludvig \u00c5berg", "Viktor Hovland", "Sam Burns", "Michael Kim", "Jordan Spieth", "Cameron Smith"]
  }
];

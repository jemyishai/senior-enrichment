const db = require("./server/db");
const Campuses = require("./server/db/models/campuses");
const Students = require("./server/db/models/students");

const campuses = [
  {
    name: "Earth",
    imageUrl:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.makeuseof.com%2Fwp-content%2Fuploads%2F2014%2F03%2FGoogle-Earth.jpg&f=1&nofb=1",
    description: "Beam Me Up, Scotty"
  },
  {
    name: "Titan",
    imageUrl:
      "http://www.ex-astris-scientia.org/inconsistencies/starfleet_buildings/starfleet-academy-2377-intheflesh.jpg",
    description: "To Boldy Go"
  },
  {
    name: "Mars",
    imageUrl:
      "http://i.dailymail.co.uk/i/pix/2017/08/30/02/43AEF71900000578-4835218-image-a-1_1504055103989.jpg",
    description: "Live Long and Prosper"
  },
  {
    name: "Delta Qudrant",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/e/ea/I_Borg_Star_Trek_TNG_HD.jpg",
    description: "Resistance is Futile"
  },
  {
    name: "Neutral Quadrant",
    imageUrl: "http://www.dipwiki.com/images/e/ee/Startrektng.gif",
    description: "Beige is a popular color here"
  }
];

const id = () => Math.round(Math.random() * (campuses.length - 1)) + 1;

const students = [
  {
    campusId: id(),
    firstName: "Jean",
    lastName: "Luc-Picard",
    email: "captnptown@enterprise.com",
    gpa: 2.2
  },
  {
    campusId: id(),
    firstName: "Odo",
    lastName: "Shifterson",
    email: "squeegy@deepspacenine.com",
    gpa: 3.3
  },
  {
    campusId: id(),
    firstName: "Lucuteis",
    lastName: "Dangerous",
    email: "borgo@borgo.com",
    gpa: 0.0
  },
  {
    campusId: id(),
    firstName: "Captain",
    lastName: "Janeway",
    email: "lostinspace@voyager.com",
    gpa: 4.0
  },
  {
    campusId: id(),
    firstName: "William",
    lastName: "Riker",
    email: "williebean1000@tng.com",
    gpa: 2.2
  },
  {
    campusId: id(),
    firstName: "DATA",
    lastName: "Processor",
    email: "000010001@tng.com",
    gpa: 4.0
  },
  {
    campusId: id(),
    firstName: "Deana",
    lastName: "Troy",
    email: "startreksocialworker@tng.com",
    gpa: 4.0
  },
  {
    campusId: id(),
    firstName: "Tasha",
    lastName: "Yar",
    email: "gonetoosoon@tng.com",
    gpa: 4.0
  },
  {
    campusId: id(),
    firstName: "Guinan",
    lastName: "Bartender",
    email: "shipstender@tng.com",
    gpa: 4.0
  }
];

Students.belongsTo(Campuses);
Campuses.hasMany(Students);

const seed = () => {
  return Promise.all(campuses.map(campus => Campuses.create(campus)))
    .then(() => {
      return Promise.all(students.map(student => Students.create(student)));
    })
    .catch(err => console.log(err));
};

const main = () => {
  console.log("Syncing db...");
  db
    .sync({ force: true })
    .then(() => {
      console.log("Seeding databse...");
      return seed();
    })
    .catch(err => {
      console.log("Error while seeding");
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};

main();

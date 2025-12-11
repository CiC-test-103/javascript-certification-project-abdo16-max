// Necessary Imports, DO NOT REMOVE
const { LinkedList } = require("./LinkedList");
const { Student } = require('./Student')
const readline = require('readline');

// Initialize terminal interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Creates the Student Management System as a Linked List
/**
 * studentManagementSystem is the object that the main() function will be modifying
 */
const studentManagementSystem = new LinkedList();

// Display available commands
function main() {
  console.log(`
      Available Commands:
      - add [name] [year] [email] [specialization]: Add a student
      - remove [email]: Remove a student by email
      - display: Show all students
      - find [email]: Find a student by email
      - save: Save the current linked list to the specified file
      - load [fileName]: Load a linked list from a file
      - clear: Clear the current linked list
      - q: Quit the terminal
  `);
}

// Command handling logic
async function handleCommand(command) {
  const [operation, ...args] = command.trim().split(' ');

  switch (operation) {
    case 'add':
      /**
       * TODO:
       *  Finds a particular student by email, and returns their information
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (code is given)
       *   - Use implemented functions in LinkedList to add the Student, and display the updated LinkedList
       */
       console.log('Adding student...');
const [name, year, email, specialization] = args;

if (!name || !year || !email || !specialization) {
  console.log('Usage: add [name] [year] [email] [specialization]');
  break;
}

const classYear = Number(year);
if (Number.isNaN(classYear) || classYear < 0) {
  console.log('Year must be a non-negative number.');
  break;
}

const student = new Student(name, email, classYear, specialization);
studentManagementSystem.addStudent(student);

console.log('Current students:', studentManagementSystem.displayStudents());
break;

      
        // --------> WRITE YOUR CODE ABOVE
        break;

    case 'remove':
      /**
       * TODO:
       *  Removes a particular student by email
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (removeEmail)
       *   - Use implemented functions in LinkedList to remove the Student, and display the updated LinkedList
       */
      console.log('Removing student...')
      // --------> WRITE YOUR CODE BELOW
      {
        const [removeEmail] =args;
        if (!removeEmail){
          console.log('Usage: remove [email]');
          break;
        }
        studentManagementSystem.removeStudent(removeEmail);
        console.log('Current students:', studentManagementSystem.displayStudents());

      // --------> WRITE YOUR CODE ABOVE
      }
      break;

    case 'display':
      /**
       * TODO:
       *  Displays the students in the Linked List
       *  You will need to do the following:
       *   - Use implemneted functions in LinkedList to display the student
       */
      console.log('Displaying students...')
      // --------> WRITE YOUR CODE BELOW
      {
        const listStr = studentManagementSystem.displayStudents();
        console.log(listStr.length ? listStr : '(no students)');
      }
      // --------> WRITE YOUR CODE ABOVE
      break;

    case 'find':
      /**
       * TODO:
       *  Finds a particular student by email, and returns their information
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (findEmail)
       *   - Use implemented functions in LinkedList to grab the Student
       *   - Use implemented functions in Student to display if found, otherwise, state "Student does not exist"
       */
      console.log('Finding student...')
      // --------> WRITE YOUR CODE BELOW
      {
        const [findEmail] = args;
        if (!findEmail){
           console.log('Usage: find [email]');
          break;
        }
         const found = studentManagementSystem.findStudent(findEmail);
        if (found === -1){
           console.log('Student does not exist');
        } else{
            console.log(`Found:
  Name: ${found.getName()}
  Email: ${found.getEmail()}
  Year: ${found.getYear()}
  Specialization: ${found.getSpecialization()}`);
        }
      }
      // --------> WRITE YOUR CODE ABOVE
      break;

    case 'save':
      /**
       * TODO:
       *  Saves the current LinkedList to a specified JSON file
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (saveFileName)
       *   - Use implemented functions in LinkedList to save the data
       */
      console.log('Saving data...')
      // --------> WRITE YOUR CODE BELOW
      {
       const [saveFileName] = args;
        if (!saveFileName){
          console.log('Usage: save [fileName]');
          break;
        }
        try{
          await studentManagementSystem.saveToJson(saveFileName);
          console.log(`Saved to ${saveFileName}`);
        } catch (err){
           console.log('Error saving file:', err.message);
        }
      }
      break;

      // --------> WRITE YOUR CODE ABOVE

    case "load":
      /**
       * TODO:
       *  Loads data from specified JSON file into current Linked List
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (loadFileName)
       *   - Use implemented functions in LinkedList to save the data, and display the updated LinkedList
       */
      console.log('Loading data...')
      // --------> WRITE YOUR CODE BELOW
      {
        const [loadFileName] = args;
        if (!loadFileName) {
          console.log('Usage: load [fileName]');
          break;
      }
      try {
        await studentManagementSystem.loadFromJSON(loadFileName);
          console.log('Loaded. Current students:', studentManagementSystem.displayStudents())
      } catch(err){
         console.log('Error loading file:', err.message);
      }

      // --------> WRITE YOUR CODE ABOVE
    }
      break;

    case 'clear':
      /**
       * TODO:
       *  Clears all data in the Linked List
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Use implemented functions in LinkedList to clear the data
       */
      console.log('Clearing data...')
      // --------> WRITE YOUR CODE BEL
        studentManagementSystem.head = null;
        studentManagementSystem.tail = null;
        studentManagementSystem.length = 0;
        console.log('Linked list cleared.');
      


      // --------> WRITE YOUR CODE ABOVE
      break;

    case 'q':
        console.log('Exiting...');
        rl.close();
        break;

    default:
        console.log('Unknown command. Type "help" for a list of commands.');
        break;
  }
}
// Start terminal-based interaction (DO NOT MODIFY)
console.log('Welcome to the Student Management System!');
main();
rl.on('line', async (input) => {
  if (input.trim().toLowerCase() === 'help') {
    main();
  } else {
      await handleCommand(input);
  }
});
rl.on('close', () => {
  console.log('Goodbye!');
});

// Necessary Imports (you will need to use this)
const { Student } = require('./Student')
const fs = require('fs').promises;

/**
 * Node Class (GIVEN, you will need to use this)
 */
class Node {
  // Public Fields
  data               // Student
  next               // Object
  /**
   * REQUIRES:  The fields specified above
   * EFFECTS:   Creates a new Node instance
   * RETURNS:   None
   */
  constructor(data, next = null) { // initialise the node
    this.data = data;
    this.next = next
  }
}

/**
 * Create LinkedList Class (for student management)
 * The class should have the public fields:
 * - head, tail, length
 */
class LinkedList {
  // Public Fields
  head              // Object
  tail              // Object
  length            // Number representing size of LinkedList

  /**
   * REQUIRES:  None
   * EFFECTS:   Creates a new LinkedList instance (empty)
   * RETURNS:   None
   */
  constructor() {
     this.head = null
    this.tail = null
    this.length = 0

  }

  /**
   * REQUIRES:  A new student (Student)
   * EFFECTS:   Adds a Student to the end of the LinkedList
   * RETURNS:   None
   * CONSIDERATIONS:
   * - Think about the null case
   * - Think about adding to the 'end' of the LinkedList (Hint: tail)
   */
  addStudent(newStudent) {
    const node = new Node(newStudent)
    if(!this.head){ // if the list is empty(head is null).
      this.head = node; // head points to the new node
      this.tail = node; // tail also points to the new node
    } else { // list already has elements
      this.tail.next = node; // the old last student now points to the new one
      this.tail = node //update the tail reference to the new last student
    }
    this.length++ // keeps track of how many student are in the list.
  }
  

  /**
   * REQUIRES:  email(String)
   * EFFECTS:   Removes a student by email (assume unique)
   * RETURNS:   None
   * CONSIDERATIONS:
   * - Think about the null case
   * - Think about how removal might update head or tail
   */
  removeStudent(email) {
    if(!this.head) return  // empty list
    if(this.head.data.getEmail() === email){ // removing the head
      this.head = this.head.next
      if(!this.head){
        this.tail = null // if list become empty, rest tail too
      }
      this.length-- // Decrement length
      return
    }
    let current = this.head // removing from middle or tail
    while(current.next){
      if(current.next.data.getEmail() === email){
        current.next = current.next.next // unlink the node
        if(!current.next){ // if we removed the tail, update tail
          this.tail = current
        }
        this.length--
        return
      }
      current = current.next
    }

  }

  /**
   * REQUIRES:  email (String)
   * EFFECTS:   None
   * RETURNS:   The Student or -1 if not found
   */
  findStudent(email) {
    let current = this.head // start at the head od the list
    while (current) {
      if(current.data.getEmail()=== email){ // Found the student →→→ return the Student object

        return current.data
      }
      current = current.next
      
    }
    // If we reach the end without finding → return -1
    return -1
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   Clears all students from the Linked List
   * RETURNS:   None
   */
  #clearStudents() { // private method 
    this.head = null;
    this.tail = null
    this.length =0
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   LinkedList as a String for console.log in caller
   * CONSIDERATIONS:
   *  - Let's assume you have a LinkedList with two people
   *  - Output should appear as: "JohnDoe, JaneDoe"
   */
  displayStudents() {
    let result = []
    let current = this.head;
    while(current){
      result.push(current.data.getName()) //assuming student has getname
      current = current.next

    }
     return result.join(", ");
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   A sorted array of students by name
   */
  #sortStudentsByName() {
    let students =[]
    let current = this.head
    while(current){
      students.push(current.data)
      current = current.next;
    }
    return students.sort((a, b) => a.getName().localeCompare(b.getName()))
  }

  /**
   * REQUIRES:  specialization (String)
   * EFFECTS:   None
   * RETURNS:   An array of students matching the specialization, sorted alphabetically by student name
   * CONSIDERATIONS:
   * - Use sortStudentsByName()
   */
  filterBySpecialization(specialization) {
    let students = []
    let current = this.head;
    while (current) {
      if(current.data.getSpecialization() === specialization){
        students.push(current.data)
      }
      current = current.next
      
    }
     return students.sort((a, b) => a.getName().localeCompare(b.getName()))
  }

  /**
   * REQUIRES:  minAge (Number)
   * EFFECTS:   None
   * RETURNS:   An array of students who are at least minAge, sorted alphabetically by student name
   * CONSIDERATIONS:
   * - Use sortStudentsByName()
   */
  filterByMinAge(minAge) {
    let students = []
    let current = this.head
    while (current){
      if(current.data.getYear() >= minAge){
        students.push(current.data)
      }
      current = current.next;
    }
    return students.sort((a, b) => a.getName().localeCompare(b.getName()))
  }

  /**
   * REQUIRES:  A valid file name (String)
   * EFFECTS:   Writes the LinkedList to a JSON file with the specified file name
   * RETURNS:   None
   */
  async saveToJson(fileName) {
     let students = []
    let current = this.head
    while (current){
      students.push({
         name: current.data.getName(),
        email: current.data.getEmail(),
        year: current.data.getYear(),
        specialization: current.data.getSpecialization()
      })
      current = current.next;

    }
    await fs.writeFile(fileName, JSON.stringify(students, null, 2))
  }

  /**
   * REQUIRES:  A valid file name (String) that exists
   * EFFECTS:   Loads data from the specified fileName, overwrites existing LinkedList
   * RETURNS:   None
   * CONSIDERATIONS:
   *  - Use clearStudents() to perform overwriting
   */
  async loadFromJSON(fileName){
    const data = await fs.readFile(fileName, 'utf-8')
    const students = JSON.parse(data)

    this.#clearStudents()

    for (let s of students){
      const student = new Student(s.name, s.email, s.year, s.specialization)
      this.addStudent(student);
    }
  }

}

module.exports = { LinkedList }





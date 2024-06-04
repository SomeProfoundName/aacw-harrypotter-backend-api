const student = {
    name: "Mrina",
    age: 18,
    gender: "Male"
}

function printPerson({name, age, gender},course){
    console.log(`The persons name is ${name}, their age is ${age}, their gender is ${gender} and has enrolled in the course ${course}`)
}

printPerson(student, "Physics");
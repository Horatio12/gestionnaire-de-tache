class Student {
    constructor(name,firstname,genre,level) {
        this.name= name
        this.firstname= firstname
        this.genre= genre
        this.level= level
    }
    getInscription(){
        console.log('je me suis bien inscrit')
    }
    getConnexion(){
        console.log('je me suis bien connecté')
    }
    getStudentInfo(){
        console.log(`Name:${this.name}, FirstName: ${this.firstname}, genre: ${this.genre} , level: ${this.level}`)
    }
}
    const firstStudent=new Student('AGBO','jean','M','Licence')
    firstStudent.getInscription()
    firstStudent.getConnexion()
    firstStudent.getStudentInfo()
    
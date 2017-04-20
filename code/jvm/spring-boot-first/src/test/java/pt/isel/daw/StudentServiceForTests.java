package pt.isel.daw;

public class StudentServiceForTests implements StudentsService {

    public static String Name = "Bob";

    @Override
    public Student tryGetStudentByNumber(int number) {
        return new Student(Name, number);
    }

    @Override
    public void doSomethingOnTransaction() {

    }
}

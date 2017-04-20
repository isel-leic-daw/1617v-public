package pt.isel.daw;

public class StudentServiceTestImpl implements StudentsService{
    @Override
    public Student tryGetStudentByNumber(int number) {
        if(number == 12345 ) {
            return new Student("Alice", 12345);
        }
        return null;
    }

    @Override
    public void doSomethingOnTransaction() {

    }
}

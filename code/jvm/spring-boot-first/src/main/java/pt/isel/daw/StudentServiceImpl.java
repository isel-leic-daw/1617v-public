package pt.isel.daw;

/**
 * Created by pedro on 31/03/17.
 */
public class StudentServiceImpl implements StudentsService {
    @Override
    public Student tryGetStudentByNumber(int number) {
        return number > 1000
                ? new Student("Alice", number)
                : null;
    }
}

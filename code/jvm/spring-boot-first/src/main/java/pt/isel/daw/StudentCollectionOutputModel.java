package pt.isel.daw;

/**
 * Created by pedro on 31/03/17.
 */
public class StudentCollectionOutputModel {

    private final StudentOutputModel[] students;

    public StudentCollectionOutputModel(StudentOutputModel... students){
        this.students = students;
    }

    public StudentOutputModel[] getStudents() {
        return students;
    }
}

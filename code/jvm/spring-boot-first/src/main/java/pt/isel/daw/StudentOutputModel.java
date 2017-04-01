package pt.isel.daw;

/**
 * Created by pedro on 31/03/17.
 */
public class StudentOutputModel {

    private final String name;
    private final int number;

    public StudentOutputModel(String name, int number){
        this.name = name;
        this.number = number;
    }

    public String getName() {
        return name;
    }

    public int getNumber() {
        return number;
    }
}

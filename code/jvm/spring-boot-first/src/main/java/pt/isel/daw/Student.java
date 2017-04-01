package pt.isel.daw;

/**
 * Created by pedro on 31/03/17.
 */
public class Student {

    private final String name;
    private final int number;

    public Student(String name, int number){

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

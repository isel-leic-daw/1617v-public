package pt.isel.daw;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Created by pedro on 31/03/17.
 */
public class StudentOutputModel {

    private final String name;
    private final int number;


    @JsonCreator
    public StudentOutputModel(
            @JsonProperty("name") String name,
            @JsonProperty("number") int number){
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

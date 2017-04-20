package pt.isel.daw;

import org.junit.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.Assert.assertEquals;

public class AnotherControllerTest {
    @Test
    public void simpleTest(){
        ExampleController c = new ExampleController(
                new JustAFormatterImpl(),
                new StudentServiceTestImpl());

        ResponseEntity<StudentOutputModel> output = c.getStudentByNumber(123450, false);
        assertEquals(HttpStatus.NOT_FOUND, output.getStatusCode());

    }
}

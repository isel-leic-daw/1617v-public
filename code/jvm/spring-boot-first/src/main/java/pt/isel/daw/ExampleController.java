package pt.isel.daw;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.web.HttpMessageConverters;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ExampleController {

    private final Formatter formatter;
    private final StudentsService studentService;
    private final HttpMessageConverters messageConverters;

    @Autowired
    public ExampleController(Formatter formatter,
                             StudentsService studentService,
                             HttpMessageConverters messageConverters){
        this.formatter = formatter;
        this.studentService = studentService;
        this.messageConverters = messageConverters;
    }

    @RequestMapping(path="/hello/{name}",method= RequestMethod.GET)
    public String getHello(
            @PathVariable("name") String name
    ){
        return formatter.format("Hello "+name);
    }

    @RequestMapping(path="/students/{number}",method= RequestMethod.GET)
    public ResponseEntity<StudentOutputModel> getStudentByNumber(
            @PathVariable("number") int number
    ){
        Student s = studentService.tryGetStudentByNumber(number);
        if(s == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new
                ResponseEntity<>(
                        new StudentOutputModel(s.getName(), s.getNumber()),
                                HttpStatus.OK);
    }

    @RequestMapping(path="/students",method= RequestMethod.GET)
    public StudentCollectionOutputModel getStudents(

    ){
        return new StudentCollectionOutputModel(
                new StudentOutputModel("Alice", 123),
                new StudentOutputModel("Bob", 456));
    }
}

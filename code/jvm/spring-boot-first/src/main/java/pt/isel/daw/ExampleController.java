package pt.isel.daw;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ExampleController {

    private final Formatter formatter;

    @Autowired
    public ExampleController(Formatter formatter){
        this.formatter = formatter;
    }

    @RequestMapping(path="/hello/{name}",method= RequestMethod.GET)
    public String GetHello(
            @PathVariable("name") String name
    ){
        return formatter.format("Hello "+name);
    }
}

package pt.isel.daw;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.embedded.LocalServerPort;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.net.URI;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)

public class ControllerTests {

    @TestConfiguration
    public static class Config{
        @Bean
        StudentsService getStudentService(){
            return new StudentServiceForTests();
        }
    }

    @Autowired
    private StudentsService studentsService;

    @LocalServerPort
    private int port;

    @Test
    public void simpleIntegrationTest() throws IOException {

        RestTemplate client = new RestTemplate();
        UriComponents uri = UriComponentsBuilder.newInstance()
                .scheme("http")
                .host("localhost")
                .port(port)
                .path("/students/2000")
                .build();

        //StudentOutputModel res = client.getForObject(uri.toString(),
        //        StudentOutputModel.class);
        //assertEquals("Alice", res.getName());

        String res = client.getForObject(uri.toString(),
                        String.class);
        ObjectMapper mapper = new ObjectMapper();
        JsonNode node = mapper.readTree(res);
        assertEquals(
                StudentServiceForTests.Name,
                node.get("name").asText());
    }




    //ObjectMapper mapper = new ObjectMapper();
    //JsonNode node = mapper.readTree(res);
    //assertEquals("Alice", node.get("name").asText());
}

package pt.isel.daw;

import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import static org.junit.Assert.assertEquals;

/**
 * Created by pedro on 25/03/17.
 */
public class SimpleDiTests {

    public interface TheService {
        String getSomething();
    }
    public interface AnotherService{
        String getSomethingElse();
    }
    public interface ThirdService{
        String get();
    }

    public static class AServiceImpl implements TheService{

        public String getSomething() {
            return this.getClass().getName();
        }
    }

    public static class AnotherServiceImpl implements AnotherService{

        private final TheService theService;

        public AnotherServiceImpl(TheService theService){
            this.theService = theService;
        }
        public String getSomethingElse() {
            return theService.getSomething().toUpperCase();
        }
    }

    @Component
    public static class ThirdServiceImpl implements ThirdService{
        private final AnotherService svc;
        public ThirdServiceImpl(AnotherService svc){
            this.svc = svc;
        }

        public String get() {
            return svc.getSomethingElse().toLowerCase();
        }
    }

    @Configuration
    @ComponentScan
    public static class Config{
        @Bean
        public TheService theService(){
            return new AServiceImpl();
        }
        @Bean AnotherService anotherService(TheService svc){
            return new AnotherServiceImpl(svc);
        }
    }

    @Test
    public void simpleExample(){
        ApplicationContext ctx = new AnnotationConfigApplicationContext(Config.class);
        TheService svc = ctx.getBean(TheService.class);
        assertEquals(AServiceImpl.class.getName(), svc.getSomething());
        AnotherService anotherSvc = ctx.getBean(AnotherService.class);
        assertEquals(AServiceImpl.class.getName().toUpperCase(), anotherSvc.getSomethingElse());
        ThirdService svc3 = ctx.getBean(ThirdService.class);
        assertEquals(AServiceImpl.class.getName().toLowerCase(), svc3.get());
    }
}

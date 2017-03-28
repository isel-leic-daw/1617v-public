package pt.isel.daw;

import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

import java.util.Random;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;

/**
 * Created by pedro on 25/03/17.
 */
public class ScopeTests {

    public interface Service1{
        String get();
    }
    public interface Service2{
        String get();
    }
    public static class Service1Impl implements Service1{

        private final String s;

        public Service1Impl() {
            this.s = Integer.valueOf(new Random().nextInt()).toString();
        }
        public String get() {
            return s;
        }
    }

    public static class Service2Impl implements Service2{

        private final String s;
        private final Service1 svc;

        public Service2Impl(Service1 svc) {
            this.svc = svc;
            this.s = Integer.valueOf(new Random().nextInt()).toString();
        }
        public String get() {
            return svc.get() + '-' + s;
        }
    }

    @Configuration
    public static class Config{
        @Bean
        public Service1 service1(){
            return new Service1Impl();
        }
        @Bean
        @Scope("prototype")
        public Service2 service2(Service1 svc){
            return new Service2Impl(svc);
        }
    }

    @Test
    public void scopeTest(){
        ApplicationContext ctx = new AnnotationConfigApplicationContext(Config.class);
        Service1 svc11 = ctx.getBean(Service1.class);
        Service1 svc12 = ctx.getBean(Service1.class);
        assertEquals(svc11.get(), svc12.get());

        Service2 svc21 = ctx.getBean(Service2.class);
        Service2 svc22 = ctx.getBean(Service2.class);
        assertNotEquals(svc21.get(), svc22.get());
    }
}

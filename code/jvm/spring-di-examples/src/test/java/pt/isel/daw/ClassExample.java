package pt.isel.daw;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.*;
import org.springframework.stereotype.Component;

/**
 * Created by pedro on 28/03/17.
 */
public class ClassExample {

    public interface EmailSender{
        void send(String to, String subject, String body);
    }

    public interface ViewEngine{
        String getView(Object model);
    }

    public static class ExampleEmailSender implements EmailSender{

        public void send(String to, String subject, String body) {
            // lets pretend we sent an email
            System.out.println("Sending " + body);
        }
    }

    public static class ExampleViewEngine implements ViewEngine{

        public String getView(Object model) {
            return model.toString();
        }
    }

    public interface NotificationSender{
        void send(Object model);
    }

    //@Component
    public static class ExampleNotificationSender implements NotificationSender {

        private final ViewEngine viewEngine;
        private final EmailSender emailSender;

        @Autowired
        public ExampleNotificationSender(ViewEngine viewEngine, EmailSender emailSender){

            this.viewEngine = viewEngine;
            this.emailSender = emailSender;
        }

        public void send(Object model){

            String to = "fetch the recipients from somewhere";
            String subject = "Very important message";
            String body = viewEngine.getView(model);
            emailSender.send(to, subject, body);
        }
    }

    @Configuration
    @ComponentScan
    public static class TheConfig{

        @Bean
        public EmailSender createEmailSender(){
            System.out.println("createEmailSender");
            return new ExampleEmailSender();
        }

        @Bean
        @Scope("prototype")
        public ViewEngine createViewEngine(){
            System.out.println("createViewEngine");
            return new ExampleViewEngine();
        }

        @Bean
        @Scope("prototype")
        public NotificationSender createNotificationSender(
                EmailSender emailSender,
                ViewEngine viewEngine
        ) {
            System.out.println("createNotificationSender");
            return new ExampleNotificationSender(viewEngine, emailSender);
        }

    }

    @Test
    public void example(){
        ApplicationContext ctx = new AnnotationConfigApplicationContext(TheConfig.class);
        NotificationSender ns = ctx.getBean(NotificationSender.class);
        ns = ctx.getBean(NotificationSender.class);
        ns.send("the model");
    }

}

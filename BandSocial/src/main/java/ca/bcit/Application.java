package ca.bcit;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.view.DefaultRequestToViewNameTranslator;

@SpringBootApplication
public class Application extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder applicationBuilder) {
        return  applicationBuilder.sources(Application.class);
    }

    @Bean
    public DefaultRequestToViewNameTranslator viewNameTranslator() {
        DefaultRequestToViewNameTranslator viewNameTranslator = new DefaultRequestToViewNameTranslator();
        return viewNameTranslator;
    }


    public static void main(String[] args) {
        new SpringApplicationBuilder().sources(Application.class).run(args);
    }

}
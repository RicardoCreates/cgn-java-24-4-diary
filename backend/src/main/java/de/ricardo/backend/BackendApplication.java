package de.ricardo.backend;

import com.cloudinary.Cloudinary;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Bean
    public Cloudinary createCloudinary() {
        return new Cloudinary("cloudinary://656837244356987:0VeLppIgnVQzF2GHHbs_bnzBNOs@dxiavjr9h");
    }

}

package com.example.demo.student;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class StudentConfig {

    @Bean
    CommandLineRunner commandLineRunner(StudentRepository repository) {
        return args -> {
            Student mariam = new Student(
                    "Mariam",
                    LocalDate.of(2000, Month.JANUARY, 5),
                    "mariam.jamal@gmail.com");
            Student connor = new Student(
                    "Connor",
                    LocalDate.of(2000, Month.APRIL, 5),
                    "connorcam123@gmail.com");

            repository.saveAll(List.of(mariam,connor));
        };
    }
}

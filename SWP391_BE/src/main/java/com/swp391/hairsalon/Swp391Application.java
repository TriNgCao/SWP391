package com.swp391.hairsalon;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@EnableWebSecurity
@SpringBootApplication
public class Swp391Application {

	public static void main(String[] args) {
		SpringApplication.run(Swp391Application.class, args);
	}

}

package com.eunbi.PianoClass;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class PianoClassApplication{

	public static void main(String[] args) {
		SpringApplication.run(PianoClassApplication.class, args);
	}


}

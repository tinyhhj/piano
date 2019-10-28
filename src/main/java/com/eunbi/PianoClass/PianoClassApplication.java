package com.eunbi.PianoClass;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
@EntityScan(basePackageClasses = {Jsr310JpaConverters.class,PianoClassApplication.class})
public class PianoClassApplication{
	public static void main(String[] args) {
		SpringApplication.run(PianoClassApplication.class, args);
	}
}

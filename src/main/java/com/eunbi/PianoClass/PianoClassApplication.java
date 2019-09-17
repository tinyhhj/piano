package com.eunbi.PianoClass;

import com.eunbi.PianoClass.domain.Lesson;
import com.eunbi.PianoClass.domain.Student;
import com.eunbi.PianoClass.repository.StudentRepository;
import com.sun.tools.javac.util.ArrayUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import java.time.Instant;
import java.time.Period;
import java.util.Arrays;

@SpringBootApplication
@EnableJpaAuditing
public class PianoClassApplication{

	public static void main(String[] args) {
		SpringApplication.run(PianoClassApplication.class, args);
	}


}

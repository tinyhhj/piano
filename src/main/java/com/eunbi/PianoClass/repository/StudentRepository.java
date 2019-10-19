package com.eunbi.PianoClass.repository;

import com.eunbi.PianoClass.domain.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, String> {
    Optional<Student> findByLogin(String login);
}

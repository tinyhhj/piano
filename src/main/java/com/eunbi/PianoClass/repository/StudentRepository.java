package com.eunbi.PianoClass.repository;

import com.eunbi.PianoClass.domain.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, String> {
}

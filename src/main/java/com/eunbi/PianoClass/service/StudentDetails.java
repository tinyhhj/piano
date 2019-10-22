package com.eunbi.PianoClass.service;

import com.eunbi.PianoClass.domain.Student;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

@Data
public class StudentDetails extends User {

    Student student;

    public StudentDetails(String username, String password, Collection<? extends GrantedAuthority> authorities, Student student) {
        super(username, password, authorities);
        setStudent(student);
        student.clearPassword();
    }


}

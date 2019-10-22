package com.eunbi.PianoClass.service;

import com.eunbi.PianoClass.domain.Student;
import com.eunbi.PianoClass.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

public class StudentDetailsService implements UserDetailsService {

    @Autowired
    StudentRepository studentRepository;
    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        Student student = studentRepository.findByLogin(s).orElseThrow(()->new UsernameNotFoundException("user can not find " + s));
        return new StudentDetails(student.getLogin(), student.getPassword(), AuthorityUtils.createAuthorityList("STUDENT"),student);
    }
}

package com.eunbi.PianoClass.service;

import com.eunbi.PianoClass.domain.Student;
import com.eunbi.PianoClass.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

public class StudentDetailsService implements UserDetailsService {

    @Autowired
    StudentRepository studentRepository;
    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        Student student = studentRepository.findByLogin(s)
                .orElseThrow(()->new UsernameNotFoundException("user can not find " + s));
        List<GrantedAuthority> roles= AuthorityUtils.createAuthorityList("ROLE_".concat(student.getRole()));
        return new StudentDetails(student.getLogin(), student.getPassword(), roles,student);
    }
}

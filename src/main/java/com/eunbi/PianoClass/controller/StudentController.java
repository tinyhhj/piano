package com.eunbi.PianoClass.controller;

import com.eunbi.PianoClass.constant.Constant;
import com.eunbi.PianoClass.domain.Student;
import com.eunbi.PianoClass.exception.ResourceNotFoundException;
import com.eunbi.PianoClass.repository.StudentRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value= Constant.BASE_STUDENT_URL)
public class StudentController {

    @Autowired
    StudentRepository studentRepository;

    @GetMapping("/{id}")
    public ResponseEntity<?> getStudent(@PathVariable String id) {
        return ResponseEntity.ok(studentRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("StudentId " + id + " not found")));
    }

    @GetMapping
    public ResponseEntity<?> getAllStudents(Pageable pageable) {
        return ResponseEntity.ok(studentRepository.findAll(pageable));
    }

    @PostMapping
    public ResponseEntity<?> createStudent(StudentCreateReq req){
        Student student = new Student();
        student.setName(req.getName());
        return ResponseEntity.ok(studentRepository.save(student));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateStudent(@PathVariable String id, StudentCreateReq req) {
        return studentRepository.findById(id).map(student -> {
            student.setName(req.getName());
            return ResponseEntity.ok(studentRepository.save(student));
        }).orElseThrow(()-> new ResourceNotFoundException("StudentId " + id + " not found"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteStudent(@PathVariable String id) {
        return studentRepository.findById(id).map(student->{
            studentRepository.delete(student);
            return ResponseEntity.ok().build();
        }).orElseThrow(() -> new ResourceNotFoundException("StudentId " + id + " not found"));
    }


    @Data
    public static class StudentCreateReq {
        String name;
    }
}

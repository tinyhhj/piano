package com.eunbi.PianoClass.controller;

import com.eunbi.PianoClass.constant.Constant;
import com.eunbi.PianoClass.domain.ClassTicket;
import com.eunbi.PianoClass.exception.ResourceNotFoundException;
import com.eunbi.PianoClass.repository.ClassTicketRepository;
import com.eunbi.PianoClass.repository.StudentRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.InvalidParameterException;
import java.time.Instant;
import java.time.LocalDate;
import java.time.Period;

@RestController
@RequestMapping(value = Constant.BASE_URL)
public class ClassTicketController {

    @Autowired
    ClassTicketRepository ticketRepository;

    @Autowired
    StudentRepository studentRepository;

    @GetMapping("/tickets")
    public ResponseEntity<?> getAllTickets(Pageable pageable) {
        return ResponseEntity.ok(ticketRepository.findAll(pageable));
    }

    @GetMapping("/students/{studentId}/tickets")
    public ResponseEntity<?> getAllTicketsByStudentId(@PathVariable String studentId, Pageable pageable) {
        return ResponseEntity.ok(ticketRepository.findByStudentId(studentId, pageable));
    }

    @PostMapping("/students/{studentId}/tickets")
    public ResponseEntity<?> createTicket(@PathVariable String studentId, TicketCreateReq req){
        return studentRepository.findById(studentId).map(student-> {
            ClassTicket ticket = new ClassTicket();
            ticket.setStart(req.getStart());
            ticket.setEnd(ticket.getStart().plus(Period.ofMonths(1)));
            ticket.setStudent(student);
            return ResponseEntity.ok(ticketRepository.save(ticket));
        }).orElseThrow(()->new ResourceNotFoundException("StudentId " + studentId + " not found"));
    }

    @PutMapping("/students/{studentId}/tickets/{id}")
    public ResponseEntity<?> updateTicket(@PathVariable String studentId, @PathVariable String id, TicketUpdateReq req) {
        if( !studentRepository.existsById(studentId)) {
            throw new ResourceNotFoundException("StudentId " + studentId + " not found");
        }

        if( !req.getEnd().isAfter(req.getStart())) {
            throw new IllegalArgumentException("end should be after than start");
        }

        return ticketRepository.findById(id).map(ticket-> {
            // update
            ticket.setStart(req.getStart());
            ticket.setEnd(req.getEnd());
            return ResponseEntity.ok(ticketRepository.save(ticket));
        }).orElseThrow(()->new ResourceNotFoundException("ticketId " + id + " not found"));
    }

    @DeleteMapping("/students/{studentId}/tickets/{id}")
    public ResponseEntity<?> deleteTicket(@PathVariable String studentId, @PathVariable String id) {
        return ticketRepository.findByIdAndStudentId(id, studentId).map(ticket-> {
            ticketRepository.delete(ticket);
            return ResponseEntity.ok().build();
        }).orElseThrow(()->new ResourceNotFoundException("studentId " + studentId+ " ticketId " + id + " not found"));
    }

    @Data
    public static class TicketCreateReq {
        @DateTimeFormat(pattern = "yyyy-MM-dd")
        LocalDate start = LocalDate.now();
    }

    @Data
    public static class TicketUpdateReq {
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
        LocalDate start = LocalDate.now();

        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
        LocalDate end = LocalDate.now();
    }
}

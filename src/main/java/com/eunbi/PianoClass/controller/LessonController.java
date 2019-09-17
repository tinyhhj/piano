package com.eunbi.PianoClass.controller;

import com.eunbi.PianoClass.constant.Constant;
import com.eunbi.PianoClass.domain.ClassTicket;
import com.eunbi.PianoClass.domain.Lesson;
import com.eunbi.PianoClass.exception.ResourceNotFoundException;
import com.eunbi.PianoClass.repository.ClassTicketRepository;
import com.eunbi.PianoClass.repository.LessonRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;


@RestController
public class LessonController {
    @Autowired
    ClassTicketRepository ticketRepository;

    @Autowired
    LessonRepository lessonRepository;
    @GetMapping("/tickets/{ticketId}/lessons")
    public ResponseEntity<?> getAllLessonsByTicketId(@PathVariable String ticketId, Pageable pageable) {
        return ResponseEntity.ok(lessonRepository.findByTicketId(ticketId, pageable));
    }

    @PostMapping("/tickets/{ticketId}/lessons")
    public ResponseEntity<?> createLesson(@PathVariable String ticketId, LessonCreateReq req) {
        return ticketRepository.findById(ticketId).map(ticket->{
            Lesson lesson = new Lesson();
            lesson.setMemo(req.getMemo());
            lesson.setFinish(req.isFinish());
            lesson.setLessonDate(req.getLessonDate());
            lesson.setTicket(ticket);
            return ResponseEntity.ok(lessonRepository.save(lesson));
        }).orElseThrow(()->new ResourceNotFoundException("ticketId " + ticketId + " is not found"));
    }

    @PutMapping("/tickets/{ticketId}/lessons/{id}")
    public ResponseEntity<?> updateLesson(@PathVariable String ticketId, @PathVariable String id, LessonCreateReq req) {
        if( !ticketRepository.existsById(ticketId)) {
            throw new ResourceNotFoundException("ticketId " + ticketId + " is not found");
        }
        return lessonRepository.findById(id).map(lesson-> {
            lesson.setMemo(req.getMemo());
            lesson.setLessonDate(req.getLessonDate());
            lesson.setFinish(req.isFinish());
            return ResponseEntity.ok(lessonRepository.save(lesson));
        }).orElseThrow(()->new ResourceNotFoundException("lessonId " + id + " is not found"));
    }

    @DeleteMapping("/tickets/{ticketId}/lessons/{id}")
    public ResponseEntity<?> deleteLesson(@PathVariable String ticketId, @PathVariable String id) {
        return lessonRepository.findByIdAndTicketId(id,ticketId).map(lesson-> {
            lessonRepository.delete(lesson);
            return ResponseEntity.ok().build();
        }).orElseThrow(()->new ResourceNotFoundException("ticketId " + ticketId + " lessonId " + id + " is not found"));
    }

    @Data
    public static class LessonCreateReq {
        String memo = "";
        boolean finish = false;
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
        LocalDateTime lessonDate = LocalDateTime.now();
    }
}
